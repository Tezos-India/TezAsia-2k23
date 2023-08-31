const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const faceapi = require("face-api.js");
const mongoose = require("mongoose");
const { Canvas, Image } = require("canvas");
const canvas = require("canvas");
const fileUpload = require("express-fileupload");
const cors = require("cors");
faceapi.env.monkeyPatch({ Canvas, Image });
const fs = require("fs");
const path = require("path");
const app = express();

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function LoadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/models/models");
  await faceapi.nets.faceLandmark68Net.loadFromDisk(
    __dirname + "/models/models"
  );
  await faceapi.nets.faceRecognitionNet.loadFromDisk(
    __dirname + "/models/models"
  );
}
LoadModels();

const faceSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique: true,
  },
  descriptions: {
    type: Array,
    required: true,
  },
});

const FaceModel = mongoose.model("Face", faceSchema);

async function uploadLabeledImages(images, label) {
  try {
    let counter = 0;
    const descriptions = [];
    for (let i = 0; i < images.length; i++) {
      const img = await canvas.loadImage(images[i]);
      counter = (i / images.length) * 100;
      console.log(`Progress = ${counter}%`);
      const detections = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();
      descriptions.push(detections.descriptor);
    }
    const createFace = new FaceModel({
      label: label,
      descriptions: descriptions,
    });
    await createFace.save();
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getDescriptorsFromDB(image) {
  let faces = await FaceModel.find();
  for (i = 0; i < faces.length; i++) {
    for (j = 0; j < faces[i].descriptions.length; j++) {
      faces[i].descriptions[j] = new Float32Array(
        Object.values(faces[i].descriptions[j])
      );
    }
    faces[i] = new faceapi.LabeledFaceDescriptors(
      faces[i].label,
      faces[i].descriptions
    );
  }

  const faceMatcher = new faceapi.FaceMatcher(faces, 0.6);
  const img = await canvas.loadImage(image);
  let temp = faceapi.createCanvasFromMedia(img);
  const displaySize = { width: img.width, height: img.height };
  faceapi.matchDimensions(temp, displaySize);
  const detections = await faceapi
    .detectAllFaces(img)
    .withFaceLandmarks()
    .withFaceDescriptors();
  const resizedDetections = faceapi.resizeResults(detections, displaySize);
  const results = resizedDetections.map((d) =>
    faceMatcher.findBestMatch(d.descriptor)
  );
  return results;
}

const extractFeaces = async (image) => {
  const img = await canvas.loadImage(image);
  let temp = faceapi.createCanvasFromMedia(img);
  const displaySize = { width: img.width, height: img.height };
  faceapi.matchDimensions(temp, displaySize);
  const detections = await faceapi.detectAllFaces(img).withFaceLandmarks();
  const resizedDetections = faceapi.resizeResults(detections, displaySize);
  //cutout the face and save it to a new file
  const out = faceapi.createCanvasFromMedia(img);
  faceapi.matchDimensions(out, displaySize);
  const ctx = out.getContext("2d");
  resizedDetections.forEach((detection) => {
    const box = detection.detection.box;
    ctx.drawImage(img, box.x, box.y, box.width, box.height, 0, 0, 200, 200);
  });
  return out.toBuffer("image/jpeg");
};

app.get("/", (req, res) => {
  res.status(200).json({ status: "online" });
});

app.post("/send", (req, res) => {
  const { number, message } = req.body;
  console.log(number, message);
  client.messages
    .create({
      body: message,
      from: "+12708131181",
      to: `+91${number}`,
    })
    .then((message) => {
      res.status(200).json({ message: "Message sent successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Message not sent" });
    });
});

app.post("/post-face", async (req, res) => {
  const File1 = req.files.File1.tempFilePath;
  const label = req.body.label;
  let faces = await extractFeaces(File1);
  fs.writeFileSync(__dirname + "/img/face.jpg", faces);

  // let result = await uploadLabeledImages(
  //   [File1, File2, File3, File4, File5, File6],
  //   label
  // );

  let result = await uploadLabeledImages(
    [
      __dirname + "/img/face.jpg",
      __dirname + "/img/face.jpg",
      __dirname + "/img/face.jpg",
      __dirname + "/img/face.jpg",
    ],
    label
  );
  fs.readdir(__dirname + "/tmp", (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(__dirname + "/tmp", file), (err) => {
        if (err) throw err;
      });
    }
  });

  fs.unlink(__dirname + "/img/face.jpg", (err) => {
    if (err) throw err;
  });

  if (result) {
    res.json({ message: "Face data stored successfully" });
  } else {
    res.json({ message: "Something went wrong, please try again." });
  }
});

app.post("/check-face", async (req, res) => {
  const File1 = req.files.File1.tempFilePath;
  let result = await getDescriptorsFromDB(File1);
  res.json({ result });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
  mongoose.set("strictQuery", true);
  mongoose
    .connect(
      "mongodb+srv://admin:Dws5eFgTaYXq47HD@mern.ztyvxss.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Connected to MongoDB");
    });
});
