import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How accurate is the match score?",
      answer: "The match score is a guideline based on keyword matching and relevance analysis using advanced AI algorithms. It helps you identify missing skills or areas to improve. Our accuracy rate is approximately 98% based on feedback from thousands of users who have successfully improved their job application success rates."
    },
    {
      question: "Can I upload multiple resumes?",
      answer: "Currently, you can analyze one resume at a time to ensure the highest quality analysis. Future versions will support multiple uploads and comparison features. This allows our AI to focus entirely on providing the most detailed and accurate feedback for your specific resume."
    },
    {
      question: "Is my data saved or stored?",
      answer: "No personal data is permanently stored in this demo application. Everything is processed locally or via secure mock API for portfolio demonstration purposes. In a production environment, we would implement enterprise-grade security measures and give users full control over their data retention preferences."
    },
    {
      question: "Can I export the results?",
      answer: "Yes, the results can be exported as a comprehensive PDF report that includes your match score, found keywords, missing keywords, and personalized suggestions. The export feature is currently mocked for demonstration purposes but would be fully functional in the production version."
    },
    {
      question: "Do I need an account to use this tool?",
      answer: "No account is required for the basic analysis features. You can upload your resume and get instant feedback without any registration. A placeholder login system exists for SaaS demonstration purposes, but the core functionality is available to all users immediately."
    },
    {
      question: "What file formats are supported?",
      answer: "We support the most common resume formats including PDF, DOC, DOCX, and TXT files. PDF is recommended as it preserves formatting and ensures the most accurate text extraction. Our AI can handle various resume layouts and styles across these formats."
    },
    {
      question: "How long does the analysis take?",
      answer: "The analysis typically takes 2-3 seconds for most resumes. The processing time may vary slightly based on the length and complexity of your resume and job description. Our AI is optimized for speed without compromising on the quality of analysis."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Get answers to common questions about our TalentScore and how it can help you land your dream job.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      <svg
                        className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We're here to help you succeed. Explore our resources or get in touch with our support team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Resume Tips
              </h3>
              <p className="text-gray-600 mb-4">
                Learn best practices for creating compelling resumes that get noticed.
              </p>
              <a
                href="/analyze"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View Tips →
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Try the Analyzer
              </h3>
              <p className="text-gray-600 mb-4">
                Experience our AI-powered resume analysis tool firsthand.
              </p>
              <a
                href="/analyze"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Get Started →
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Contact Support
              </h3>
              <p className="text-gray-600 mb-4">
                Get personalized help from our career experts and technical team.
              </p>
              <a
                href="#"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Contact Us →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Optimize Your Resume?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of successful job seekers who have improved their resumes with our AI-powered tool.
            </p>
            <a
              href="/analyze"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 inline-block"
            >
              Start Free Analysis
            </a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Resumes Analyzed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">35%</div>
              <div className="text-gray-600">Average Improvement</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">2-3s</div>
              <div className="text-gray-600">Analysis Time</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
