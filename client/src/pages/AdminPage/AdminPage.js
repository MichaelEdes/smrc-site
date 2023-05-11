import * as React from "react";
import "./AdminPage.css";
import AdminTable from "../../components/Table/AdminTable";

function AdminPage() {
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
