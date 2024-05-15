import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../src/assets/login-bg.jpg';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const dummyEmail = 'user@example.com';
    const dummyPassword = 'password';

    if (email === dummyEmail && password === dummyPassword) {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <>
      <div
        className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="login-container">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleLogin}
            >
              <div>
                <div className="mt-2">
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#fff',
                        },
                        '& input': {
                          color: '#fff',
                        },
                      },
                      '& .MuiFormLabel-root': {
                        color: '#fff',
                      },
                      '& .MuiFormLabel-root.Mui-focused': {
                        color: '##3fff',
                      },
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="mt-2">
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#ddd',
                        },
                        '& input': {
                          color: '#fff',
                        },
                      },
                      '& .MuiFormLabel-root': {
                        color: '#fff',
                      },
                      '& .MuiFormLabel-root.Mui-focused': {
                        color: '#fff',
                      },
                    }}
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    lineHeight: '1.5rem',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.375rem',
                    '&:hover': {
                      backgroundColor: '#4F46E5',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 0 0 0.25rem rgba(99, 102, 241, 0.5)',
                    },
                  }}
                >
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
