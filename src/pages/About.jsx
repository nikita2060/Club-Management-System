import React, { useState } from 'react';
import { FiUsers, FiCalendar, FiAward, FiMessageCircle, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';

export default function About() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, you would send this data to your backend
    console.log('Form submitted:', contactForm);
    
    // Simulate successful submission
    setFormStatus({
      submitted: true,
      error: false,
      message: 'Thank you for your message! We will get back to you soon.'
    });
    
    // Reset form
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset status after 5 seconds
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        error: false,
        message: ''
      });
    }, 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">
          About <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">ClubNect</span>
        </h1>
        <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
          Connecting students with clubs and events to create a vibrant campus community.
        </p>
      </div>

      {/* Mission & Vision Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-8 border border-neutral-100">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-white mb-6">
            <FiAward className="text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Our Mission</h2>
          <p className="text-neutral-600">
            To empower students by creating a centralized platform that bridges the gap between clubs, events, and the student community. We aim to enhance campus life by making it easier for students to discover, join, and participate in activities that align with their interests and passions.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-8 border border-neutral-100">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center text-white mb-6">
            <FiMessageCircle className="text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Our Vision</h2>
          <p className="text-neutral-600">
            To create a thriving ecosystem where every student can easily find their community, develop new skills, and make the most of their university experience. We envision a campus where no opportunity goes unnoticed and no student feels disconnected from the vibrant life of the university.
          </p>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-neutral-800 mb-10">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Club Discovery */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-100">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center text-white mb-4">
              <FiUsers className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-neutral-800 mb-2">Club Discovery</h3>
            <p className="text-neutral-600">
              Explore a diverse range of clubs and organizations on campus. Find communities that match your interests, from tech and arts to sports and academics.
            </p>
          </div>

          {/* Event Tracking */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-100">
            <div className="w-14 h-14 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full flex items-center justify-center text-white mb-4">
              <FiCalendar className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-neutral-800 mb-2">Event Tracking</h3>
            <p className="text-neutral-600">
              Never miss an important event again. Our platform keeps you updated on all upcoming workshops, competitions, seminars, and social gatherings.
            </p>
          </div>

          {/* Community Building */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-100">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center text-white mb-4">
              <FiMessageCircle className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-neutral-800 mb-2">Community Building</h3>
            <p className="text-neutral-600">
              Connect with like-minded peers, build meaningful relationships, and create a network that extends beyond your academic journey.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="mb-16">
        <div className="bg-white rounded-2xl shadow-md p-8 border border-neutral-100">
          <h2 className="text-3xl font-bold text-neutral-800 mb-6">Our Story</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <p className="text-neutral-600 mb-4">
                ClubNect was born from a simple observation: despite the wealth of clubs and events on campus, many students struggled to find activities that matched their interests or even know what was happening around them.
              </p>
              <p className="text-neutral-600 mb-4">
                Founded by a group of passionate students from Jain University, we set out to solve this problem by creating a centralized platform that would make campus life more accessible and engaging for everyone.
              </p>
              <p className="text-neutral-600">
                What started as a small project has grown into a comprehensive platform that serves the entire university community, helping students make the most of their college experience by connecting them with opportunities for growth, learning, and fun.
              </p>
            </div>
            <div className="md:w-1/2 rounded-xl overflow-hidden">
              <img 
                src="/Images/our_story_img.webp" 
                alt="ClubNect Story" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Team Member 1 */}
          <div className="bg-white rounded-lg p-6 shadow-sm text-center transform transition-transform duration-300 hover:scale-105">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
              <img 
                src="/Images/Pushkar.jpeg" 
                alt="Team Member 1"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Pushkar Rai</h3>
            <p className="text-gray-600 mb-2">22btrcn216@jainuniversity.ac.in</p>
            <a
              href="https://www.linkedin.com/in/pushkar-rai-347130354"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white rounded-lg p-6 shadow-sm text-center transform transition-transform duration-300 hover:scale-105">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
              <img 
                src="/Images/Abishek.jpeg" 
                alt="Team Member 2"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Abhishek Jha</h3>
            <p className="text-gray-600 mb-2">22btrcn011@jainuniversity.ac.in</p>
            <a
              href="https://www.linkedin.com/in/theabhishekkjha/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white rounded-lg p-6 shadow-sm text-center transform transition-transform duration-300 hover:scale-105">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
              <img 
                src="/Images/Kashish.jpeg" 
                alt="Team Member 3"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Kashish Shah</h3>
            <p className="text-gray-600 mb-2">22btrcn137@jainuniversity.ac.in</p>
            <a
              href="https://www.linkedin.com/in/kashish-shah-b50421256/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>

          {/* Team Member 4 */}
          <div className="bg-white rounded-lg p-6 shadow-sm text-center transform transition-transform duration-300 hover:scale-105">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
              <img 
                src="/Images/Nikita.jpeg" 
                alt="Team Member 4"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Nikita Pandey</h3>
            <p className="text-gray-600 mb-2">22btrcn190@jainuniversity.ac.in</p>
            <a
              href="https://www.linkedin.com/in/nikitapandey-tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-gray-600">
          Have questions or suggestions? We'd love to hear from you! Reach out to us at:
        </p>
        <div className="mt-4 space-y-2">
          <p className="text-gray-600">📧 Email: 22btrcn216@jainuniversity.ac.in</p>
          <p className="text-gray-600">📱 Phone: (+91) 9696724664</p>
          <p className="text-gray-600">📍 Location: Jain (Deemed-to-be-University), Faculty of Engineering and Technology (FET)</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 mb-8">
        <h2 className="text-3xl font-bold text-center text-neutral-800 mb-10">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-100">
            <h3 className="text-xl font-bold text-neutral-800 mb-3">How do I join a club?</h3>
            <p className="text-neutral-600">
              Simply browse our clubs section, find a club that interests you, and click the "Join" button. You'll be directed to the club's official page or contact information to complete the joining process.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-100">
            <h3 className="text-xl font-bold text-neutral-800 mb-3">Can I register my club on ClubNect?</h3>
            <p className="text-neutral-600">
              Absolutely! We welcome all university clubs and organizations. Register through our platform by creating an account and following the club registration process.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-100">
            <h3 className="text-xl font-bold text-neutral-800 mb-3">How do I post an event?</h3>
            <p className="text-neutral-600">
              Club administrators can post events through their dashboard. Simply log in, navigate to the events section, and fill out the event details form.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-100">
            <h3 className="text-xl font-bold text-neutral-800 mb-3">Is ClubNect only for Jain University?</h3>
            <p className="text-neutral-600">
              Currently, we're focused on serving Jain University students, but we have plans to expand to other universities in the future. Stay tuned for updates!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}