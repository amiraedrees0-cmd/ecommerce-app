import { useEffect, useState } from "react";

import {
  Container,
  Table,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";

function ProductsAdmin() {

  const [products, setProducts] =
    useState([]);

  const [show, setShow] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState(null);

  const [title, setTitle] =
    useState("");

  const [price, setPrice] =
    useState("");

  // Load Products
  useEffect(() => {

    const savedProducts =
      JSON.parse(
        localStorage.getItem("products")
      ) || [];

    if (savedProducts.length > 0) {

      setProducts(savedProducts);

    } else {

      fetchProducts();

    }

  }, []);

  // API Products
  const fetchProducts = async () => {

    const res = await fetch(
      "https://dummyjson.com/products"
    );

    const data = await res.json();

    setProducts(data.products);

    localStorage.setItem(
      "products",
      JSON.stringify(data.products)
    );
  };

  // Open Modal
  const handleShow = () =>
    setShow(true);

  // Close Modal
  const handleClose = () => {

    setShow(false);

    setEditingProduct(null);

    setTitle("");

    setPrice("");
  };

  // Add Product
  const handleAddProduct = () => {

    const newProduct = {

      id: Date.now(),

      title,

      price,

      thumbnail:
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    };

    const updatedProducts = [
      ...products,
      newProduct,
    ];

    setProducts(updatedProducts);

    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    alert("Product Added");

    handleClose();
  };

  // Delete Product
  const handleDelete = (id) => {

    const updatedProducts =
      products.filter(
        (product) => product.id !== id
      );

    setProducts(updatedProducts);

    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    alert("Product Deleted");
  };

  // Edit Product
  const handleEditClick = (product) => {

    setEditingProduct(product);

    setTitle(product.title);

    setPrice(product.price);

    setShow(true);
  };

  // Update Product
  const handleUpdateProduct = () => {

    const updatedProducts =
      products.map((product) =>

        product.id === editingProduct.id

          ? {
              ...product,
              title,
              price,
            }

          : product
      );

    setProducts(updatedProducts);

    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    alert("Product Updated");

    handleClose();
  };

  return (

    <Container className="mt-4">

      <Card className="p-4">

        <div className="d-flex justify-content-between align-items-center">

          <h2>Products Dashboard</h2>

          <Button
            variant="success"
            onClick={handleShow}
          >
            Add Product
          </Button>

        </div>

        <Table
          striped
          bordered
          hover
          className="mt-4"
        >

          <thead>

            <tr>

              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr key={product.id}>

                <td>{product.id}</td>

                <td>
                  {product.title}
                </td>

                <td>
                  ${product.price}
                </td>

                <td>

                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() =>
                      handleEditClick(product)
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() =>
                      handleDelete(product.id)
                    }
                  >
                    Delete
                  </Button>

                </td>

              </tr>

            ))}

          </tbody>

        </Table>

      </Card>

      {/* Modal */}

      <Modal
        show={show}
        onHide={handleClose}
      >

        <Modal.Header closeButton>

          <Modal.Title>

            {editingProduct
              ? "Edit Product"
              : "Add Product"}

          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          <Form>

            <Form.Group className="mb-3">

              <Form.Label>
                Product Title
              </Form.Label>

              <Form.Control
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

            </Form.Group>

            <Form.Group>

              <Form.Label>
                Product Price
              </Form.Label>

              <Form.Control
                type="number"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
              />

            </Form.Group>

          </Form>

        </Modal.Body>

        <Modal.Footer>

          <Button
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>

          {editingProduct ? (

            <Button
              variant="warning"
              onClick={handleUpdateProduct}
            >
              Update
            </Button>

          ) : (

            <Button
              variant="success"
              onClick={handleAddProduct}
            >
              Add
            </Button>

          )}

        </Modal.Footer>

      </Modal>

    </Container>
  );
}

export default ProductsAdmin;