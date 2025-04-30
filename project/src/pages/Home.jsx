import { useState, useEffect } from "react";

export default function Home() {
  // 🔹 Popular Clubs List
  const popularClubs = [
    { name: "Enigma", image: "/Images/Enigma Logo (NO BG).png" },
    { name: "Cultural", image: "/Images/Cultural.png" },
    { name: "Neuron", image: "/Images/Neuron.png" },
    { name: "Cypher", image: "/Images/Cypher.png" },
  ];

  // 🔹 Following Clubs List
  const followingClubs = [
    { name: "Turing Club", image: "/Images/Turing.png" },
    { name: "FOSS", image: "/Images/Foss.png" },
    { name: "Cloud Computing", image: "/Images/Cloud.png" },
    { name: "Zigbee", image: "/Images/Zigbee.png" },
  ];

  // 🔹 Gallery Images List (Slideshow)
  const galleryImages = [
    "/Images/gallery_music.jpeg",
    "/Images/gallery_nsb.jpeg",
    "/Images/gallery3.jpeg",
    "/Images/gallery4.jpeg",
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

      {/* 🔹 About Us Button */}
      <div className="mt-12 text-center">
        <button className="bg-[#1e293b] text-white px-6 py-2 rounded-md">
          About Us
        </button>
      </div>
    </div>
  );
}
