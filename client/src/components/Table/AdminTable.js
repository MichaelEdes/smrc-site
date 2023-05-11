import * as React from "react";
import axios from "axios";
import "./AdminTable.css";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/system";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "blue",
    color: "white",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textTransform: "lowercase",
  },
}));

function AdminTable({ data }) {
  const [repairs, setRepairs] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [orderItems, setOrderItems] = React.useState([]);
  const [confirm, setConfirm] = React.useState(0);

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

  const handleDelete = async (id) => {
    if (confirm < 1) {
      alert(
        "Are you sure you want to delte this repair? click 'confirm' again to confirm completion"
      );
      setConfirm(confirm + 1);
    } else {
      try {
        await axios.delete(`https://smrc.herokuapp.com/device_repair/${id}`);
        setRepairs(repairs.filter((repair) => repair.id !== id));
        setConfirm(0);
      } catch (err) {
        console.log(err);
      }
    }
  };

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
          <StyledTableCell component="th" scope="row">
            {row.id}
          </StyledTableCell>
          {data === "orders" && (
            <>
              <StyledTableCell align="right">{row.user_name}</StyledTableCell>
              <StyledTableCell align="right">
                {new Date(row.order_date).toLocaleDateString()}
              </StyledTableCell>
              <StyledTableCell align="right">£{row.total}</StyledTableCell>
            </>
          )}
          {data === "repairs" && (
            <>
              <StyledTableCell align="right">
                {row.first_name} {row.surname}
              </StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">
                {new Date(row.date).toLocaleDateString()}
              </StyledTableCell>
              <StyledTableCell align="right">
                <button
                  className="confirm-btn"
                  onClick={() => handleDelete(row.id)}
                >
                  {confirm < 1 ? "Completed" : "Confirm"}
                </button>
              </StyledTableCell>
            </>
          )}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {data === "orders" && (
                <Box sx={{ margin: "3vh 3vw 5vh 3vw" }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Order Details
                  </Typography>
                  <Table
                    className="sub-table"
                    size="small"
                    aria-label="purchases"
                  >
                    <TableHead sx={{ fontWeight: "bold" }}>
                      <TableRow>
                        <StyledTableCell align="left">ID</StyledTableCell>
                        <StyledTableCell align="left">Name</StyledTableCell>
                        <StyledTableCell align="right">Colour</StyledTableCell>
                        <StyledTableCell align="right">memory</StyledTableCell>
                        <StyledTableCell align="right">
                          Quantity
                        </StyledTableCell>
                        <StyledTableCell align="right">Total</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orderItems
                        .filter((item) => item.order_id === row.id)
                        .map((item) => (
                          <TableRow key={item.id}>
                            <StyledTableCell align="left">
                              {item.product_id}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {item.product_name}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {item.color}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {item.memory}GB
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {item.quantity}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              £{item.price}
                            </StyledTableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </Box>
              )}
              {data === "repairs" && (
                <Box sx={{ margin: "3vh 3vw 5vh 3vw" }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Repair Details
                  </Typography>
                  <Table
                    className="sub-table"
                    size="small"
                    aria-label="purchases"
                  >
                    <TableHead sx={{ fontWeight: "bold" }}>
                      <TableRow>
                        <StyledTableCell />
                        <StyledTableCell align="left">
                          Device Type
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          Device Make
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          Device Model
                        </StyledTableCell>
                        <StyledTableCell align="left">Problem</StyledTableCell>
                        <StyledTableCell className="table-notes" align="left">
                          Notes
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell />
                        <TableCell align="left">{row.device_type}</TableCell>
                        <TableCell align="left">{row.device_make}</TableCell>
                        <TableCell align="left">{row.device_model}</TableCell>
                        <TableCell align="left">{row.problem}</TableCell>
                        <TableCell align="left">
                          {row.other_notes ? row.other_notes : "No Notes"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              )}
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  function CollapsibleTable({ data }) {
    return (
      <>
        {(data === "orders" && orders.length > 0) ||
        (data === "repairs" && repairs.length > 0) ? (
          <>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead sx={{ fontWeight: "200" }}>
                  <TableRow>
                    <StyledTableCell />
                    <StyledTableCell component="th" scope="row">
                      ID
                    </StyledTableCell>
                    {data === "orders" && (
                      <>
                        <StyledTableCell align="right">Name</StyledTableCell>
                        <StyledTableCell align="right">Date</StyledTableCell>
                        <StyledTableCell align="right">Total</StyledTableCell>
                      </>
                    )}
                    {data === "repairs" && (
                      <>
                        <StyledTableCell align="right">Name</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Date</StyledTableCell>
                        <StyledTableCell />
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data === "orders" && (
                    <>
                      {orders.map((order, index) => (
                        <Row key={index} row={order} />
                      ))}
                    </>
                  )}
                  {data === "repairs" && (
                    <>
                      {repairs.map((repair, index) => (
                        <Row key={index} row={repair} />
                      ))}
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <>No {data}</>
        )}
      </>
    );
  }
  return (
    <>
      <CollapsibleTable data={data} />
    </>
  );
}
export default AdminTable;
