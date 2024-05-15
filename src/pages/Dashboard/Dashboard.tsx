import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import ListData from '../../components/ListData/ListData';
import { AuthContext } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <DefaultLayout>
      <ListData />
    </DefaultLayout>
  );
};

export default Dashboard;
