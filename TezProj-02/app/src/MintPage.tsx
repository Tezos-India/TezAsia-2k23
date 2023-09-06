import sha256 from "sha256";
import {
  AddCircleOutlined,
  Close,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  MobileStepper,
  Stack,
  SwipeableDrawer,
  TextField,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { char2Bytes } from "@taquito/utils";
import { BigNumber } from "bignumber.js";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { TZIP21TokenMetadata, UserContext, UserContextType } from "./App";
import { TransactionInvalidBeaconError } from "./TransactionInvalidBeaconError";
import { address, bytes, nat } from "./type-aliases";

import SwipeableViews from "react-swipeable-views";

const descriptionRegex = /^(QuestionDescription: )(.*?)( AnswerType: )(.*?)( AnswerLength\(in Chars\) )(.*)/i;

export default function MintPage() {
  const {
    userAddress,
    nftContratTokenMetadataMap,
    storage,
    refreshUserContextOnPageReload,
    nftContrat,
  } = React.useContext(UserContext) as UserContextType;

  const questionsArray : Array<string|undefined> = Array.from(nftContratTokenMetadataMap!.entries()).map(([token_id, token]) => { 
    return token?.name;
  });
  
  const isTablet = useMediaQuery("(min-width:600px)");

  const validationSchema = yup.object({
    name: yup.string()
      .notOneOf(questionsArray, 'Question Already Minted!')
      .required("Question is required!"),
    symbol: yup.string().required("Symbol is required!"),
    question: yup.string().required("Question Description is required, write the question again if it is enough!"),
    answerType: yup.string().required("Answer Type is required!"),
    answerLength: yup.string().required("Answer Length is required!"),
    answer: yup.string().required("Answer is required!")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      question: "",
      answerType: "",
      answerLength: "",
      token_id: 0,
      symbol: "AnsNFT",
      answer: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const newDescription = `QuestionDescription: ${values.question} AnswerType: ${values.answerType} AnswerLength(in Chars) ${values.answerLength}`;
      console.log(values);
      await mint({
        name: values.name,
        description: newDescription,
        token_id: values.token_id,
        symbol: values.symbol,
        answerHash: sha256(values.answer),
      } as TZIP21TokenMetadata);
      setSubmitting(false);
    },
  });

  const [pictureUrl, setPictureUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const [formOpen, setFormOpen] = useState<boolean>(false);

  useEffect(() => {
    if (storage && storage.administrators.indexOf(userAddress! as address) < 0)
      setFormOpen(false);
    else setFormOpen(true);
  }, [userAddress]);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setFormOpen(open);
    };

  const { enqueueSnackbar } = useSnackbar();

  const mint = async (newTokenDefinition: TZIP21TokenMetadata) => {
    console.log(newTokenDefinition);
    try {
      //IPFS
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set(
          "pinata_api_key",
          `${import.meta.env.VITE_PINATA_API_KEY}`
        );
        requestHeaders.set(
          "pinata_secret_api_key",
          `${import.meta.env.VITE_PINATA_API_SECRET}`
        );

        const resFile = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "post",
            body: formData,
            headers: requestHeaders,
          }
        );

        const responseJson = await resFile.json();
        console.log("responseJson", responseJson);

        const thumbnailUri = `ipfs://${responseJson.IpfsHash}`;
        setPictureUrl(
          `https://ipfs.io/ipfs/${responseJson.IpfsHash}`
        );

        const op = await nftContrat!.methods
          .mint(
            new BigNumber(newTokenDefinition.token_id) as nat,
            char2Bytes(newTokenDefinition.name!) as bytes,
            char2Bytes(newTokenDefinition.description!) as bytes,
            char2Bytes(newTokenDefinition.symbol!) as bytes,
            char2Bytes(thumbnailUri) as bytes,
            char2Bytes(newTokenDefinition.answerHash) as bytes
          )
          .send({amount: 1000010, mutez:true});

        //close directly the form
        setFormOpen(false);
        enqueueSnackbar(
          "Answer NFT collection is minting ... it will be ready on next block, wait for the confirmation message before minting another collection",
          { variant: "info" }
        );

        await op.confirmation(2);

        enqueueSnackbar("Answer NFT collection minted", { variant: "success" });

        refreshUserContextOnPageReload(); //force all app to refresh the context
      }
    } catch (error) {
      console.table(`Error: ${JSON.stringify(error, null, 2)}`);
      let tibe: TransactionInvalidBeaconError =
        new TransactionInvalidBeaconError(error);
      enqueueSnackbar(tibe.data_message, {
        variant: "error",
        autoHideDuration: 10000,
      });
    }
  };

  useEffect(() => {
    (async () => {
      if (storage && storage.token_ids.length > 0) {
        formik.setFieldValue("token_id", storage?.token_ids.length);
      }
    })();
  }, [storage?.token_ids]);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Paper>
      {storage ? (
        <Button
          sx={{
            p: 1,
            position: "absolute",
            right: "0",
            display: formOpen ? "none" : "block",
            zIndex: 1,
          }}
          onClick={toggleDrawer(!formOpen)}
        >
          Mint Form
          <OpenWithIcon />
        </Button>
      ) : (
        ""
      )}

      <SwipeableDrawer
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        anchor="right"
        open={formOpen}
        variant="temporary"
      >
        <Toolbar
          sx={
            isTablet
              ? { marginTop: "0", marginRight: "0" }
              : { marginTop: "35px", marginRight: "125px" }
          }
        />
        <Box
          sx={{
            width: isTablet ? "40vw" : "60vw",
            borderColor: "text.secondary",
            borderStyle: "solid",
            borderWidth: "1px",

            height: "calc(100vh - 64px)",
          }}
        >
          <Button
            sx={{
              position: "absolute",
              right: "0",
              display: !formOpen ? "none" : "block",
            }}
            onClick={toggleDrawer(!formOpen)}
          >
            <Close />
          </Button>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2} margin={2} alignContent={"center"}>
              <Typography variant="h5">Mint a new collection (Minting Fee: 1Tez)</Typography>

              <TextField
                id="standard-basic-token_id"
                name="token_id"
                label="token_id"
                value={formik.values.token_id}
                disabled
                variant="filled"
              />
              <TextField
                id="standar-basic-question"
                name="name"
                label="Question"
                required
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                variant="filled"
              />
              <TextField
                id="standar-basic-symbol"
                name="symbol"
                label="symbol"
                required
                value={formik.values.symbol}
                onChange={formik.handleChange}
                error={formik.touched.symbol && Boolean(formik.errors.symbol)}
                helperText={
                  formik.touched.symbol && formik.errors.symbol
                }
                variant="filled"
              />
              <TextField
                id="standar-basic-description"
                name="question"
                label="Question Description"
                required
                value={formik.values.question}
                onChange={formik.handleChange}
                error={
                  formik.touched.question &&
                  Boolean(formik.errors.question)
                }
                helperText={
                  `Conditions, Answer Hints, Explanations, Contexts or References ${formik.touched.question && formik.errors.question}`
                }
                variant="filled"
              />
              <TextField
                id="standar-basic-qtype"
                name="answerType"
                label="Answer Type"
                required
                value={formik.values.answerType}
                onChange={formik.handleChange}
                error={
                  formik.touched.answerType &&
                  Boolean(formik.errors.answerType)
                }
                helperText={
                  `Text, Number, Yes or No, Alphanumeric ${formik.touched.answerType && formik.errors.answerType}`
                }
                variant="filled"
              />
              <TextField
                id="standar-basic-qlength"
                name="answerLength"
                label="Answer Length"
                required
                value={formik.values.answerLength}
                onChange={formik.handleChange}
                error={
                  formik.touched.answerLength &&
                  Boolean(formik.errors.answerLength)
                }
                helperText={
                  `Length of all characters, Count Spaces also (if any) ${formik.touched.answerLength && formik.errors.answerLength}`
                }
                variant="filled"
              />
              <TextField
                id="standar-basic-ans"
                type="password"
                name="answer"
                label="Answer To Question"
                required
                value={formik.values.answer}
                onChange={formik.handleChange}
                error={
                  formik.touched.answer &&
                  Boolean(formik.errors.answer)
                }
                helperText={
                  formik.touched.answer && formik.errors.answer
                }
                variant="filled"
              />
              {pictureUrl ? (
                <img height={100} width={100} src={pictureUrl} />
              ) : (
                ""
              )}
              <Button variant="contained" component="label" color="primary">
                <AddCircleOutlined />
                Upload an Image(If required with question)
                <input
                  type="file"
                  hidden
                  name="data"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const data = e.target.files ? e.target.files[0] : null;
                    if (data) {
                      setFile(data);
                    }
                    e.preventDefault();
                  }}
                />
              </Button>

              <Button variant="contained" type="submit"
                disabled={formik.isSubmitting}
              >
                Mint
              </Button>
            </Stack>
          </form>
        </Box>
      </SwipeableDrawer>

      <Typography variant="h5">Mint your Answer NFT collection: Here are some NFTs</Typography>

      {nftContratTokenMetadataMap.size != 0 ? (
        <Box sx={{ width: "70vw" }}>
          <SwipeableViews
            axis="x"
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {Array.from(nftContratTokenMetadataMap!.entries()).map(
              ([token_id, token]) => (
                <Card
                  sx={{
                    display: "block",
                    maxWidth: "80vw",
                    overflow: "hidden",
                    paddingTop:"2vw",
                  }}
                  key={token_id.toString()}
                >
                  <CardMedia
                    sx={
                      isTablet
                        ? {
                            width: "auto",
                            mx: "auto",
                            maxHeight: "50vh",
                          }
                        : { width: "100%", maxHeight: "40vh" }
                    }
                    component="img"
                    image={token.thumbnailUri?.replace(
                      "ipfs://",
                      "https://ipfs.io/ipfs/",
                    )}
                  />
                  <CardHeader
                    sx={{
                      marginTop: "4vh"
                    }}
                    titleTypographyProps={
                      isTablet ? { fontSize: "1.3em" } : { fontSize: "0.8em" }
                    }
                    title={token.name}
                  />
                  <CardContent>
                    <Box>
                      <Typography>
                        <strong>ID : </strong> {token_id}
                      </Typography>
                      <Typography>
                        <strong>Symbol :</strong> {token.symbol}
                      </Typography>
                      <Typography>
                        {<><strong>Description: </strong> {token.description?.match(descriptionRegex)?.[2]}<br /></>}
                        {<><strong>Answer Type: </strong>{token.description?.match(descriptionRegex)?.[4]}<br /></>}
                        {<><strong>Answer Length: </strong>{token.description?.match(descriptionRegex)?.[6]}<br /></>}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              )
            )}
          </SwipeableViews>
          <MobileStepper
            variant="text"
            steps={Array.from(nftContratTokenMetadataMap!.entries()).length}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={
                  activeStep ===
                  Array.from(nftContratTokenMetadataMap!.entries()).length - 1
                }
              >
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        </Box>
      ) : (
        <Typography sx={{ py: "2em" }} variant="h4">
          Sorry, there is not NFT yet, you need to mint first
        </Typography>
      )}
    </Paper>
  );
}
