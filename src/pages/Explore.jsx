import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Explore() {
  const popularClubs = [
    { name: 'Enigma', image: '/Images/Enigma Logo (NO BG).png' },
    { name: 'Cultural', image: '/Images/Cultural.png' },
    { name: 'Neuron', image: '/Images/Neuron.png' },
    { name: 'Cypher', image: '/Images/Cypher.png' },
  ];

  const organizationClubs = [
    { name: 'Turing Club', image: '/Images/Turing.png' },
    { name: 'FOSS', image: '/Images/Foss.png' },
    { name: 'Cloud Computing', image: '/Images/Cloud.png' },
    { name: 'Zigbee', image: '/Images/Zigbee.png' },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Navigation */}

      {/* Search Section */}
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

      {/* Upcoming Events */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        <div className="bg-white rounded-lg p-8 text-center text-gray-500">
          No Upcoming Events
        </div>
      </section>

      {/* Popular Clubs */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Popular Clubs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularClubs.map((club) => (
            <div key={club.name} className="bg-white rounded-lg p-4 text-center">
              <img
                src={club.image}
                alt={club.name}
                className="w-16 h-16 rounded-full mx-auto mb-2"
              />
              <h3 className="font-medium">{club.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Ongoing Events */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Ongoing Events</h2>
        <div className="bg-white rounded-lg p-8 text-center text-gray-500">
          No Ongoing Events
        </div>
      </section>

      {/* In Your Organization */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">In Your Organization</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {organizationClubs.map((club) => (
            <div key={club.name} className="bg-white rounded-lg p-4 text-center">
              <img
                src={club.image}
                alt={club.name}
                className="w-16 h-16 rounded-full mx-auto mb-2"
              />
              <h3 className="font-medium">{club.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}