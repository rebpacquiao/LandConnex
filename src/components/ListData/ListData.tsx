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
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';

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

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      color: 'gray',
      borderBottom: '1px solid #e0e0e0',
      padding: '16px',
      fontSize: '13px',
      fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: '0.8125rem',
      borderBottom: '1px px solid #e0e0e0',
      padding: '16px',
      color: '#2d2a2ade',
      fontWeight: 400,
    },
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const CapitalizedButton = styled(Button)`
    text-transform: capitalize;
  `;

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

  const [newUser, setNewUser] = useState<User>({
    id: '',
    firstName: '',
    lastName: '',
    dob: '',
    occupation: '',
    accountType: '',
    residency: '',
    taxId: '',
  });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Generate a new id for the new user
    const newId = users.length + 1;

    console.log(newUser, 'test');

    setUsers((prevUsers) => [...prevUsers, { ...newUser, id: newId }]);
    setNewUser({
      id: 0,
      firstName: '',
      lastName: '',
      dob: '',
      occupation: '',
      accountType: '',
      residency: '',
      taxId: '',
      contaInfo: [
        {
          country: '',
          states: '',
          city: '',
          address: '',
          zipCode: '',
        },
      ],
    });
    handleClose();
  };
  return (
    <>
      <div className="data-list-container">
        <div className="page-heading-section">
          <Breadcrumb pageName="User Data" />
          <div className="right-action">
            <CapitalizedButton
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpen}
            >
              add new data
            </CapitalizedButton>
          </div>
        </div>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <form onSubmit={handleFormSubmit}>
            <h2 className="text-2xl mb-3 text-black">Add New Data</h2>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstName"
                  label="First Name"
                  variant="outlined"
                  value={newUser.firstName}
                  fullWidth
                  onChange={(e) =>
                    setNewUser((prevUser) => ({
                      ...prevUser,
                      firstName: e.target.value,
                    }))
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ddd',
                      },
                    },
                    '& .MuiFormLabel-root': {
                      color: 'gray',
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: 'gray',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  value={newUser.lastName}
                  onChange={(e) =>
                    setNewUser((prevUser) => ({
                      ...prevUser,
                      lastName: e.target.value,
                    }))
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ddd',
                      },
                    },
                    '& .MuiFormLabel-root': {
                      color: 'gray',
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: 'gray',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="dob"
                  label="Date of Birth"
                  variant="outlined"
                  fullWidth
                  value={newUser.dob}
                  onChange={(e) =>
                    setNewUser((prevUser) => ({
                      ...prevUser,
                      dob: e.target.value,
                    }))
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ddd',
                      },
                    },
                    '& .MuiFormLabel-root': {
                      color: 'gray',
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: 'gray',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="occupation"
                  label="Occupation"
                  variant="outlined"
                  fullWidth
                  value={newUser.occupation}
                  onChange={(e) =>
                    setNewUser((prevUser) => ({
                      ...prevUser,
                      occupation: e.target.value,
                    }))
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ddd',
                      },
                    },
                    '& .MuiFormLabel-root': {
                      color: 'gray',
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: 'gray',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="accountType"
                  label="Account Type"
                  variant="outlined"
                  fullWidth
                  value={newUser.accountType}
                  onChange={(e) =>
                    setNewUser((prevUser) => ({
                      ...prevUser,
                      accountType: e.target.value,
                    }))
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ddd',
                      },
                    },
                    '& .MuiFormLabel-root': {
                      color: 'gray',
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: 'gray',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="residency"
                  label="Residency"
                  variant="outlined"
                  fullWidth
                  value={newUser.residency}
                  onChange={(e) =>
                    setNewUser((prevUser) => ({
                      ...prevUser,
                      residency: e.target.value,
                    }))
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ddd',
                      },
                    },
                    '& .MuiFormLabel-root': {
                      color: 'gray',
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: 'gray',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="taxId"
                  label="Tax ID"
                  variant="outlined"
                  fullWidth
                  value={newUser.taxId}
                  onChange={(e) =>
                    setNewUser((prevUser) => ({
                      ...prevUser,
                      taxId: e.target.value,
                    }))
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ddd',
                      },
                    },
                    '& .MuiFormLabel-root': {
                      color: 'gray',
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: 'gray',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ marginRight: '10px' }}
                  >
                    Submit
                  </Button>
                  <Button variant="outlined" onClick={handleClose}>
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default ListData;
