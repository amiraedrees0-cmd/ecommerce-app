import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  Container,
  Card,
  Button,
  Row,
  Col,
} from "react-bootstrap";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/${id}`
      );

      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add To Cart
  const addToCart = () => {
    let cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Product added to cart");
  };

  // Loading
  if (!product) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <Container className="mt-5">

      <Card className="p-4 shadow">

        <Row>

          {/* Image */}

          <Col md={6}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="img-fluid"
            />
          </Col>

          {/* Details */}

          <Col md={6}>

            <h2>{product.title}</h2>

            <p className="text-muted">
              {product.category}
            </p>

            <h4 className="text-success mb-3">
              ${product.price}
            </h4>

            <p>{product.description}</p>

            <p>
              <strong>Brand:</strong>{" "}
              {product.brand}
            </p>

            <p>
              <strong>Rating:</strong>{" "}
              {product.rating}
            </p>

            <p>
              <strong>Stock:</strong>{" "}
              {product.stock}
            </p>

            <Button
              variant="primary"
              onClick={addToCart}
            >
              Add To Cart
            </Button>

          </Col>

        </Row>

      </Card>

    </Container>
  );
}

export default ProductDetails;