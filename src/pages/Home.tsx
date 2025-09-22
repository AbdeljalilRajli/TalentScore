import React from 'react';

const Home: React.FC = () => {
  const features = [
    {
      icon: "📊",
      title: "Resume Analysis",
      description: "Get detailed analysis of your resume with AI-powered insights and recommendations."
    },
    {
      icon: "🎯",
      title: "Match Score",
      description: "See how well your resume matches job descriptions with our scoring algorithm."
    },
    {
      icon: "💡",
      title: "Smart Suggestions",
      description: "Receive personalized suggestions to improve your resume and increase your chances."
    },
    {
      icon: "📈",
      title: "Visual Charts",
      description: "Understand your resume performance through interactive charts and visualizations."
    }
  ];

  const testimonials = [
    {
      name: "Alice Johnson",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "This tool helped me optimize my resume in minutes. The AI suggestions were spot-on!"
    },
    {
      name: "Mark Thompson",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "I finally understood which skills I was missing. Amazing tool!"
    },
    {
      name: "Sophia Lee",
      photo: "https://randomuser.me/api/portraits/women/68.jpg",
      quote: "Clean design and really easy to use. Definitely portfolio-worthy."
    }
  ];

  const faqs = [
    {
      question: "How accurate is the match score?",
      answer: "The match score is a guideline based on keyword matching and relevance. It helps you identify missing skills or areas to improve."
    },
    {
      question: "Can I upload multiple resumes?",
      answer: "Currently, you can analyze one resume at a time. Future versions will support multiple uploads and comparison."
    },
    {
      question: "Is my data saved?",
      answer: "No personal data is stored in this demo app. Everything is processed locally or via mock API for portfolio purposes."
    },
    {
      question: "Can I export the results?",
      answer: "Yes, the results can be exported as a PDF report (mocked for now)."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">TalentScore</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Optimize your resume with AI-powered analysis. Get instant feedback, match scores, 
              and personalized suggestions to land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create a winning resume that stands out to employers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-200">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of job seekers who have improved their resumes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {"★".repeat(5)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about our TalentScore
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <summary className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                  {faq.question}
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About TalentScore
          </h2>
          <p className="text-xl mb-8 leading-relaxed">
            Our mission is to help job seekers create compelling resumes that get noticed. 
            Using advanced AI technology, we analyze your resume against job descriptions 
            and provide actionable insights to improve your chances of landing interviews.
          </p>
          <p className="text-lg mb-8 opacity-90">
            Whether you're a recent graduate or an experienced professional, our tool 
            adapts to your needs and helps you present your best self to potential employers.
          </p>
          <a
            href="/about"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 inline-block"
          >
            Learn More About Us
          </a>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Optimize Your Resume?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of successful job seekers who have improved their resumes with our AI-powered tool.
          </p>
          <a
            href="/analyze"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 inline-block"
          >
            Start Analyzing Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
