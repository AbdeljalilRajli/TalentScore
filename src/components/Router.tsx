import React from 'react';
import Home from '../pages/Home';
import Analyze from '../pages/Analyze';
import Results from '../pages/Results';
import About from '../pages/About';
import FAQ from '../pages/FAQ';
import Testimonials from '../pages/Testimonials';
import Pricing from '../pages/Pricing';

interface RouterProps {
  currentPath: string;
}

const Router: React.FC<RouterProps> = ({ currentPath }) => {
  switch (currentPath) {
    case '/':
      return <Home />;
    case '/analyze':
      return <Analyze />;
    case '/results':
      return <Results />;
    case '/about':
      return <About />;
    case '/faq':
      return <FAQ />;
    case '/testimonials':
      return <Testimonials />;
    case '/pricing':
      return <Pricing />;
    default:
      return <Home />;
  }
};

export default Router;
