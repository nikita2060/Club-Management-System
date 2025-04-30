import { useState, useEffect } from "react";

export default function Home() {
  // 🔹 Popular Clubs List
  const popularClubs = [
    { name: "Enigma", image: "/Images/Enigma Logo (NO BG).png", link: "https://enigma-club.vercel.app/?fbclid=PAZXh0bgNhZW0CMTEAAae6qXXF3I0ve_KuERfh8WPrpVBOAIFMtT9nLJ5ippGh6kI25NaO826AcYGxWA_aem_jeFxpIhteXuLRKwVP0XvxQ" },
    { name: "Tech Council", image: "/Images/Tech Council.png", link: "https://linktr.ee/TechCouncilSCSE?fbclid=PAZXh0bgNhZW0CMTEAAaetXUSD2sV_-FRZYxU1Rm0fKWjBY-_tPP8cOtg-YWb_P5NqDbjjFrQGbN4H7A_aem_UEAyUIQE9nLKvqWn5_YBFg" },
    { name: "Neuron", image: "/Images/Neuron.png", link: "https://www.instagram.com/neuron.ai_club/" },
    { name: "Cypher", image: "/Images/Cypher.png", link: "https://www.instagram.com/cypher_shield/" },
  ];

  // 🔹 Following Clubs List
  const followingClubs = [
    { name: "Turing Club", image: "/Images/Turing.png", link: "https://www.instagram.com/turingclubfetju/" },
    { name: "FOSS", image: "/Images/Foss.png", link: "https://www.instagram.com/fossclub_set/" },
    { name: "The Cloud Club", image: "/Images/Cloud.png", link: "https://www.instagram.com/thecloudclub__/" },
    { name: "Zigbee", image: "/Images/Zigbee.png", link: "https://www.instagram.com/zigbee_ju/" },
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

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">Welcome User</h1>

      {/* 🔹 Main Section with 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Registered Event */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Upcoming Event / Ongoing Events</h2>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <img 
              src="/Images/inceptrix.jpeg" 
              alt="Inceptrix Hackathon" 
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold">Inceptrix Hackathon</h3>
            <p className="text-gray-500">8 and 9 May, 2025</p>
            <p className="mt-2 text-gray-700">An exciting two-day hackathon focused on real-world problem solving.</p>
            <a href="https://inceptrix2025.xyz/" className="inline-block">
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

        {/* 🔹 Gallery (Auto-Slideshow) */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Gallery</h2>
          <div className="bg-white rounded-lg shadow-sm h-[300px] flex items-center justify-center overflow-hidden">
            <img
              src={galleryImages[currentImageIndex]}
              alt="Gallery Image"
              className="w-full h-full object-cover rounded-lg transition-opacity duration-500"
            />
          </div>
        </div>
      </div>

      {/* 🔹 Following Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Following</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {followingClubs.map((club) => (
            <div key={club.name} className="bg-white rounded-lg p-6 text-center shadow-sm">
              <a href={club.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={club.image}
                  alt={club.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 hover:opacity-80 transition-opacity"
                />
              </a>
              <h3 className="font-medium">{club.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 About Us Button */}
      <div className="mt-12 text-center">
        <button className="bg-[#1e293b] text-white px-6 py-2 rounded-md">
          About Us
        </button>
      </div>
    </div>
  );
}