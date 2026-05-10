import { useEffect, useState } from "react";

import {
  Container,
  Card,
  Table,
} from "react-bootstrap";

function Carts() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    const savedOrders =
      JSON.parse(
        localStorage.getItem("orders")
      ) || [];

    setOrders(savedOrders);

  }, []);

  return (

    <Container className="mt-4">

      <Card className="p-4">

        <h2 className="mb-4">
          Orders
        </h2>

        {orders.length === 0 ? (

          <h5>No Orders Yet</h5>

        ) : (

          <Table
            striped
            bordered
            hover
          >

            <thead>

              <tr>

                <th>ID</th>
                <th>Product</th>
                <th>Price</th>

              </tr>

            </thead>

            <tbody>

              {orders.map((item) => (

                <tr key={item.id}>

                  <td>{item.id}</td>

                  <td>
                    {item.title}
                  </td>

                  <td>
                    ${item.price}
                  </td>

                </tr>

              ))}

            </tbody>

          </Table>

        )}

      </Card>

    </Container>

  );
}

export default Carts;