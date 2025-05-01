import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiCalendar, FiExternalLink } from 'react-icons/fi';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // 🔹 Popular Clubs List
  const popularClubs = [
    { name: "Enigma", image: "/Images/Enigma Logo (NO BG).png", link: "https://enigma-club.vercel.app/?fbclid=PAZXh0bgNhZW0CMTEAAae6qXXF3I0ve_KuERfh8WPrpVBOAIFMtT9nLJ5ippGh6kI25NaO826AcYGxWA_aem_jeFxpIhteXuLRKwVP0XvxQ" },
    { name: "Tech Council", image: "/Images/Tech Council.png", link: "https://linktr.ee/TechCouncilSCSE?fbclid=PAZXh0bgNhZW0CMTEAAaetXUSD2sV_-FRZYxU1Rm0fKWjBY-_tPP8cOtg-YWb_P5NqDbjjFrQGbN4H7A_aem_UEAyUIQE9nLKvqWn5_YBFg" },
    { name: "Neuron", image: "/Images/Neuron.png", link: "https://www.instagram.com/neuron.ai_club/" },
    { name: "Cypher", image: "/Images/Cypher.png", link: "https://www.instagram.com/cypher_shield/" },
  ];

  // 🔹 Gallery Images List (Slideshow)
  const galleryImages = [
    "/Images/gallery1.jpeg",
    "/Images/gallery2.jpeg",
    "/Images/gallery3.jpeg",
    "/Images/gallery5.jpeg",
    "/Images/gallery6.jpeg",
    "/Images/gallery7.jpeg",
    "/Images/gallery8.jpeg",
    "/Images/gallery9.jpeg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 🔹 Auto-Slideshow (Changes Image Every 3 Seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Navigation handlers
  const handleExploreClubs = () => {
    navigate('/explore?tab=clubs');
  };

  const handleViewEvents = () => {
    navigate('/explore?tab=events');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
        <div className="md:w-1/2 space-y-6 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 leading-tight">
            Connect with <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">Clubs</span> and <span className="bg-gradient-to-r from-secondary-500 to-primary-500 text-transparent bg-clip-text">Events</span> on Campus
          </h1>
          <p className="text-lg text-neutral-600">
            Discover, join, and participate in various clubs and events happening around your campus.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleExploreClubs}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg shadow-md hover:shadow-lg hover:shadow-primary-300/30 hover:-translate-y-1 transition-all duration-300">
              Explore Clubs
            </button>
            <button 
              onClick={handleViewEvents}
              className="px-6 py-3 bg-white text-primary-600 border border-primary-200 rounded-lg shadow-sm hover:shadow-md hover:border-primary-300 hover:-translate-y-1 transition-all duration-300">
              View Events
            </button>
          </div>
        </div>
        <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-xl animate-slideIn">
          <img src="/Images/homepage_img.webp" alt="ClubNect" className="w-full h-auto object-cover" />
        </div>
      </div>

      {/* Grid Layout for Events, Clubs, and Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Upcoming/Ongoing Events */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Upcoming Event / Ongoing Events</h2>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <img 
              src="/Images/inceptrix.jpeg" 
              alt="Inceptrix Hackathon" 
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold">Inceptrix Hackathon</h3>
            <p className="text-gray-500">May 8-9, 2025</p>
            <p className="mt-2 text-gray-700">An exciting two-day hackathon focused on real-world problem solving.</p>
            <a href="https://inceptrix2025.xyz/" target="_blank" rel="noopener noreferrer" className="inline-block">
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Register Now
              </button>
            </a>
          </div>
        </div>

        {/* Popular Clubs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Popular Clubs</h2>
          <div className="grid grid-cols-2 gap-4">
            {popularClubs.map((club) => (
              <div key={club.name} className="bg-white rounded-lg p-4 text-center shadow-sm">
                <a href={club.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={club.image}
                    alt={club.name}
                    className="w-16 h-16 rounded-full mx-auto mb-2 hover:opacity-80 transition-opacity"
                  />
                </a>
                <h3 className="font-medium">{club.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery (Auto-Slideshow) */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Gallery</h2>
          <div className="bg-white rounded-lg shadow-sm h-[300px] relative overflow-hidden">
            <div className="gallery-container h-full">
              <img
                key={currentImageIndex}
                src={galleryImages[currentImageIndex]}
                alt={`Gallery Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                style={{ animation: 'slideAndFade 3s ease-in-out' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-neutral-800 mb-10">What Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 - Puskar Rai */}
          <div className="bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/10 p-6 rounded-2xl shadow-md">
            <p className="text-neutral-700 mb-4">
              "As the President of Enigma, I've seen how ClubNect has revolutionized club management and engagement. It's an essential platform for campus connectivity."
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#6366F1]/20 flex items-center justify-center text-[#6366F1] font-bold">
                PR
              </div>
              <div>
                <h4 className="font-semibold text-neutral-800">Puskar Rai</h4>
                <p className="text-sm text-neutral-600">President, Enigma</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 2 - Nikita Pandey */}
          <div className="bg-gradient-to-br from-[#8B5CF6]/10 to-[#A78BFA]/10 p-6 rounded-2xl shadow-md">
            <p className="text-neutral-700 mb-4">
              "ClubNect has helped me stay up to date with all club activities on campus. As a third-year student, it's become an essential tool for my campus involvement."
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] font-bold">
                NP
              </div>
              <div>
                <h4 className="font-semibold text-neutral-800">Nikita Pandey</h4>
                <p className="text-sm text-neutral-600">CSE, Third Year</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 3 - First Year Student */}
          <div className="bg-gradient-to-br from-[#A78BFA]/10 to-[#C4B5FD]/10 p-6 rounded-2xl shadow-md">
            <p className="text-neutral-700 mb-4">
              "As a first-year student, ClubNect has been invaluable in helping me explore different clubs and find my community on campus. It made my transition to college life much smoother!"
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#A78BFA]/20 flex items-center justify-center text-[#A78BFA] font-bold">
                AS
              </div>
              <div>
                <h4 className="font-semibold text-neutral-800">Aanya Sharma</h4>
                <p className="text-sm text-neutral-600">First Year Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-neutral-800 mb-4">Ready to Connect?</h2>
        <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
          Join ClubNect today and discover the vibrant community of clubs and events on your campus.
        </p>
        <button 
          onClick={() => navigate('/login')}
          className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg shadow-lg hover:shadow-xl hover:shadow-primary-300/30 hover:-translate-y-1 transition-all duration-300 text-lg font-medium">
          Get Started Now
        </button>
      </div>
    </div>
  );
}