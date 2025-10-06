import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Alice Johnson",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "This tool helped me optimize my resume in minutes. The AI suggestions were spot-on!",
      role: "Software Engineer",
      company: "Tech Startup",
      improvement: "45%"
    },
    {
      name: "Mark Thompson",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "I finally understood which skills I was missing. Amazing tool!",
      role: "Product Manager",
      company: "Fortune 500",
      improvement: "38%"
    },
    {
      name: "Sophia Lee",
      photo: "https://randomuser.me/api/portraits/women/68.jpg",
      quote: "Clean design and really easy to use. Definitely portfolio-worthy.",
      role: "UX Designer",
      company: "Design Agency",
      improvement: "52%"
    },
    {
      name: "David Rodriguez",
      photo: "https://randomuser.me/api/portraits/men/45.jpg",
      quote: "The keyword analysis helped me tailor my resume perfectly for each job application.",
      role: "Data Scientist",
      company: "AI Company",
      improvement: "41%"
    },
    {
      name: "Emily Chen",
      photo: "https://randomuser.me/api/portraits/women/32.jpg",
      quote: "I got three interview calls within a week of updating my resume based on the suggestions!",
      role: "Marketing Manager",
      company: "E-commerce",
      improvement: "47%"
    },
    {
      name: "James Wilson",
      photo: "https://randomuser.me/api/portraits/men/28.jpg",
      quote: "The match score feature is brilliant. It shows exactly where I stand with each application.",
      role: "DevOps Engineer",
      company: "Cloud Provider",
      improvement: "39%"
    }
  ];


  return (
    <div className="bg-white pt-16">
      {/* Hero Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-neutral-900">
            Testimonials
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Real stories from job seekers who transformed their careers with TalentScore
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex text-ocean-400 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <blockquote className="text-neutral-700 text-lg leading-relaxed mb-8 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-neutral-900 text-lg">{testimonial.name}</h3>
                    <p className="text-neutral-600 text-sm">{testimonial.role}</p>
                    <p className="text-ocean-600 text-sm font-semibold">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="mt-6 bg-sky-50 rounded-lg p-4 text-center">
                  <span className="text-sky-700 font-semibold">
                    +{testimonial.improvement} Match Score Improvement
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ocean-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Start your journey to career success today with our AI-powered resume analyzer.
          </p>
          
          <a href="/analyze" className="btn-secondary bg-white text-ocean-500 hover:bg-neutral-50">
            Analyze Your Resume Free
          </a>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
