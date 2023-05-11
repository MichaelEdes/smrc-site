import * as React from "react";
import axios from "axios";
import "./AdminTable.css";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function AdminTable({ data }) {
  const [repairs, setRepairs] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [orderItems, setOrderItems] = React.useState([]);

  React.useEffect(() => {
    const fetchAllRepairs = async () => {
      try {
        const res = await axios.get("https://smrc.herokuapp.com/device_repair");
        setRepairs(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAllOrders = async () => {
      try {
        const res = await axios.get("https://smrc.herokuapp.com/orders");
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAllOrderItems = async () => {
      try {
        const res = await axios.get("https://smrc.herokuapp.com/order_items");
        setOrderItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllRepairs();
    fetchAllOrders();
    fetchAllOrderItems();
  }, []);

  function Row({ row }) {
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.id}
          </TableCell>
          <TableCell align="right">{row.user_name}</TableCell>
          <TableCell align="right">{row.order_date}</TableCell>
          <TableCell align="right">£{row.total}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Order Details
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">ID</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Colour</TableCell>
                      <TableCell align="right">memory</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderItems
                      .filter((item) => item.order_id === row.id)
                      .map((item) => (
                        <TableRow key={item.id}>
                          <TableCell align="right">{item.product_id}</TableCell>
                          <TableCell align="right">
                            {item.product_name}
                          </TableCell>
                          <TableCell align="right">{item.color}</TableCell>
                          <TableCell align="right">{item.memory}GB</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">£{item.price}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  function CollapsibleTable({ data }) {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell component="th" scope="row">
                ID
              </TableCell>
              {data === "orders" && (
                <>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Total</TableCell>
                </>
              )}
              {data === "repairs" && (
                <>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Device Type</TableCell>
                  <TableCell align="right">Device Make</TableCell>
                  <TableCell align="right">Device Model</TableCell>
                  <TableCell align="right">Problem</TableCell>
                  <TableCell align="right">Notes</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <Row key={index} row={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return (
    <>
      <CollapsibleTable data={data} />
    </>
  );
}
export default AdminTable;
