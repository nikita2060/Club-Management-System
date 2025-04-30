import { FiSearch } from 'react-icons/fi';

export default function Explore() {
  // 🔹 List of Popular Clubs
  const popularClubs = [
    { name: 'Enigma', image: '/Images/Enigma Logo (NO BG).png', link: "https://enigma-club.vercel.app/?fbclid=PAZXh0bgNhZW0CMTEAAae6qXXF3I0ve_KuERfh8WPrpVBOAIFMtT9nLJ5ippGh6kI25NaO826AcYGxWA_aem_jeFxpIhteXuLRKwVP0XvxQ" },
    { name: 'Tech Council', image: '/Images/Tech Council.png',link: "https://linktr.ee/TechCouncilSCSE?fbclid=PAZXh0bgNhZW0CMTEAAaetXUSD2sV_-FRZYxU1Rm0fKWjBY-_tPP8cOtg-YWb_P5NqDbjjFrQGbN4H7A_aem_UEAyUIQE9nLKvqWn5_YBFg" },
    { name: 'Neuron', image: '/Images/Neuron.png',link: "https://www.instagram.com/neuron.ai_club/" },
    { name: 'Cypher', image: '/Images/Cypher.png',link: "https://www.instagram.com/cypher_shield/" },
  ];

  // 🔹 List of Organization Clubs
  const organizationClubs = [
    { name: 'Turing Club', image: '/Images/Turing.png',link: "https://www.instagram.com/turingclubfetju/" },
    { name: 'FOSS', image: '/Images/Foss.png',link: "https://www.instagram.com/fossclub_set/" },
    { name: 'The Cloud Club', image: '/Images/Cloud.png',link: "https://www.instagram.com/thecloudclub__/" },
    { name: 'Zigbee', image: '/Images/Zigbee.png',link: "https://www.instagram.com/zigbee_ju/" },
  ];

   // 🔹 Updated Upcoming Events (Inceptix Hackathon with updated date)
   const upcomingEvents = [
    { 
      name: 'Inceptrix Hackathon', 
      date: '8 and 9 May, 2025', 
      description: 'An exciting two-day hackathon focused on real-world problem solving.', 
      image: '/Images/inceptrix.jpeg' 
    }
  ];

  // 🔹 Past Events
  const pastEvents = [
    { 
      name: 'Infinity Event', 
      date: 'March 20, 2025', 
      description: 'A grand celebration of innovation and creativity.', 
      image: '/Images/infinity.jpeg' 
    },
    { 
      name: 'Race for Roles', 
      date: '15 April 2025', 
      description: 'A competitive event to prepare students for placement roles.', 
      image: '/Images/race-for-roles.jpeg' 
    },
    {
      name: 'Tag X 2025',
      date: '15 and 16 April 2025',
      description: 'A dynamic cultural and technical event filled with excitement and opportunities.',
      image: '/Images/tagx2025.jpeg'
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* 🔹 Search Section */}
      <div className="mb-12">
        <div className="max-w-2xl mx-auto relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search clubs, events, or organizations"
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* 🔹 Upcoming Events Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.name} className="bg-white rounded-lg p-6 shadow-md">
                <img src={event.image} alt={event.name} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-lg font-bold">{event.name}</h3>
                <p className="text-gray-500">{event.date}</p>
                <p className="mt-2 text-gray-700">{event.description}</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center text-gray-500">
            No Upcoming Events
          </div>
        )}
      </section>

      {/* 🔹 Popular Clubs Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Popular Clubs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
      </section>

      {/* 🔹 Past Events Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Past Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pastEvents.map((event) => (
            <div key={event.name} className="bg-white rounded-lg p-6 shadow-md">
              <img src={event.image} alt={event.name} className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-bold">{event.name}</h3>
              <p className="text-gray-500">{event.date}</p>
              <p className="mt-2 text-gray-700">{event.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 In Your Organization Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">In Your Organization</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {organizationClubs.map((club) => (
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
      </section>
    </main>
  );
}
