import React from 'react';

import DefaultLayout from '../../layout/DefaultLayout';
import ListData from '../../components/ListData/ListData';

const Dashboard: React.FC = () => {
  return (
    <DefaultLayout>
      <ListData />
    </DefaultLayout>
  );
};

export default Dashboard;
