import React from 'react';

interface HeroProps {
  kicker?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  image?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ kicker, title, subtitle, actions, image }) => {
  return (
    <section className="relative overflow-hidden pt-20 lg:pt-28 pb-12">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blob" style={{ background: 'radial-gradient( circle at 30% 30%, rgba(221,244,231,0.9), rgba(221,244,231,0.0) 60%)' }} />
        <div className="absolute -top-16 right-[-120px] w-[520px] h-[520px] rounded-full blob" style={{ background: 'radial-gradient( circle at 70% 30%, rgba(103,192,144,0.45), rgba(103,192,144,0.0) 60%)' }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {kicker && (
              <div className="page-kicker mb-6">
                <div className="w-2 h-2 bg-ocean-600 rounded-full mr-3" />
                {kicker}
              </div>
            )}
            <h1 className="page-title mb-6 leading-tight">{title}</h1>
            {subtitle && (
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed max-w-xl">{subtitle}</p>
            )}
            {actions}
          </div>
          {image && (
            <div className="relative">
              {image}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
