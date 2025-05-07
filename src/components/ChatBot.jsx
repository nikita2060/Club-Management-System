// ChatBot.jsx
import { useState, useRef, useEffect } from "react";
import { FiMessageSquare, FiSend, FiX } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

const clubData = [
  { name: "Enigma", category: "Tech", institute: "Jain University", link: "https://enigma-club.vercel.app/" },
  { name: "Tech Council", category: "Tech", institute: "Jain University", link: "https://linktr.ee/TechCouncilSCSE" },
  { name: "Neuron", category: "Tech", institute: "Jain University", link: "https://www.instagram.com/neuron.ai_club/" },
  { name: "Cypher", category: "Tech", institute: "Jain University", link: "https://www.instagram.com/cypher_shield/" },
  { name: "Turing Club", category: "Tech", institute: "Jain University", link: "https://www.instagram.com/turingclubfetju/" },
  { name: "FOSS", category: "Tech", institute: "Jain University", link: "https://www.instagram.com/fossclub_set/" },
  { name: "The Cloud Club", category: "Tech", institute: "Jain University", link: "https://www.instagram.com/thecloudclub__/" },
  { name: "Zigbee", category: "Tech", institute: "Jain University", link: "https://www.instagram.com/zigbee_ju/" },
];

const eventData = [
  { name: "Inceptrix Hackathon", date: "May 8, 2025", category: "Hackathon", description: "A 48-hour hackathon focused on solving real-world problems.",link: "https://inceptrix2025.xyz/" },
  { name: "AI Workshop", date: "June 15, 2025", category: "Workshop", description: "Learn AI and ML in this hands-on workshop.", },
  { name: "Cloud Summit", date: "July 22, 2025", category: "Conference", description: "Explore cloud technologies with experts.", },
  { name: "Cybersecurity CTF", date: "August 5, 2025", category: "Competition", description: "Capture The Flag competition on cybersecurity.", },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi there! 👋 I'm ClubNect Assistant. Ask me anything about clubs, events, or how to use the website!",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChatbot = () => setIsOpen(!isOpen);
  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const userMessage = { text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    const botResponse = generateResponse(inputValue);
    setTimeout(() => setMessages((prev) => [...prev, botResponse]), 600);
    setInputValue("");
  };

  const generateResponse = (query) => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("club")) {
      const filtered = clubData.filter(
        (c) =>
          lowerQuery.includes("all") ||
          lowerQuery.includes(c.name.toLowerCase()) ||
          lowerQuery.includes(c.category.toLowerCase())
      );
      if (filtered.length === 0) return { text: "No matching clubs found.", sender: "bot" };

      const list = filtered.map((c, i) => 
        `${i + 1}\\. **${c.name}**\n   - Category: ${c.category}\n   - Institute: ${c.institute}\n   - **[Visit](${c.link})**`
      ).join("\n\n");
      return { text: `Here are the clubs I found:\n\n${list}`, sender: "bot" };
    }

    if (lowerQuery.includes("event")) {
      const isPastQuery = lowerQuery.includes("past");
      const isUpcomingQuery = lowerQuery.includes("upcoming") || lowerQuery.includes("next");
      
      const currentDate = new Date("2025-05-07");
      
      const filtered = eventData.filter((e) => {
        // Convert date strings to comparable dates
        const eventDateParts = e.date.split(", ");
        const eventMonth = new Date(Date.parse(eventDateParts[0] + " 1, " + eventDateParts[1])).getMonth();
        const eventYear = parseInt(eventDateParts[1]);
        const eventDay = parseInt(e.date.split(" ")[1]);
        
        const eventDate = new Date(eventYear, eventMonth, eventDay);
        
        if (isPastQuery) {
          return eventDate < currentDate;
        }
        if (isUpcomingQuery) {
          return eventDate >= currentDate;
        }
        
        // If no time filter, return all matching events
        return lowerQuery.includes("all") ||
          lowerQuery.includes(e.name.toLowerCase()) ||
          lowerQuery.includes(e.category.toLowerCase());
      });

      if (filtered.length === 0) return { text: "No matching events found.", sender: "bot" };

      const list = filtered.map((e, i) => {
        const eventDateParts = e.date.split(", ");
        const eventMonth = new Date(Date.parse(eventDateParts[0] + " 1, " + eventDateParts[1])).getMonth();
        const eventYear = parseInt(eventDateParts[1]);
        const eventDay = parseInt(e.date.split(" ")[1]);
        
        const eventDate = new Date(eventYear, eventMonth, eventDay);
        const isUpcoming = eventDate >= currentDate;
        
        // Modified registration button logic
        const reg = (isUpcoming && e.link) ? `\n   - **[Register](${e.link})**` : "";
        return `${i + 1}\\. **${e.name}**\n   - Date: ${e.date}\n   - Category: ${e.category}\n   - ${e.description}${reg}`;
      }).join("\n\n");

      return { text: `Here are the ${isPastQuery ? 'past' : isUpcomingQuery ? 'upcoming' : ''} events I found:\n\n${list}`, sender: "bot" };
    }

    return {
      text: "I'm not sure I understand. Try asking about clubs, events, or how to use the website!",
      sender: "bot",
    };
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button onClick={toggleChatbot} className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isOpen ? "bg-red-500 rotate-90" : "bg-gradient-to-r from-primary-500 to-secondary-500 hover:shadow-primary-300/50 hover:shadow-xl"}`}>
        {isOpen ? <FiX className="text-white text-xl" /> : <FiMessageSquare className="text-white text-xl" />}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 h-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 animate-fadeIn">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4 text-white">
            <h3 className="font-medium">ClubNect Assistant</h3>
            <p className="text-xs text-white/80">Ask me about clubs, events, or the website</p>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-neutral-50">
            {messages.map((message, index) => (
              <div key={index} className={`mb-3 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.sender === "user" ? "bg-primary-500 text-white rounded-tr-none" : "bg-white text-neutral-800 border border-neutral-200 rounded-tl-none"}`}>
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-neutral-200 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type your question..."
                className="flex-1 py-2 px-3 rounded-full border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300 text-sm"
              />
              <button type="submit" className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FiSend />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;