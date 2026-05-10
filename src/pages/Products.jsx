import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import {
  Card,
  Button,
  Row,
  Col,
  Container,
  Form,
} from "react-bootstrap";


function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = async () => {
    const res = await API.get("/products");

    setProducts(res.data.products);
  };

  const getCategories = async () => {
    const res = await API.get(
      "/products/categories"
    );

    setCategories(res.data);
  };

  const searchProducts = async (value) => {
    setSearch(value);

    if (value === "") {
      getProducts();
    } else {
      const res = await API.get(
        `/products/search?q=${value}`
      );

      setProducts(res.data.products);
    }
  };

  const filterCategory = async (slug) => {
    if (slug === "") {
      getProducts();
    } else {
      const res = await API.get(
        `/products/category/${slug}`
      );

      setProducts(res.data.products);
    }
  };

  return (
    <Container className="mt-4">

<Navbar bg="dark" variant="dark" className="mb-4">
  <Container>

    <Navbar.Brand>
      E-Commerce
    </Navbar.Brand>

    <Nav className="ms-auto">

      <Nav.Link
        onClick={() => navigate("/products")}
      >
        Products
      </Nav.Link>

      <Nav.Link
        onClick={() => navigate("/cart")}
      >
        Cart
      </Nav.Link>

    </Nav>

  </Container>
</Navbar>

      <h2 className="mb-4">
        Welcome {user?.firstName}
      </h2>

      {user?.username === "emilys" && (
        <Button className="mb-3">
          Add Product
        </Button>
      )}

      <Row className="mb-4">

        <Col md={6}>
          <Form.Control
            placeholder="Search"
            value={search}
            onChange={(e) =>
              searchProducts(e.target.value)
            }
          />
        </Col>

        <Col md={6}>
          <Form.Select
            onChange={(e) =>
              filterCategory(e.target.value)
            }
          >
            <option value="">
              All Categories
            </option>

            {categories.map((cat, index) => (
              <option
                key={index}
                value={cat.slug}
              >
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Col>

      </Row>

      <Row>

        {products.map((product) => (

          <Col
            md={4}
            className="mb-4"
            key={product.id}
          >

           <Card
           className="p-4 mb-4"
           id="products"
           >

              <Card.Img
                variant="top"
                src={product.thumbnail}
                style={{
                  height: "250px",
                  objectFit: "cover",
                }}
              />

              <Card.Body>

                <Card.Title>
                  {product.title}
                </Card.Title>

                <h5>${product.price}</h5>

              <Button
               onClick={() => navigate(`/product/${product.id}`)
              }
              >
                View
              </Button>

                {user?.username === "emilys" && (
                  <Button
                    variant="warning"
                    className="ms-2"
                  >
                    Edit
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;