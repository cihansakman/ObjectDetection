import { useDispatch, useSelector } from "react-redux";
//Import the actions which we need to use
import { addDetectedObject, resetObjects } from "./store/redux/detectedObjects";
// Define our labelmap
const labelMap = {
  1: { name: "NiveaSoft", color: "red" },
  2: { name: "Neutrogena", color: "yellow" },
  3: { name: "CocaColaBox", color: "lime" },
  4: { name: "CelenesSunCream", color: "blue" },
};

//We're using useSelector() hook to reach Redux store
//detectedObjects is the name of the Reducer in the store
/*const detectedObjectsArray = useSelector(
  (state) => state.detectedObjects.objects
);
const dispatch = useDispatch();
*/
// Define a drawing function
export const drawRect = (
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
      const objectName = labelMap[text]["name"];
      //console.log(labelMap[text]["name"]);
      //dispatch(addDetectedObject({ name: objectName }));
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
