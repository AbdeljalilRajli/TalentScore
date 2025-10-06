import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  container?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'white' | 'muted' | 'brand';
}

const Section: React.FC<SectionProps> = ({ id, className = '', children, container = 'lg', background = 'white' }) => {
  const bg = background === 'muted' ? 'bg-cream-50' : background === 'brand' ? 'bg-ocean-600 text-white' : 'bg-white';
  const max = container === 'sm' ? 'max-w-3xl' : container === 'md' ? 'max-w-5xl' : container === 'lg' ? 'max-w-7xl' : 'max-w-[90rem]';
  return (
    <section id={id} className={`${bg} py-16 lg:py-24 ${className}`}>
      <div className={`${max} mx-auto px-4 sm:px-6 lg:px-8`}>
        {children}
      </div>
    </section>
  );
};

export default Section;
