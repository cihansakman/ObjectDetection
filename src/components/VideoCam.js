// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./VideoCam.css";
import { nextFrame } from "@tensorflow/tfjs";
// 2. TODO - Import drawing utility here
//import { drawRect } from "../utilities";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addDetectedObject,
  resetObjects,
} from "../store/redux/detectedObjects";

function VideoCam() {
  //Import the actions which we need to use
  // Define our labelmap
  const labelMap = {
    1: { id: "1", name: "NiveaSoft", color: "red" },
    2: { id: "2", name: "Neutrogena", color: "yellow" },
    3: { id: "3", name: "CocaColaBox", color: "lime" },
    4: { id: "4", name: "CelenesSunCream", color: "blue" },
  };
  //We're using useSelector() hook to reach Redux store
  //detectedObjects is the name of the Reducer in the store
  const detectedObjectsArray = useSelector(
    (state) => state.detectedObjects.objects
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //Reset the cache of detected objects
  useEffect(() => {
    dispatch(resetObjects());
    console.log("USE EFFECT Detected OBject array", detectedObjectsArray);
  }, []);

  // Define a drawing function
  const drawRect = (
    boxes,
    classes,
    scores,
    threshold,
    imgWidth,
    imgHeight,
    ctx
  ) => {
    for (let i = 0; i <= boxes.length; i++) {
      if (boxes[i] && classes[i] && scores[i] > threshold) {
        // Extract variables
        const [y, x, height, width] = boxes[i];
        const text = classes[i];

        dispatch(addDetectedObject({ name: labelMap[text]["name"] }));
        // Set styling
        ctx.strokeStyle = labelMap[text]["color"];
        ctx.lineWidth = 10;
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";

        // DRAW!!
        ctx.beginPath();
        ctx.fillText(
          labelMap[text]["name"] + " - " + Math.round(scores[i] * 100) / 100,
          x * imgWidth,
          y * imgHeight - 10
        );
        ctx.rect(
          x * imgWidth,
          y * imgHeight,
          (width * imgWidth) / 2,
          (height * imgHeight) / 2
        );
        ctx.stroke();
      }
    }
  };

  //If detected classes is more than 5 redirect it to the product page.
  // async function redirectPage(array) {
  //   await setTimeout(function () {
  //     if (array.length > 5) {
  //       return navigate("/product/");
  //     }
  //     console.log("Length of array:", array.length);
  //   }, 2000);
  // }

  function redirectPage(array) {
    if (array.length > 9) {
      return navigate("/product/");
    }
    console.log("Length of array:", array.length);
  }

  //console.log("Detected OBject array", detectedObjectsArray);
  redirectPage(detectedObjectsArray);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network
    //const net = await tf.loadGraphModel('https://livelong.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json')
    const net = await tf.loadGraphModel(
      "https://myobjectdetectionbucket.s3.eu-de.cloud-object-storage.appdomain.cloud/model.json"
    );

    // Loop and detect products
    setInterval(() => {
      detect(net);
    }, 16.7);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      const img = tf.browser.fromPixels(video);
      const resized = tf.image.resizeBilinear(img, [640, 480]);
      const casted = resized.cast("int32");
      const expanded = casted.expandDims(0);
      const obj = await net.executeAsync(expanded);

      //console.log(await obj[0].array());

      const boxes = await obj[4].array();
      const classes = await obj[1].array();
      const scores = await obj[0].array();

      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)
      requestAnimationFrame(() => {
        drawRect(
          boxes[0],
          classes[0],
          scores[0],
          0.9,
          videoWidth,
          videoHeight,
          ctx
        );
      });
      //console.log(classes[0]);

      tf.dispose(img);
      tf.dispose(resized);
      tf.dispose(casted);
      tf.dispose(expanded);
      tf.dispose(obj);
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          id="canvas"
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default VideoCam;
