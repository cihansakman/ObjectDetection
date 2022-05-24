import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore/lite";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Modal,
  Card,
  ListGroup,
  ListGroupItem,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

function MyVerticallyCenteredModal(props) {
  const { product } = props;

  const [isSaveClicked, setIsSaveClicked] = useState(false);

  const [value, setValue] = useState({
    price: product.price,
    quantity: product.quantity,
  });

  useEffect(() => {
    setValue({
      price: product.price,
      quantity: product.quantity,
    });
  }, [product]);

  const handleChange = (name) => (e) => {
    e.preventDefault();
    console.log("Onchange");
    setValue({ ...value, [name]: e.target.value });
    console.log(e.target.value);
  };

  //console.log("Inside the modal, Value:", value);
  //console.log("Product", product);

  const { price, quantity } = value;

  //Function for updating the docs
  const updateDoccument = async () => {
    // e.preventDefault();
    toast.success("Updated Successfully....");
    const ref = doc(db, "products", props.product.id);
    await updateDoc(ref, {
      price: price,
      quantity: quantity,
    });
    setIsSaveClicked(true);
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateDoc}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Price:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => {
                  console.log(e.target.value);
                  setValue({ ...value, ["price"]: e.target.value });
                  //handleChange("price");
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={2}>
              Quantity
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                type="text"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => {
                  console.log(e.target.value);
                  setValue({ ...value, ["quantity"]: e.target.value });
                  //handleChange("price");
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" onClick={updateDoccument}>
                Save
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ProductPage() {
  //Modal configuration
  const [modalShow, setModalShow] = useState(false);
  const [updata, setUpdata] = useState({});
  //Fetch the products in the firebase
  const [products, setProducts] = useState([]);
  const productCollectionRef = collection(db, "products");

  async function getProducts() {
    const data = await getDocs(productCollectionRef);
    await setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  //Fetch all data when page is loaded.
  useEffect(() => {
    getProducts();
  }, []);

  //In order to use the Redux actions
  const dispatch = useDispatch();
  //Get the detectedObjects
  const detectedObjectsArray = useSelector(
    (state) => state.detectedObjects.objects
  );

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  console.log("updata,", updata);
  // usage example:
  const unique = detectedObjectsArray.filter(onlyUnique);

  //console.log("Unique Values", unique);
  //console.log("Detected Objects Values", detectedObjectsArray);
  //dispatch(resetObjects());
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "320vh",
        justifyContent: "center",
        //alignItems: "center",
      }}
    >
      <div
        style={{
          marginTop: 30,
          //alignItems: "center",
        }}
      >
        <ToastContainer />
        {products.map((product) => {
          if (unique.indexOf(product.name) >= 0) {
            return (
              <div
                style={{
                  marginTop: 20,
                  //alignItems: "center",
                }}
              >
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={product.imageURL} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem key={product.id + product.price}>
                      <span style={{ fontWeight: "bold" }}>Price:</span>{" "}
                      {product.price}€
                    </ListGroupItem>
                    <ListGroupItem key={product.id + product.quantity}>
                      <span style={{ fontWeight: "bold" }}>Quantity:</span>{" "}
                      {product.quantity}
                    </ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setUpdata(product);
                        setModalShow(true);
                      }}
                    >
                      Update
                    </Button>
                  </Card.Body>
                </Card>
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  product={updata}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default ProductPage;
