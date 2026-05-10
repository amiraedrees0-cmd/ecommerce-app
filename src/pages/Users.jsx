import { useEffect, useState } from "react";
import API from "../services/API";

import {
  Container,
  Table,
  Card,
} from "react-bootstrap";

function Users() {

  const [users, setUsers] =
    useState([]);

  useEffect(() => {

    getUsers();

  }, []);

  const getUsers = async () => {

    const res =
      await API.get("/users");

    setUsers(res.data.users);

  };

  return (

    <Container className="mt-4">

      <Card className="p-4">

        <h2>Users</h2>

        <Table
          striped
          bordered
          hover
          className="mt-3"
        >

          <thead>

            <tr>

              <th>ID</th>
              <th>Name</th>
              <th>Email</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user.id}>

                <td>{user.id}</td>

                <td>
                  {user.firstName}
                </td>

                <td>
                  {user.email}
                </td>

              </tr>

            ))}

          </tbody>

        </Table>

      </Card>

    </Container>

  );
}

export default Users;
