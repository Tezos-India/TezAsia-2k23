import React,{useState} from 'react'
import { useFilePicker } from "use-file-picker";
import { NFTStorage, File } from "nft.storage";
 
import { collectNFT, mintNFT } from '../utils/operation';

const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZENzAwNkUzNDk2REM5QTlkNGRCMmRlN2Y5NTBlN0M3MmYwZjU3NTQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5MjAyMDYzMzkyNSwibmFtZSI6IlNlZCBWYWkifQ.PpABS7QPJjW59sNKrIZWIZ3BW7gP0UBJ-2fZj7GNgC0";
const client = new NFTStorage({ token: apiKey });

const Form = () => {
    const [openFileSelector, { filesContent }] = useFilePicker({
		accept: [".png", ".jpg", ".jpeg"],
		multiple: false,
		readAs: "ArrayBuffer",
	});
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [symbol, setSymbol] = useState("");
	const [amount, setAmount] = useState("0");
	const [error, setError] = useState("");
	const [loadingSubmit, setLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (
            name === "" ||
            description === "" ||
            symbol === "" ||
            amount === "" ||
            // !/^-?d+$/.test(amount) ||
            filesContent.length === 0
        ) {
            setError("Some Error Occurred. Please check entered details.");
            return;
        }
        setLoading(true);
        setError("");
     
        (async () => {
            const metadata = await client.store({
                name: name,
                description: description,
                decimals: 1,
                symbol: symbol,
                image: new File(
                    [filesContent[0].content],
                    filesContent[0].name,
                    { type: "image/" + filesContent[0].name.split(".")[1] }
                ),
            });
			// delete metadata;
            console.log(metadata);
            console.log(amount)
			const object={
				'amount':amount,
				'metadata':metadata
			}
			
			console.log(object)
            mintNFT(object)
     
            setLoading(false);
            setName("");
            setAmount("0");
            setDescription("");
            // setSymbol("");
        })();
    };
  return (
    <div>
        <form className="ui form error">
			<div
				className={`field required ${
					loadingSubmit ? "disabled" : ""
				}`}
			>
				<label>Token Name</label>
				<input className='text-gray-950'
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Tez Bytes"
				/>
			</div>
			{name.length > 30 ? (
				<div className="ui error message">
					<div className="header">Too long!</div>
					<p>The name must be less than 30 letters.</p>
				</div>
			) : null}
			<div
				className={`field required ${
					loadingSubmit ? "disabled" : ""
				}`}
			>
				<label>Description</label>
				<input className='text-gray-950'
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="A digital art piece!"
				/>
			</div>
			{description.length > 300 ? (
				<div className="ui error message">
					<div className="header">Too long!</div>
					<p>The Description must be less than 300 letters.</p>
				</div>
			) : null}
			<div
				className={`field required ${
					loadingSubmit ? "disabled" : ""
				}`}
			>
				<label>Symbol</label>
				<input
                className='text-gray-950'
					type="text"
					value={symbol}
					onChange={(e) => setSymbol(e.target.value)}
					placeholder="TBY"
				/> */
			</div>
			{Symbol.length > 10 ? (
				<div className="ui error message">
					<div className="header">Too long!</div>
					<p>The Symbol must be less than 10 letters.</p>
				</div>
			) : null}
			<div
				className={`field required ${
					loadingSubmit ? "disabled" : ""
				}`}
			>
				<label>
					Selling Amount (Mutez) (There is a 3% service fee)
				</label>
				<input
                    className='text-gray-950'
					type="text"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					placeholder="Amount"
				/>
			</div>
			 {!/^-?d+$/.test(amount) && amount !== "" ? (
				<div className="ui error message">
					<div className="header">Only number allowed</div>
					<p>The amount must be a valid Mutez value.</p>
				</div>
			) : null}
			<div
				className={`field required ${
					loadingSubmit ? "disabled" : ""
				}`}
			>
				<label>Image</label>
				<button
					type="button"
					className="ui basic button"
					onClick={(event) => {
						openFileSelector();
						event.preventDefault();
					}}
				>
					Select files{" "}
				</button>
				{filesContent.length > 0 ? filesContent[0].name : ""}
			</div>
			{error ? (
				<div className="ui error message">
					<div className="header">Error</div>
					<p>{error}</p>
				</div>
			) : null}
 
			<button
				className={`ui button ${loadingSubmit ? "loading" : ""}`}
				onClick={(e) => onSubmit(e)}
				type="submit"
			>
				Mint
			</button>
		</form>
      
    </div>
  )
}

export default Form
