import { FiSearch } from 'react-icons/fi';

export default function Explore() {
  // 🔹 List of Popular Clubs
  const popularClubs = [
    { name: 'Enigma', image: '/Images/Enigma Logo (NO BG).png' },
    { name: 'Cultural', image: '/Images/Cultural.png' },
    { name: 'Neuron', image: '/Images/Neuron.png' },
    { name: 'Cypher', image: '/Images/Cypher.png' },
  ];

  // 🔹 List of Organization Clubs
  const organizationClubs = [
    { name: 'Turing Club', image: '/Images/Turing.png' },
    { name: 'FOSS', image: '/Images/Foss.png' },
    { name: 'Cloud Computing', image: '/Images/Cloud.png' },
    { name: 'Zigbee', image: '/Images/Zigbee.png' },
  ];

  // 🔹 List of Upcoming Events (Including Infinity Event & Technical Hackathon)
  const upcomingEvents = [
    { 
      name: 'Infinity Event', 
      date: 'March 20, 2025', 
      description: 'A grand celebration of innovation and creativity.', 
      image: '/Images/infinity.jpeg' 
    },
    { 
      name: 'Technical Hackathon', 
      date: 'April 5, 2025', 
      description: 'A 24-hour coding challenge for tech enthusiasts.', 
      image: '/Images/hackathon.jpeg' 
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
            <div key={club.name} className="bg-white rounded-lg p-4 text-center">
              <img src={club.image} alt={club.name} className="w-24 h-24 rounded-full mx-auto mb-2 object-cover" />
              <h3 className="font-medium">{club.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Ongoing Events Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Ongoing Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <img src="/Images/ctf-event.png" alt="Capture the Flag" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-bold">Capture the Flag</h3>
            <p className="text-gray-500">Ongoing in Seminar Hall from 9:00 am to 3:00 pm, SET, Kanakpura</p>
            <p className="mt-2 text-gray-700">Organized by Cloud Club of Jain University</p>
          </div>
        </div>
      </section>

      {/* 🔹 In Your Organization Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">In Your Organization</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {organizationClubs.map((club) => (
            <div key={club.name} className="bg-white rounded-lg p-4 text-center">
              <img src={club.image} alt={club.name} className="w-16 h-16 rounded-full mx-auto mb-2" />
              <h3 className="font-medium">{club.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
