import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import userData from "../data/userData.jsx";
import User from "../model/UserModel.jsx";
import { styled } from "@mui/material/styles";
import Search from "../components/SearchComponent.jsx";

function ListData() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setUsers(userData);
  }, []);

  const columns = [
    "First Name",
    "Last Name",
    "Date of Birth",
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);

    return event;
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="data-list-container">
        <div className="filter-section">
          <Search value={searchValue} onChange={setSearchValue} />
        </div>
        <div className="data-list-section">
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
                {users
                  .filter(
                    (user) =>
                      user.firstName
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                      user.lastName
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user: User) => (
                    <StyledTableRow key={user.id}>
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default ListData;
