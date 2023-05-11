import * as React from "react";
import "./AdminPage.css";
import AdminTable from "../../components/Table/AdminTable";

function AdminPage() {
  return (
    <div>
      {/* <AdminTable data={"orders"} /> */}
      <AdminTable data={"repairs"} />
    </div>
  );
}

export default AdminPage;
