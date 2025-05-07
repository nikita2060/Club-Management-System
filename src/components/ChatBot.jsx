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

const teamData = [
  { 
    name: "Pushkar Rai",
    role: "Team Member",
    email: "22btrcn216@jainuniversity.ac.in",
    linkedin: "https://www.linkedin.com/in/pushkar-rai-347130354"
  },
  { 
    name: "Abhishek Jha",
    role: "Team Member",
    email: "22btrcn011@jainuniversity.ac.in",
    linkedin: "https://www.linkedin.com/in/theabhishekkjha/"
  },
  { 
    name: "Kashish Shah",
    role: "Team Member",
    email: "22btrcn137@jainuniversity.ac.in",
    linkedin: "https://www.linkedin.com/in/kashish-shah-b50421256/"
  },
  { 
    name: "Nikita Pandey",
    role: "Team Member",
    email: "22btrcn190@jainuniversity.ac.in",
    linkedin: "https://www.linkedin.com/in/nikitapandey-tech/"
  }
];

const faqData = [
  {
    question: "How do I join a club?",
    answer: "Simply browse our clubs section, find a club that interests you, and click the 'Join' button. You'll be directed to the club's official page or contact information to complete the joining process."
  },
  {
    question: "Can I register my club on ClubNect?",
    answer: "Absolutely! We welcome all university clubs and organizations. Register through our platform by creating an account and following the club registration process."
  },
  {
    question: "How do I post an event?",
    answer: "Club administrators can post events through their dashboard. Simply log in, navigate to the events section, and fill out the event details form."
  },
  {
    question: "Is ClubNect only for Jain University?",
    answer: "Currently, we're focused on serving Jain University students, but we have plans to expand to other universities in the future."
  }
];

const contactInfo = {
  email: "22btrcn216@jainuniversity.ac.in",
  phone: "(+91) 9696724664",
  location: "Jain (Deemed-to-be-University), Faculty of Engineering and Technology (FET)"
};

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

    // Club-related queries
    if (
      lowerQuery.includes("club") ||
      lowerQuery.includes("join") ||
      lowerQuery.includes("organization") ||
      lowerQuery.includes("society") ||
      lowerQuery.includes("group") ||
      lowerQuery.includes("community") ||
      lowerQuery.includes("membership") ||
      lowerQuery.includes("tech council") ||
      lowerQuery.includes("enigma") ||
      lowerQuery.includes("neuron") ||
      lowerQuery.includes("cypher") ||
      lowerQuery.includes("turing") ||
      lowerQuery.includes("foss") ||
      lowerQuery.includes("cloud club") ||
      lowerQuery.includes("zigbee")
    ) {
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

    // Event-related queries
    if (
      lowerQuery.includes("event") ||
      lowerQuery.includes("workshop") ||
      lowerQuery.includes("hackathon") ||
      lowerQuery.includes("conference") ||
      lowerQuery.includes("competition") ||
      lowerQuery.includes("ctf") ||
      lowerQuery.includes("inceptrix") ||
      lowerQuery.includes("schedule") ||
      lowerQuery.includes("upcoming") ||
      lowerQuery.includes("past") ||
      lowerQuery.includes("when") ||
      lowerQuery.includes("register") ||
      lowerQuery.includes("participate")
    ) {
      const isPastQuery = lowerQuery.includes("past");
      const isUpcomingQuery = lowerQuery.includes("upcoming") || lowerQuery.includes("next");
      
      const filtered = eventData.filter((e) => {
        // Consider events with links as upcoming, without links as past
        const isUpcoming = !!e.link;
        
        if (isPastQuery) {
          return !isUpcoming;
        }
        if (isUpcomingQuery) {
          return isUpcoming;
        }
        
        // If no time filter, return all matching events
        return lowerQuery.includes("all") ||
          lowerQuery.includes(e.name.toLowerCase()) ||
          lowerQuery.includes(e.category.toLowerCase());
      });

      if (filtered.length === 0) return { text: "No matching events found.", sender: "bot" };

      const list = filtered.map((e, i) => {
        // Add register button only for events with links
        const reg = e.link ? `\n   - **[Register](${e.link})**` : "";
        return `${i + 1}\\. **${e.name}**\n   - Date: ${e.date}\n   - Category: ${e.category}\n   - ${e.description}${reg}`;
      }).join("\n\n");

      return { text: `Here are the ${isPastQuery ? 'past' : isUpcomingQuery ? 'upcoming' : ''} events I found:\n\n${list}`, sender: "bot" };
    }

    // Team-related queries
    if (
      lowerQuery.includes("team") ||
      lowerQuery.includes("developer") ||
      lowerQuery.includes("who made") ||
      lowerQuery.includes("who created") ||
      lowerQuery.includes("who developed") ||
      lowerQuery.includes("creator") ||
      lowerQuery.includes("member") ||
      lowerQuery.includes("maintainer") ||
      lowerQuery.includes("contact person") ||
      lowerQuery.includes("pushkar") ||
      lowerQuery.includes("abhishek") ||
      lowerQuery.includes("kashish") ||
      lowerQuery.includes("nikita")
    ) {
      const list = teamData.map((member, i) => 
        `${i + 1}\\. **${member.name}**\n   - Email: ${member.email}\n   - **[LinkedIn](${member.linkedin})**`
      ).join("\n\n");
      return { text: `Here's our development team:\n\n${list}`, sender: "bot" };
    }

    // FAQ-related queries
    if (
      lowerQuery.includes("faq") ||
      lowerQuery.includes("question") ||
      lowerQuery.includes("help") ||
      lowerQuery.includes("how to") ||
      lowerQuery.includes("how do i") ||
      lowerQuery.includes("what is") ||
      lowerQuery.includes("can i") ||
      lowerQuery.includes("guide") ||
      lowerQuery.includes("support") ||
      lowerQuery.includes("explain")
    ) {
      const list = faqData.map((faq, i) => 
        `${i + 1}\\. **Q: ${faq.question}**\n   A: ${faq.answer}`
      ).join("\n\n");
      return { text: `Here are some frequently asked questions:\n\n${list}`, sender: "bot" };
    }

    // Contact-related queries
    if (
      lowerQuery.includes("contact") ||
      lowerQuery.includes("reach") ||
      lowerQuery.includes("location") ||
      lowerQuery.includes("address") ||
      lowerQuery.includes("phone") ||
      lowerQuery.includes("call") ||
      lowerQuery.includes("email") ||
      lowerQuery.includes("mail") ||
      lowerQuery.includes("message") ||
      lowerQuery.includes("connect") ||
      lowerQuery.includes("get in touch") ||
      lowerQuery.includes("where") ||
      lowerQuery.includes("office") ||
      lowerQuery.includes("university") ||
      lowerQuery.includes("jain") ||
      lowerQuery.includes("fet")
    ) {
      return {
        text: `You can reach us through:\n\n📧 Email: ${contactInfo.email}\n📱 Phone: ${contactInfo.phone}\n📍 Location: ${contactInfo.location}`,
        sender: "bot"
      };
    }

    // Greeting patterns
    if (
      lowerQuery.includes("hi") ||
      lowerQuery.includes("hello") ||
      lowerQuery.includes("hey") ||
      lowerQuery.includes("greetings") ||
      lowerQuery.includes("good morning") ||
      lowerQuery.includes("good afternoon") ||
      lowerQuery.includes("good evening")
    ) {
      return {
        text: "Hello! 👋 How can I help you today? You can ask me about:\n- Clubs and memberships\n- Events and registrations\n- Team information\n- FAQs\n- Contact details",
        sender: "bot"
      };
    }

    // Thank you patterns
    if (
      lowerQuery.includes("thank") ||
      lowerQuery.includes("thanks") ||
      lowerQuery.includes("appreciate") ||
      lowerQuery.includes("helpful")
    ) {
      return {
        text: "You're welcome! 😊 Let me know if you need anything else!",
        sender: "bot"
      };
    }

    // Default response with improved suggestions
    return {
      text: "I'm not sure I understand. You can try asking about:\n\n" +
            "📚 **Clubs**: Browse or join clubs\n" +
            "📅 **Events**: Upcoming or past events\n" +
            "👥 **Team**: Our development team\n" +
            "❓ **FAQs**: Common questions\n" +
            "📞 **Contact**: How to reach us\n\n" +
            "Or try rephrasing your question!",
      sender: "bot"
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