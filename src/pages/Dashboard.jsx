import {
  Navbar,
  Container,
  Nav,
} from "react-bootstrap";

function Dashboard() {

  return (

    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
    >

      <Container>

        <Navbar.Brand>
          Admin Dashboard
        </Navbar.Brand>

        <Nav className="ms-auto">

          <Nav.Link href="/dashboard/products">
            Products
          </Nav.Link>

          <Nav.Link href="/dashboard/users">
            Users
          </Nav.Link>

          <Nav.Link href="/dashboard/carts">
            Carts
          </Nav.Link>

        </Nav>

      </Container>

    </Navbar>

  );
}

export default Dashboard;