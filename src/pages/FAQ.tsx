import React, { useState } from 'react';
import { AnimatedSection } from '../components/modern/AnimatedSection';

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
    <div className="bg-gradient-to-br from-white via-[#DDF4E7]/20 to-white pt-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#DDF4E7] to-[#67C090] rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-1/4 -right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-[#26667F] to-[#124170] rounded-full blur-3xl opacity-15" />
        </div>

        <AnimatedSection className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#DDF4E7] to-[#67C090]/30 border border-[#67C090]/20 mb-6">
            <span className="w-2 h-2 bg-[#67C090] rounded-full mr-2 animate-pulse" />
            <span className="text-xs font-semibold text-[#26667F]">Help & Support</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#124170] to-[#26667F] bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h1>
          
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Everything you need to know about TalentScore
          </p>

          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop"
            alt="FAQ"
            className="rounded-3xl shadow-2xl border-4 border-white mx-auto max-w-4xl"
          />
        </AnimatedSection>
      </section>

      {/* FAQ Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} delay={index * 50}>
                <div className="bg-gradient-to-br from-white to-[#DDF4E7]/20 rounded-2xl p-6 border border-neutral-200 hover:border-[#67C090] transition-all hover:shadow-xl h-full">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left"
                  >
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#124170] to-[#26667F] text-white flex items-center justify-center font-bold flex-shrink-0">
                        Q
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900 flex-1">
                        {faq.question}
                      </h3>
                      <svg
                        className={`w-6 h-6 text-[#26667F] transform transition-transform duration-300 flex-shrink-0 ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {openIndex === index && (
                    <div className="pl-14 pr-10 animate-in">
                      <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#124170] via-[#26667F] to-[#67C090]" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Try our AI-powered tool for free or reach out to our support team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/analyze" className="px-10 py-5 bg-white text-[#26667F] rounded-2xl font-bold text-lg hover:bg-[#DDF4E7] transition-all duration-300 hover:scale-105 shadow-2xl">
                Start Free Analysis
              </a>
              <a href="/about" className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default FAQ;
