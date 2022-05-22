import * as React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetObjects } from "../store/redux/detectedObjects";
function ProductPage() {
  const dispatch = useDispatch();

  const detectedObjectsArray = useSelector(
    (state) => state.detectedObjects.objects
  );

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  // usage example:
  var unique = detectedObjectsArray.filter(onlyUnique);

  console.log("Unique Values", unique);
  //dispatch(resetObjects());
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>The corresponding product....{unique[0]}</h1>
      <Link to="/capture">
        <Button variant="primary" size="lg">
          Retrun and Detect Again
        </Button>
      </Link>
    </div>
  );
}

export default ProductPage;
