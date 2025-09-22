import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About TalentScore
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Empowering job seekers with AI-driven insights to create resumes that stand out 
            in today's competitive job market.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We believe that everyone deserves a fair chance at their dream job. Our AI-powered 
              resume analyzer levels the playing field by providing professional-grade resume 
              optimization tools that were once only available to those who could afford expensive 
              career coaching services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Precision</h3>
              <p className="text-gray-600">
                Our AI analyzes thousands of data points to provide accurate, actionable feedback
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Speed</h3>
              <p className="text-gray-600">
                Get comprehensive resume analysis in seconds, not days
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                Continuously improving our algorithms to deliver the best results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How AI Works Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How Our AI Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced artificial intelligence combines natural language processing, 
              machine learning, and industry expertise to provide comprehensive resume analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Document Processing
                    </h3>
                    <p className="text-gray-600">
                      Our AI extracts and structures information from your resume, 
                      understanding context and meaning beyond simple keyword matching.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Job Description Analysis
                    </h3>
                    <p className="text-gray-600">
                      We analyze the job description to identify key requirements, 
                      skills, and qualifications that employers are looking for.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Intelligent Matching
                    </h3>
                    <p className="text-gray-600">
                      Our algorithms compare your resume against job requirements, 
                      identifying strengths and areas for improvement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Actionable Insights
                    </h3>
                    <p className="text-gray-600">
                      Generate personalized recommendations and suggestions 
                      to optimize your resume for maximum impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-white">🤖</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Powered by Advanced AI
                </h3>
                <p className="text-gray-600 mb-6">
                  Our machine learning models are trained on thousands of successful 
                  resumes and job descriptions across various industries.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">98%</div>
                    <div className="text-sm text-gray-500">Accuracy Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">10k+</div>
                    <div className="text-sm text-gray-500">Resumes Analyzed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Built by Career Experts
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Our team combines expertise in artificial intelligence, human resources, 
            and career development to create tools that truly make a difference in 
            people's professional lives.
          </p>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Resume?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of job seekers who have successfully improved their 
              resumes and landed their dream jobs with our AI-powered tool.
            </p>
            <a
              href="/analyze"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 inline-block"
            >
              Start Your Analysis
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that speak to our commitment to helping job seekers succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Resumes Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">35%</div>
              <div className="text-gray-600">Average Score Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
              <div className="text-gray-600">Available Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
