import { useContext, useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import { tezos } from "../utils/tezos";
import { context } from "../App";

const FileUpload = ({account}) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  // const [loading, setLoading] = useState(false);
  const {loading,setLoading}=useContext(context);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        setLoading(true)
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            // pinata_api_key: `ba976f7f1755c3f08e18`,
            pinata_api_key: `a9c60da020ca93360f7b`,
            pinata_secret_api_key: `cdacb7ae20117048e0610cea7ca0d7c5d9a86a1f242176b15c3742c9c68f1488`,

            // pinata_secret_api_key: `969aa976fa88e5b921e51ab217d9115e3853d1f0ccefb5e35b2c42aecd4765d4`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        
      
        try{
          const contract = await tezos.wallet.at("KT1TWcZKqV1V2iTVrPW7Y1rivSsFZjk9TaS6");
          const op =await contract.methods.add(ImgHash).send();
          setLoading(true);
          await op.confirmation(1);
          setLoading(false);
          alert("Successfully Image Uploaded");
          setFileName("No image selected");
          setFile(null);
        }
        catch(err){
          throw err;
        }
     
          
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
      setLoading(false)

    }
    setFileName("No image selected");
    setFile(null);
  };
  
  const retrieveFile = (e) => {
    e.preventDefault();
    const data = e.target.files[0]; //files array of files object
    console.log(data);
    const reader = new FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
  };
  return (
    
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
      
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account} 
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image:{fileName}</span>
        <button type="submit" className="upload" disabled = {!file}>
          Upload File
        </button>
        {loading? 
        <div className="Background">
        <div class="loader"></div>
      </div>
        : null}

      </form>
    </div>
  );
};
export default FileUpload;