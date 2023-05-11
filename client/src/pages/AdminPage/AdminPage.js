import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";
import AdminTable from "../../components/Table/AdminTable";

function AdminPage({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/AdminLoginPage");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="admin-container">
      <h1>Orders</h1>
      <AdminTable data={"orders"} />
      <h1>Repairs</h1>
      <AdminTable data={"repairs"} />
    </div>
  );
}

export default AdminPage;
