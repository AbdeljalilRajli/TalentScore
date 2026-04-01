import React from 'react';
import Home from '../pages/Home';
import Analyze from '../pages/Analyze';
import CoverLetter from '../pages/CoverLetter';
import Tracker from '../pages/Tracker';
import Auth from '../pages/Auth';
import Layout from './Layout/Layout';

interface RouterProps {
  currentPath: string;
}

const Router: React.FC<RouterProps> = ({ currentPath }) => {
  switch (currentPath) {
    case '/':
      return (
        <Layout currentPath={currentPath}>
          <Home />
        </Layout>
      );
    case '/login':
      return (
        <Layout currentPath={currentPath}>
          <Auth />
        </Layout>
      );
    case '/analyze':
      return (
        <Layout currentPath={currentPath}>
          <Analyze />
        </Layout>
      );
    case '/cover-letter':
      return (
        <Layout currentPath={currentPath}>
          <CoverLetter />
        </Layout>
      );
    case '/tracker':
      return (
        <Layout currentPath={currentPath}>
          <Tracker />
        </Layout>
      );
    default:
      return (
        <Layout currentPath={currentPath}>
          <Home />
        </Layout>
      );
  }
};

export default Router;
