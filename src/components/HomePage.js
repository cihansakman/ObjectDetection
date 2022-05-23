import * as React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addDetectedObject,
  resetObjects,
} from "../store/redux/detectedObjects";

function HomePage() {
  //Fetch the products in the firebase
  const [products, setProducts] = useState([]);

  async function getProducts(db) {
    const productCollectionRef = collection(db, "products");
    const data = await getDocs(productCollectionRef);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  const dispatch = useDispatch();
  dispatch(addDetectedObject({ name: "Fekkko" }));

  //Fetch all data when page is loaded.

  //Get the detectedObjects
  const detectedObjectsArray = useSelector(
    (state) => state.detectedObjects.objects
  );
  console.log("array=>", detectedObjectsArray);
  console.log("Çalışıyor...");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Link to="/capture">
          <Button variant="primary" size="lg">
            Detect Object
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
