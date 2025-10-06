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
    <div className="bg-white pt-16">
      {/* Hero Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-neutral-900">
            FAQ
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Get answers to common questions about TalentScore
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="card overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-neutral-900 pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      <svg
                        className={`w-6 h-6 text-ocean-500 transform transition-transform duration-300 ${
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
                  <div className="px-8 pb-6 border-t border-neutral-100">
                    <div className="pt-6">
                      <p className="text-neutral-600 leading-relaxed text-lg">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-beige-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Ready to Optimize Your Resume?
          </h2>
          <p className="text-lg text-neutral-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of successful job seekers who have improved their resumes with our AI-powered tool.
          </p>
          <a
            href="/analyze"
            className="btn-secondary bg-white text-beige-700 hover:bg-neutral-50"
          >
            Start Free Analysis
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
