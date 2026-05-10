import { useEffect, useState } from "react";

import {
  Container,
  Card,
  Button,
} from "react-bootstrap";

function Cart() {

  const [cartItems, setCartItems] =
    useState([]);

  useEffect(() => {

    const savedCart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    setCartItems(savedCart);

  }, []);

  // Remove Product
  const removeFromCart = (id) => {

    const updatedCart =
      cartItems.filter(
        (item) => item.id !== id
      );

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert("Product removed");
  };

  // Order
  const handleOrder = () => {

    localStorage.setItem(
      "orders",
      JSON.stringify(cartItems)
    );

    alert(
      "Order completed successfully"
    );

    // Empty cart
    localStorage.removeItem("cart");

    setCartItems([]);
  };

  return (

    <Container className="mt-4">

      <h2 className="mb-4">
        My Cart
      </h2>

      {cartItems.length === 0 ? (

        <h4>Your cart is empty</h4>

      ) : (

        <>

          {cartItems.map((item) => (

            <Card
              key={item.id}
              className="mb-3 p-3"
            >

              <div className="d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center">

                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    width="100"
                    className="me-3"
                  />

                  <div>

                    <h5>
                      {item.title}
                    </h5>

                    <p>
                      ${item.price}
                    </p>

                  </div>

                </div>

                <Button
                  variant="danger"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  Remove
                </Button>

              </div>

            </Card>

          ))}

          {/* Order Button */}

          <div className="text-center mt-4">

            <Button
              variant="success"
              onClick={handleOrder}
            >
              Order Now
            </Button>

          </div>

        </>

      )}

    </Container>

  );
}

export default Cart;