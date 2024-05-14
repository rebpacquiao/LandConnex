import React from 'react';

import DefaultLayout from '../../layout/DefaultLayout';
import ListData from '../../components/ListData/ListData';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const Dashboard: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="User Data" />
      <ListData />
    </DefaultLayout>
  );
};

export default Dashboard;
