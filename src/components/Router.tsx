import React from 'react';
import Home from '../pages/Home';
import Analyze from '../pages/Analyze';
import Layout from './Layout/Layout';

interface RouterProps {
  currentPath: string;
}

const Router: React.FC<RouterProps> = ({ currentPath }) => {
  switch (currentPath) {
    case '/':
      return <Home />;
    case '/analyze':
      return (
        <Layout currentPath={currentPath}>
          <Analyze />
        </Layout>
      );
    default:
      return <Home />;
  }
};

export default Router;
