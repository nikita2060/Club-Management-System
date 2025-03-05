export default function Home() {
  const popularClubs = [
    { name: 'Enigma', image: '/Images/Enigma Logo (NO BG).png' },
    { name: 'Cultural', image: '/Images/Cultural.png' },
    { name: 'Neuron', image: '/Images/Neuron.png' },
    { name: 'Cypher', image: '/Images/Cypher.png' },
  ];

  const followingClubs = [
    { name: 'Turing Club', image: '/Images/Turing.png' },
    { name: 'FOSS', image: '/Images/Foss.png' },
    { name: 'Cloud Computing', image: '/Images/Cloud.png' },
    { name: 'Zigbee', image: '/Images/Zigbee.png' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">Welcome User</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Registered Event */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Registered Event</h2>
          <div className="bg-white rounded-lg p-8 text-center shadow-sm">
            <p className="text-gray-500">You Haven't Registered Yet</p>
          </div>
        </div>

        {/* Popular Clubs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Popular Clubs</h2>
          <div className="grid grid-cols-2 gap-4">
            {popularClubs.map((club) => (
              <div key={club.name} className="bg-white rounded-lg p-4 text-center shadow-sm">
                <img
                  src={club.image}
                  alt={club.name}
                  className="w-16 h-16 rounded-full mx-auto mb-2"
                />
                <h3 className="font-medium">{club.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Gallery</h2>
          <div className="bg-white rounded-lg p-8 text-center shadow-sm h-[300px] flex items-center justify-center">
            <div className="text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>No Media To Show</p>
            </div>
          </div>
        </div>
      </div>

      {/* Following Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Following</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {followingClubs.map((club) => (
            <div key={club.name} className="bg-white rounded-lg p-6 text-center shadow-sm">
              <img
                src={club.image}
                alt={club.name}
                className="w-20 h-20 rounded-full mx-auto mb-3"
              />
              <h3 className="font-medium">{club.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* About Us Button */}
      <div className="mt-12 text-center">
        <button className="bg-[#1e293b] text-white px-6 py-2 rounded-md">
          About Us
        </button>
      </div>
    </div>
  );
}