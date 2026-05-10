import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function TopNav() {
  const nav = useNavigate();

  return (
    <div className="d-flex justify-content-between p-3 bg-light">
      <h5>E-Commerce</h5>

      <Button
        variant="danger"
        onClick={() => {
          localStorage.removeItem("token");
          nav("/");
        }}
      >
        Logout
      </Button>
    </div>
  );
}