import clsx from "clsx";
import { clear } from "console";
import { isDragActive } from "framer-motion";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { HiXCircle } from "react-icons/hi";
import FileUploadIcon from "./FileUploadIcon";

type FileWithPreview = {
  previewUrl: string;
} & File;

type Props = {
  setThumbnail: Dispatch<SetStateAction<string>>;
  setFile: Dispatch<SetStateAction<File | null>>;
  thumbnail: string;
  file: File | null;
};

const UploadDropzone = ({ file, thumbnail, setFile, setThumbnail }: Props) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    let previewUrl;
    previewUrl = URL.createObjectURL(acceptedFiles[0]);
    console.log(acceptedFiles)
    setFile(acceptedFiles[0]);
    setThumbnail(previewUrl);
    console.log({file,thumbnail})
  }, []);

  const { getRootProps, getInputProps, isDragReject, isDragAccept } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpeg", ".jpeg"],
        "image/gif": [".gif"],
        "image/svg+xml": [".svg"]
      },
    });

  const clearFile = () => {
    setFile(null);
    setThumbnail("");
  };

  useEffect(() => {
    if (isDragReject) {
      toast.error("File type not supported.");
      clearFile()
    }
  }, [isDragReject]);

  return (
    <div className="pt-4">
      <div
        {...getRootProps()}
        className={clsx(
          "rounded-lg flex border-2 cursor-pointer flex-col h-[400px] items-center justify-center overflow-hidden",
          {
            "border-red-500 shadow-2xl bg-red-100 bg-opacity-50": isDragReject === true,
            "border-green-500 border-solid shadow-2xl bg-green-100 bg-opacity-50": isDragAccept === true,
            "border-dashed border-gray-500":!file,
            "border-slate-300 bg-white bg-opacity-20 ":file
          }
        )}
      >
        <input {...getInputProps()} />
        {!file && (
          <div className="flex flex-col my-36 items-center justify-center gap-4">
            <FileUploadIcon
              className={
                "h-20 w-20" + (isDragReject === true && "text-red-500")
              }
            />

            {isDragReject ? (
              <p className="text-red-500">Unsupported file type </p>
            ) : (
              <>
                <p className="font-medium text-primary-500">(JPG, PNG, JPEG, GIF, SVG)</p>
                <p className="text-gray-600">
                  Max File size 100 MB
                </p>
              </>
            )}
          </div>
        )}
        {file && (
          <div className="h-full">
            <img
              src={thumbnail.toString()}
              alt="preview"
              className="h-full object-contain"
            />
          </div>
        )}
      </div>

      {file && (
        <div className="flex items-center shadow-custom px-4 py-2 mt-4 backdrop-brightness-110 rounded-xl justify-between">
          {file.name}
          <button onClick={clearFile}>
            <HiXCircle className="h-8 w-8 text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadDropzone;
