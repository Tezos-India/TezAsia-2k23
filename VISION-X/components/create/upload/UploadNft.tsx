import React, { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Button from "../../design/Button";
import Heading from "../../design/Heading";
import UploadDropzone from "./UploadDropzone";
import {motion} from 'framer-motion'
type Props = {
  setStep: Dispatch<SetStateAction<1 | 2 | 3>>;
  setThumbnail: Dispatch<SetStateAction<string>>;
  setFile: Dispatch<SetStateAction<File | null>>;
  thumbnail: string;
  file: File | null;
};

const UploadNft = ({
  setStep,
  setThumbnail,
  setFile,
  file,
  thumbnail,
}: Props) => {
  return (
    <motion.div animate={{x:[50,0],opacity:[0,1]}}  className="max-w-screen-sm mx-auto">
      <Heading className="text-center">Drag & drop or click to select file </Heading>
      <UploadDropzone
        file={file}
        thumbnail={thumbnail}
        setFile={setFile}
        setThumbnail={setThumbnail}
      />
      <div className="mt-8 flex flex-wrap gap-4 justify-between ">
        <Button
          onClick={() => setStep(1)}
          outline
          variant="primary"
          size="lg"
          className="flex items-center gap-1 w-full sm:w-fit justify-center"
        >
          <FiChevronLeft className="h-6 w-6" />
          Go Back
        </Button>
        {file ? (
          <Button
            onClick={() => setStep(3)}
            variant="primary"
            size="lg"
            className="flex items-center justify-center w-full sm:w-fit gap-1 "
          >
            Add NFT Details
            <FiChevronRight className="h-6 w-6" />
          </Button>
        ) : (
          <Button
            onClick={() => toast.error("Please upload a file")}
            size="lg"
            className="flex items-centerv justify-center w-full sm:w-fit gap-1 px-8
            "
          >
            Add NFT Details
            <FiChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default UploadNft;
