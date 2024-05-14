import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import userData from '../../data/userData.tsx';
import User from '../../model/UserModel.jsx';
import { styled } from '@mui/material/styles';
import Search from '../../components/Search/SearchComponent.tsx';
import Checkbox from '@mui/material/Checkbox';

function ListData() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = users.map((user) => user.id.toString());
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);

    return event;
  };

  useEffect(() => {
    setUsers(userData);
  }, []);

  const columns = [
    'First Name',
    'Last Name',
    'Date of Birth',
    'Occupation',
    'Account Type',
    'Residency',
    'Tax ID',
  ];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      borderBottom: '1px px solid #e0e0e0',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      borderBottom: '1px px solid #e0e0e0',
    },
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);

    return event;
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
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
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selected.length > 0 && selected.length < users.length
                      }
                      checked={
                        users.length > 0 && selected.length === users.length
                      }
                      onChange={handleSelectAllClick}
                    />
                  </StyledTableCell>
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
                        .includes(searchValue.toLowerCase()),
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user: User) => {
                    const isItemSelected =
                      selected.indexOf(user.id.toString()) !== -1;
                    return (
                      <StyledTableRow
                        key={user.id}
                        onClick={(event) =>
                          handleClick(event, user.id.toString())
                        }
                        selected={isItemSelected}
                      >
                        <StyledTableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} />
                        </StyledTableCell>
                        <StyledTableCell>{user.firstName}</StyledTableCell>
                        <StyledTableCell>{user.lastName}</StyledTableCell>
                        <StyledTableCell>{user.dob}</StyledTableCell>
                        <StyledTableCell>{user.occupation}</StyledTableCell>
                        <StyledTableCell>{user.accountType}</StyledTableCell>
                        <StyledTableCell>{user.residency}</StyledTableCell>
                        <StyledTableCell>{user.taxId}</StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
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
