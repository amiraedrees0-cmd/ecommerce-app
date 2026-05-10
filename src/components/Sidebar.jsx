import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-dark text-white p-3 vh-100" style={{ width: "220px" }}>
      <h4>Dashboard</h4>

      <Nav className="flex-column">
        <Link to="/dashboard" className="text-white mb-2">Home</Link>
        <Link to="/products" className="text-white mb-2">Products</Link>
        <Link to="/users" className="text-white mb-2">Users</Link>
        <Link to="/carts" className="text-white">Carts</Link>
      </Nav>
    </div>
  );
}