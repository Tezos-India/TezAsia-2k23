import sha256 from "sha256";
import { InfoOutlined } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  ImageList,
  Pagination,
  TextField,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { char2Bytes } from "@taquito/utils";
import BigNumber from "bignumber.js";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React, { Fragment, useState } from "react";
import * as yup from "yup";
import { UserContext, UserContextType } from "./App";
import ConnectButton from "./ConnectWallet";
import { TransactionInvalidBeaconError } from "./TransactionInvalidBeaconError";
import { address, nat, bytes } from "./type-aliases";

const itemPerPage: number = 6;

type OfferEntry = [nat, Offer];

type Offer = {
  owner: address;
  price: nat;
};

const validationSchema = yup.object({});

export default function CataloguePage() {
  const {
    Tezos,
    nftContratTokenMetadataMap,
    setUserAddress,
    setUserBalance,
    wallet,
    userAddress,
    nftContrat,
    refreshUserContextOnPageReload,
    storage,
  } = React.useContext(UserContext) as UserContextType;
  const [selectedOfferEntry, setSelectedOfferEntry] =
    React.useState<OfferEntry | null>(null);

  const formik = useFormik({
    initialValues: {
      quantity: 1,
      answer:""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("onSubmit: (values)", values, selectedOfferEntry);
      buy(selectedOfferEntry!, sha256(values.answer));
    },
  });
  const { enqueueSnackbar } = useSnackbar();
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(1);

  const buy = async (selectedOfferEntry: OfferEntry, inputAnswer: string) => {
    try {
      const op = await nftContrat?.methods
        .buy(
          BigNumber(selectedOfferEntry[0]) as nat,
          selectedOfferEntry[1].owner,
          char2Bytes(inputAnswer) as bytes
        )
        .send({
          amount: selectedOfferEntry[1].price.toNumber() + 1,
          mutez: true,
        });

      await op?.confirmation(2);

      enqueueSnackbar(
        "Bought " +
          1 +
          " unit of collection (token_id:" +
          selectedOfferEntry[0] +
          ")",
        {
          variant: "success",
        }
      );

      refreshUserContextOnPageReload(); //force all app to refresh the context
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
  const isDesktop = useMediaQuery("(min-width:1100px)");
  const isTablet = useMediaQuery("(min-width:600px)");
  return (
    <Paper>
      <Typography style={{ paddingBottom: "10px" }} variant="h5">
        QnA Questions
      </Typography>

      {storage?.offers && storage?.offers.size != 0 ? (
        <Fragment>
          <Pagination
            page={currentPageIndex}
            onChange={(_, value) => setCurrentPageIndex(value)}
            count={Math.ceil(
              Array.from(storage?.offers.entries()).length / itemPerPage
            )}
            showFirstButton
            showLastButton
          />
          <ImageList
            cols={isDesktop ? itemPerPage / 2 : isTablet ? itemPerPage / 3 : 1}
          >
            {Array.from(storage?.offers.entries())

              .filter((_, index) =>
                index >= currentPageIndex * itemPerPage - itemPerPage &&
                index < currentPageIndex * itemPerPage
                  ? true
                  : false
              )
              .map(([token_id, offer]) => (
                <Card
                  sx={{
                    paddingTop:"4vw"
                  }}
                  key={offer.owner + "-" + token_id.toString()}
                >
                  <CardHeader
                    avatar={
                      <Tooltip
                        title={
                          <Box>
                            <Typography>
                              {" "}
                              {"ID : " + token_id.toString()}{" "}
                            </Typography>
                            <Typography>
                              {"Description : " +
                                nftContratTokenMetadataMap.get(
                                  token_id.toNumber()
                                )?.description}
                            </Typography>
                            <Typography>
                              {"Seller : " + offer.owner}{" "}
                            </Typography>
                          </Box>
                        }
                      >
                        <InfoOutlined />
                      </Tooltip>
                    }
                    title={
                      nftContratTokenMetadataMap.get(token_id.toNumber())?.name
                    }
                  />
                  <CardMedia
                    sx={{ width: "auto", marginLeft: "33%" }}
                    component="img"
                    height="100px"
                    image={nftContratTokenMetadataMap
                      .get(token_id.toNumber())
                      ?.thumbnailUri?.replace(
                        "ipfs://",
                        "https://ipfs.io/ipfs/"
                      )}
                  />

                  <CardContent sx={{marginTop: "3vw"}}>
                    <Box>
                      <Typography variant="body2">
                        {" "}
                        {"Price : " + offer.price.dividedBy(1000000) + " XTZ"}
                      </Typography>
                    </Box>
                  </CardContent>

                  <CardActions>
                    {!userAddress ? (
                      <Box marginLeft="5vw">
                        <ConnectButton
                          Tezos={Tezos}
                          nftContratTokenMetadataMap={
                            nftContratTokenMetadataMap
                          }
                          setUserAddress={setUserAddress}
                          setUserBalance={setUserBalance}
                          wallet={wallet}
                        />
                      </Box>
                    ) : (
                      <form
                        style={{ width: "100%" }}
                        onSubmit={(values) => {
                          setSelectedOfferEntry([token_id, offer]);
                          formik.handleSubmit(values);
                        }}
                        >
                          <TextField
                            sx={{width:"100%"}}
                          id="standar-basic-answer"
                          name="answer"
                          label="Answer To Question"
                          required
                          value={formik.values.answer}
                          onChange={formik.handleChange}
                          error={formik.touched.answer && Boolean(formik.errors.answer)}
                          helperText={
                            formik.touched.answer && formik.errors.answer
                          }
                          variant="filled"
                        />
                        <br />
                        <Button type="submit" aria-label="add to favorites" sx={{marginTop:"2vw"}}>
                          <ShoppingCartIcon /> BUY
                        </Button>
                      </form>
                    )}
                  </CardActions>
                </Card>
              ))}
          </ImageList>
        </Fragment>
      ) : (
        <Typography sx={{ py: "2em" }} variant="h4">
          Sorry, there is not NFT to buy yet, you need to mint or sell first
        </Typography>
      )}
    </Paper>
  );
}