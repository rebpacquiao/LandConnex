import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import userData from "../data/userData.jsx";
import User from "../model/UserModel.jsx";
import { styled } from "@mui/material/styles";

function ListData() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers(userData);
  }, []);

  const columns = [
    "ID",
    "First Name",
    "Last Name",
    "DOB",
    "Occupation",
    "Account Type",
    "Residency",
    "Tax ID",
  ];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column}>{column}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: User) => (
            <StyledTableRow key={user.id}>
              <StyledTableCell>{user.id}</StyledTableCell>
              <StyledTableCell>{user.firstName}</StyledTableCell>
              <StyledTableCell>{user.lastName}</StyledTableCell>
              <StyledTableCell>{user.dob}</StyledTableCell>
              <StyledTableCell>{user.occupation}</StyledTableCell>
              <StyledTableCell>{user.accountType}</StyledTableCell>
              <StyledTableCell>{user.residency}</StyledTableCell>
              <StyledTableCell>{user.taxId}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListData;
