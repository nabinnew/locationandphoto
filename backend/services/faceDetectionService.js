const faceapi = require("face-api.js");
const canvas = require("canvas");
const { Canvas, Image, ImageData } = canvas;
const path = require("path");

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const MODEL_PATH = path.join(__dirname, "../models/ssd_mobilenetv1");

let modelLoaded = false;

// Load model once
async function loadModel() {
  if (!modelLoaded) {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH);
    modelLoaded = true;
    console.log("✅ SSD Mobilenet model loaded");
  }
}

async function detectFaces(imagePath) {
  if (!modelLoaded) {
    await loadModel(); // make sure model is loaded
  }

  const img = await canvas.loadImage(imagePath);
  const detections = await faceapi.detectAllFaces(img);
  return detections.length;
}

module.exports = { detectFaces };
