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

  const stats = [
    { number: "10,000+", label: "Happy Users" },
    { number: "35%", label: "Avg. Score Improvement" },
    { number: "98%", label: "User Satisfaction" },
    { number: "24/7", label: "Available Support" }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Success Stories
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Discover how job seekers like you have transformed their careers with our AI Resume Analyzer.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real feedback from real people who have successfully improved their resumes and career prospects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    <p className="text-gray-500 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex text-yellow-400 mb-4">
                  {"★".repeat(5)}
                </div>
                
                <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <span className="text-green-800 font-semibold">
                    +{testimonial.improvement} Match Score Improvement
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Success Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Featured Success Story</h2>
              <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/women/25.jpg"
                  alt="Sarah Martinez"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Sarah Martinez</h3>
              <p className="opacity-90">Senior Frontend Developer at Google</p>
            </div>
            
            <blockquote className="text-lg italic text-center mb-8 leading-relaxed">
              "I was struggling to get interviews despite having 5 years of experience. 
              After using the AI Resume Analyzer, I realized I was missing key technologies 
              in my resume. Within two weeks of updating it based on the suggestions, 
              I had interviews with three major tech companies and landed my dream job at Google!"
            </blockquote>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl font-bold">67%</div>
                <div className="text-sm opacity-90">Match Score Improvement</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm opacity-90">Interview Calls</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl font-bold">2 weeks</div>
                <div className="text-sm opacity-90">To Land Dream Job</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Breakdown */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Success Across Industries
            </h2>
            <p className="text-xl text-gray-600">
              Our AI Resume Analyzer helps professionals in every field
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="font-semibold text-gray-900 mb-2">Technology</h3>
              <p className="text-gray-600 text-sm">Software Engineers, Data Scientists, DevOps</p>
              <div className="mt-3 text-blue-600 font-semibold">2,500+ users</div>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-semibold text-gray-900 mb-2">Business</h3>
              <p className="text-gray-600 text-sm">Product Managers, Analysts, Consultants</p>
              <div className="mt-3 text-purple-600 font-semibold">1,800+ users</div>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-semibold text-gray-900 mb-2">Design</h3>
              <p className="text-gray-600 text-sm">UX/UI Designers, Creative Directors</p>
              <div className="mt-3 text-green-600 font-semibold">1,200+ users</div>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="font-semibold text-gray-900 mb-2">Marketing</h3>
              <p className="text-gray-600 text-sm">Digital Marketers, Content Creators</p>
              <div className="mt-3 text-red-600 font-semibold">900+ users</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Don't let a poorly optimized resume hold you back from your dream job. 
            Start your journey to career success today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="/analyze"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Analyze Your Resume
            </a>
            <a
              href="/about"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
            >
              Learn More
            </a>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-600 text-sm">
              ⭐ Trusted by 10,000+ professionals worldwide • 98% satisfaction rate • Free to use
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
