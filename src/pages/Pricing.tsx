import React from 'react';

const tiers = [
  {
    name: 'Starter',
    price: 'Free',
    cta: 'Get Started',
    href: '/analyze',
    highlight: false,
    features: [
      'AI resume analysis',
      'Match score & keywords',
      'Basic suggestions',
      'Export summary',
    ],
  },
  {
    name: 'Pro',
    price: '$12/mo',
    cta: 'Start Pro',
    href: '/analyze',
    highlight: true,
    features: [
      'Everything in Starter',
      'Deep optimization tips',
      'Job-by-job comparisons',
      'Export full PDF report',
      'Priority processing',
    ],
  },
  {
    name: 'Team',
    price: '$29/mo',
    cta: 'Contact Sales',
    href: '#',
    highlight: false,
    features: [
      'All Pro features',
      'Seats & permissions',
      'Shared templates',
      'Admin analytics',
    ],
  },
];

const Pricing: React.FC = () => {
  return (
    <div className="bg-white pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#DDF4E7] to-[#67C090] rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-1/4 -right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-[#26667F] to-[#124170] rounded-full blur-3xl opacity-15" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#DDF4E7] to-[#67C090]/30 border border-[#67C090]/20 mb-6">
            <span className="w-2 h-2 bg-[#67C090] rounded-full mr-2 animate-pulse" />
            <span className="text-xs font-semibold text-[#26667F]">Simple Pricing</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#124170] to-[#26667F] bg-clip-text text-transparent">
              Choose Your Plan
            </span>
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Upgrade when ready. Keep using free forever or unlock premium features.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div key={tier.name} className={`relative card p-8 overflow-hidden ${tier.highlight ? 'ring-2 ring-ocean-500 shadow-large' : ''}`}>
                {tier.highlight && (
                  <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blob" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(38,102,127,0.18), rgba(38,102,127,0.0) 70%)' }} />
                )}
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-neutral-900">{tier.name}</h3>
                  {tier.highlight && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-200 text-ocean-700">Popular</span>
                  )}
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-neutral-900">{tier.price}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start">
                      <span className="w-5 h-5 mr-3 rounded-md bg-sage-100 text-sage-700 flex items-center justify-center">✓</span>
                      <span className="text-neutral-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <a href={tier.href} className={`${tier.highlight ? 'btn-primary w-full' : 'btn-secondary w-full'}`}>
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16 bg-sky-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Questions about plans?</h2>
          <p className="text-lg text-neutral-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Visit the FAQ or reach out — we’re happy to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/faq" className="btn-secondary">View FAQ</a>
            <a href="/analyze" className="btn-primary">Try it free</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
