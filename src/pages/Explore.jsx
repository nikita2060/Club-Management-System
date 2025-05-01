import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiStar, FiUsers, FiCalendar, FiExternalLink, FiInstagram, FiChevronDown } from 'react-icons/fi';

export default function Explore() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('clubs');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam && ['clubs', 'events', 'featured'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location]);

  const clubs = [
    { id: 1, name: "Enigma", image: "/Images/Enigma Logo (NO BG).png", category: "Tech", Institute: "Jain University", link: "https://enigma-club.vercel.app/" },
    { id: 2, name: "Tech Council", image: "/Images/Tech Council.png", category: "Tech", Institute: "Jain University", link: "https://linktr.ee/TechCouncilSCSE" },
    { id: 3, name: "Neuron", image: "/Images/Neuron.png", category: "Tech", Institute: "Jain University", link: "https://www.instagram.com/neuron.ai_club/" },
    { id: 4, name: "Cypher", image: "/Images/Cypher.png", category: "Tech", Institute: "Jain University", link: "https://www.instagram.com/cypher_shield/" },
    { id: 5, name: "Turing Club", image: "/Images/Turing.png", category: "Tech", Institute: "Jain University", link: "https://www.instagram.com/turingclubfetju/" },
    { id: 6, name: "FOSS", image: "/Images/Foss.png", category: "Tech", Institute: "Jain University", link: "https://www.instagram.com/fossclub_set/" },
    { id: 7, name: "The Cloud Club", image: "/Images/Cloud.png", category: "Tech", Institute: "Jain University", link: "https://www.instagram.com/thecloudclub__/" },
    { id: 8, name: "Zigbee", image: "/Images/Zigbee.png", category: "Tech", Institute: "Jain University", link: "https://www.instagram.com/zigbee_ju/" },
  ];

  const events = [
    {
      id: 1,
      name: "Inceptrix Hackathon",
      image: "/Images/inceptrix.jpeg",
      date: "May 8-9, 2025",
      category: "Hackathon",
      description: "A 48-hour hackathon focused on solving real-world problems with innovative technology solutions."
    },
    {
      id: 2,
      name: "AI Workshop",
      image: "/Images/gallery1.jpeg",
      date: "June 15, 2025",
      category: "Workshop",
      description: "Learn the fundamentals of artificial intelligence and machine learning in this hands-on workshop."
    },
    {
      id: 3,
      name: "Cloud Summit",
      image: "/Images/gallery2.jpeg",
      date: "July 22, 2025",
      category: "Conference",
      description: "Join industry experts to explore the latest trends and technologies in cloud computing."
    },
    {
      id: 4,
      name: "Cybersecurity CTF",
      image: "/Images/gallery3.jpeg",
      date: "August 5, 2025",
      category: "Competition",
      description: "Test your cybersecurity skills in this exciting Capture The Flag competition."
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['all', 'tech', 'cultural'];

  const filteredClubs = clubs.filter(club =>
    (selectedCategory === 'all' || club.category.toLowerCase() === selectedCategory) &&
    (club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Search and Filter */}
      <div className="mb-10">
        <div className="relative mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search clubs, events, or organizations..."
            className="flex-grow py-4 px-4 rounded-xl bg-white border border-neutral-200 text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-100 shadow-sm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="relative w-44">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full h-full px-6 rounded-xl bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all  shadow-sm flex items-center justify-between"
            >
              {selectedCategory === 'all' ? 'All Categories' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
              <FiChevronDown className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-neutral-200 py-2 z-50">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-neutral-50 transition-colors ${
                      selectedCategory === category ? 'text-primary-500 bg-primary-50' : 'text-neutral-700'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8">
          <button
            onClick={() => setActiveTab('clubs')}
            className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-sm ${activeTab === 'clubs' ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-lg shadow-primary-200/30' : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'}`}
          >
            <FiUsers className={activeTab === 'clubs' ? 'animate-pulse' : ''} />
            <span>Clubs</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-sm ${activeTab === 'events' ? 'bg-gradient-to-r from-secondary-400 to-secondary-500 text-white shadow-lg shadow-secondary-200/30' : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'}`}
          >
            <FiCalendar className={activeTab === 'events' ? 'animate-pulse' : ''} />
            <span>Events</span>
          </button>

          <button
            onClick={() => setActiveTab('featured')}
            className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-sm ${activeTab === 'featured' ? 'bg-gradient-to-r from-accent-400 to-accent-500 text-white shadow-lg shadow-accent-200/30' : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'}`}
          >
            <FiStar className={activeTab === 'featured' ? 'animate-pulse' : ''} />
            <span>Featured</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'clubs' && (
          <>
            {filteredClubs.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-neutral-600">No clubs found matching "{searchTerm}"</h3>
                <p className="text-neutral-500 mt-2">Try a different search term or browse all clubs</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredClubs.map(club => (
                  <div key={club.id} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer p-4 border border-neutral-200">
                    <div className="h-52 overflow-hidden relative rounded-lg mb-4">
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 to-transparent opacity-60 z-10"></div>
                      <img
                        src={club.image}
                        alt={club.name}
                        className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute bottom-0 left-0 w-full p-4 z-20">
                        <span className="inline-block px-3 py-1 bg-primary-500/90 text-white text-xs rounded-full mb-2 shadow-sm">
                          {club.category}
                        </span>
                        <h3 className="text-xl font-bold text-white">{club.name}</h3>
                      </div>
                    </div>
                    <div className="p-4 bg-neutral-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-600 flex items-center space-x-1">
                          <FiUsers className="text-primary-500 mr-2" />
                          <span>{club.Institute}</span>
                        </span>
                        <button
                          onClick={() => handleJoinClick(club.link)}
                          className="px-4 py-2 bg-white text-primary-500 rounded-lg border border-primary-200 hover:bg-primary-500 hover:text-white transition-all duration-300 flex items-center space-x-1 shadow-sm"
                        >
                          <span>Join</span>
                          {club.link.includes('instagram') ? <FiInstagram className="ml-1" /> : <FiExternalLink className="ml-1" />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'events' && (
          <>
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-neutral-600">No events found matching "{searchTerm}"</h3>
                <p className="text-neutral-500 mt-2">Try a different search term or browse all events</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredEvents.map(event => (
                  <div key={event.id} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-neutral-200">
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="md:w-2/5 h-60 md:h-auto overflow-hidden relative">
                        <img
                          src={event.image}
                          alt={event.name}
                          className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="inline-block px-3 py-1 bg-secondary-500/90 text-white text-xs rounded-full shadow-sm">
                            {event.category}
                          </span>
                        </div>
                      </div>
                      <div className="md:w-3/5 p-6 flex flex-col justify-between bg-white">
                        <div>
                          <h3 className="text-2xl font-bold text-neutral-800 mb-2">{event.name}</h3>
                          <p className="text-neutral-600 mb-4 flex items-center">
                            <FiCalendar className="text-secondary-500 mr-2" />
                            <span>{event.date}</span>
                          </p>
                          <p className="text-neutral-500 mb-6 line-clamp-3">{event.description}</p>
                        </div>
                        <button className="self-start px-5 py-2.5 bg-gradient-to-r from-primary-400 to-secondary-500 text-white rounded-lg hover:from-primary-500 hover:to-secondary-600 transition-all duration-300 transform group-hover:scale-105 shadow-md">
                          Register Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'featured' && (
          <div className="bg-white rounded-xl p-8 shadow-md border border-neutral-200">
            <h2 className="text-2xl font-bold text-neutral-800 mb-6">Featured Content</h2>
            <p className="text-neutral-600">Featured content will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
