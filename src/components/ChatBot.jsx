import { useState, useRef, useEffect } from "react";
import { FiMessageSquare, FiSend, FiX } from "react-icons/fi";

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

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { text: inputValue, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    // Process the query and generate a response
    const botResponse = generateResponse(inputValue);
    
    // Simulate typing delay
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 600);
    
    setInputValue("");
  };

  const generateResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Club related queries
    if (lowerQuery.includes("club") || lowerQuery.includes("clubs")) {
      if (lowerQuery.includes("popular") || lowerQuery.includes("top")) {
        return {
          text: "The most popular clubs at our university include Enigma, Tech Council, Neuron, and Cypher. You can find more information about them on the Explore page!",
          sender: "bot",
        };
      } else if (lowerQuery.includes("join")) {
        return {
          text: "To join a club, navigate to the club's page and click the 'Join' button. You'll need to be logged in to complete this action.",
          sender: "bot",
        };
      } else {
        return {
          text: "We have many clubs on campus covering tech, culture, sports, and academics. You can explore all clubs in the Explore section!",
          sender: "bot",
        };
      }
    }
    
    // Event related queries
    else if (lowerQuery.includes("event") || lowerQuery.includes("events")) {
      if (lowerQuery.includes("upcoming") || lowerQuery.includes("next")) {
        return {
          text: "The next upcoming event is Inceptrix Hackathon on May 8-9, 2025. It's an exciting two-day hackathon focused on real-world problem solving!",
          sender: "bot",
        };
      } else if (lowerQuery.includes("register")) {
        return {
          text: "To register for an event, go to the event page and click the 'Register' button. Make sure you're logged in to complete registration.",
          sender: "bot",
        };
      } else {
        return {
          text: "We have various events throughout the year including hackathons, workshops, cultural festivals, and more. Check the Events section to see what's coming up!",
          sender: "bot",
        };
      }
    }
    
    // Website related queries
    else if (lowerQuery.includes("website") || lowerQuery.includes("use") || lowerQuery.includes("how to")) {
      return {
        text: "ClubNect helps you discover clubs and events on campus. You can browse clubs, register for events, and connect with the campus community. Create an account to get started!",
        sender: "bot",
      };
    }
    
    // Account related queries
    else if (lowerQuery.includes("account") || lowerQuery.includes("login") || lowerQuery.includes("register") || lowerQuery.includes("sign up")) {
      return {
        text: "You can create an account or login by clicking the 'Get Started' button or navigating to the login page. You can register as a user, club, or organization!",
        sender: "bot",
      };
    }
    
    // Default response for unrecognized queries
    else {
      return {
        text: "I'm not sure I understand. Try asking about clubs, events, or how to use the website!",
        sender: "bot",
      };
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      <button
        onClick={toggleChatbot}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen ? "bg-red-500 rotate-90" : "bg-gradient-to-r from-primary-500 to-secondary-500 hover:shadow-primary-300/50 hover:shadow-xl"
        }`}
      >
        {isOpen ? (
          <FiX className="text-white text-xl" />
        ) : (
          <FiMessageSquare className="text-white text-xl" />
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 h-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4 text-white">
            <h3 className="font-medium">ClubNect Assistant</h3>
            <p className="text-xs text-white/80">Ask me about clubs, events, or the website</p>
          </div>

          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto bg-neutral-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-primary-500 text-white rounded-tr-none"
                      : "bg-white text-neutral-800 border border-neutral-200 rounded-tl-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-neutral-200 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type your question..."
                className="flex-1 py-2 px-3 rounded-full border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-300 text-sm"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
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