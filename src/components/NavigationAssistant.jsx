import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiNavigation2, FiX, FiSend } from 'react-icons/fi';

export default function NavigationAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const navigationData = {
    home: { path: '/', keywords: ['home', 'main', 'landing', 'start'] },
    explore: { 
      path: '/explore', 
      keywords: ['explore', 'discover', 'clubs', 'events'],
      sections: {
        clubs: '/explore?tab=clubs',
        events: '/explore?tab=events',
        featured: '/explore?tab=featured'
      }
    },
    about: { 
      path: '/about', 
      keywords: ['about', 'info', 'information', 'team', 'contact'],
      sections: {
        team: '/about#team',
        story: '/about#story',
        contact: '/about#contact',
        faq: '/about#faq'
      }
    },
    login: { 
      path: '/login', 
      keywords: ['login', 'signin', 'account'],
      related: {
        registerUser: '/register/user',
        registerClub: '/register/club',
        registerOrg: '/register/organization'
      }
    }
  };

  const navigationPrompts = {
    home: [
      "Take me to home",
      "Go to homepage",
      "Show me the main page",
      "Navigate to landing page",
      "Return to start",
      "Back to home"
    ],
    explore: {
      main: [
        "Show me explore page",
        "Take me to explore",
        "I want to discover clubs",
        "Show available events",
        "Browse clubs and events"
      ],
      sections: {
        clubs: [
          "Show me all clubs",
          "Take me to clubs section",
          "I want to see available clubs",
          "Browse clubs list"
        ],
        events: [
          "Show me upcoming events",
          "Take me to events section",
          "What events are happening",
          "Browse events calendar"
        ],
        featured: [
          "Show featured content",
          "Take me to featured section",
          "Show me what's trending",
          "View featured clubs"
        ]
      }
    },
    about: {
      main: [
        "Show about page",
        "Tell me about the website",
        "Take me to about section",
        "I want to know more"
      ],
      sections: {
        team: [
          "Show me the team",
          "Who's behind this",
          "Take me to team section",
          "View team members"
        ],
        story: [
          "Tell me your story",
          "Show website history",
          "Take me to story section",
          "View about story"
        ],
        contact: [
          "How can I contact you",
          "Show contact information",
          "Take me to contact section",
          "I need to reach out"
        ],
        faq: [
          "Show me FAQ",
          "Common questions",
          "Take me to FAQ section",
          "I have questions"
        ]
      }
    },
    login: {
      main: [
        "I want to login",
        "Take me to login page",
        "Sign in to my account",
        "Access my profile",
        "Login screen please"
      ],
      registration: {
        user: [
          "I want to register",
          "Create new account",
          "Sign up as user",
          "How to register",
          "New user registration"
        ],
        club: [
          "Register my club",
          "Create club account",
          "New club registration",
          "I want to add my club",
          "Sign up as club"
        ],
        organization: [
          "Register organization",
          "Create organization account",
          "New org registration",
          "Add my organization",
          "Sign up as organization"
        ]
      }
    },
    general: [
      "Help me navigate",
      "Where can I find",
      "Show me around",
      "I'm looking for",
      "Can you guide me to"
    ]
  };

  const handleNavigation = (userQuery) => {
    setIsLoading(true);
    const lowerQuery = userQuery.toLowerCase();
    
    // First check for exact matches from navigationPrompts
    const findExactMatch = () => {
      for (const [section, data] of Object.entries(navigationPrompts)) {
        // Handle main section prompts
        if (Array.isArray(data) && data.includes(userQuery)) {
          navigate(navigationData[section].path);
          setResponse(`Taking you to ${section} page`);
          return true;
        }
        
        // Handle nested section prompts
        if (typeof data === 'object') {
          // Check main section prompts
          if (data.main && data.main.includes(userQuery)) {
            navigate(navigationData[section].path);
            setResponse(`Taking you to ${section} page`);
            return true;
          }
          
          // Check subsections
          if (data.sections) {
            for (const [subSection, prompts] of Object.entries(data.sections)) {
              if (prompts.includes(userQuery)) {
                const path = navigationData[section].sections[subSection];
                navigate(path);
                setResponse(`Taking you to the ${subSection} section of ${section}`);
                return true;
              }
            }
          }
          
          // Handle registration prompts
          if (section === 'login' && data.registration) {
            for (const [regType, prompts] of Object.entries(data.registration)) {
              if (prompts.includes(userQuery)) {
                navigate(navigationData.login.related[`register${regType.charAt(0).toUpperCase() + regType.slice(1)}`]);
                setResponse(`Taking you to ${regType} registration`);
                return true;
              }
            }
          }
        }
      }
      return false;
    };

    // Try exact match first
    if (findExactMatch()) {
      setIsLoading(false);
      return;
    }

    // Fallback to keyword matching for partial matches
    const keywordMatch = () => {
      // Check for specific sections first
      if (lowerQuery.includes('event') && lowerQuery.includes('section')) {
        navigate('/explore?tab=events');
        setResponse('Taking you to the events section');
        return true;
      }
      
      if (lowerQuery.includes('club') && lowerQuery.includes('section')) {
        navigate('/explore?tab=clubs');
        setResponse('Taking you to the clubs section');
        return true;
      }
      
      if (lowerQuery.includes('featured')) {
        navigate('/explore?tab=featured');
        setResponse('Taking you to the featured section');
        return true;
      }

      // Check for about page sections
      const aboutSections = ['team', 'story', 'contact', 'faq'];
      for (const section of aboutSections) {
        if (lowerQuery.includes(section)) {
          navigate(`/about#${section}`);
          setResponse(`Taking you to the ${section} section`);
          return true;
        }
      }

      // Check for registration intents
      if (lowerQuery.includes('register') || lowerQuery.includes('signup')) {
        if (lowerQuery.includes('club')) {
          navigate('/register/club');
          setResponse('Taking you to club registration');
          return true;
        }
        if (lowerQuery.includes('organization') || lowerQuery.includes('org')) {
          navigate('/register/organization');
          setResponse('Taking you to organization registration');
          return true;
        }
        navigate('/register/user');
        setResponse('Taking you to user registration');
        return true;
      }

      // Check for main pages
      for (const [page, data] of Object.entries(navigationData)) {
        if (data.keywords.some(keyword => lowerQuery.includes(keyword))) {
          navigate(data.path);
          setResponse(`Taking you to the ${page} page`);
          return true;
        }
      }

      return false;
    };

    // Try keyword matching if exact match failed
    if (keywordMatch()) {
      setIsLoading(false);
      return;
    }

    // No match found
    setResponse("I'm not sure where you want to go. Try asking about home, explore, about, or login pages!");
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    handleNavigation(query);
    setQuery('');
  };

  const getSuggestions = (input) => {
    const lowerInput = input.toLowerCase();
    let suggestions = [];

    // Search through all prompts and find matches
    const searchPrompts = (obj, path = '') => {
      if (Array.isArray(obj)) {
        obj.forEach(prompt => {
          if (prompt.toLowerCase().includes(lowerInput)) {
            suggestions.push(prompt);
          }
        });
      } else if (typeof obj === 'object') {
        Object.entries(obj).forEach(([key, value]) => {
          searchPrompts(value, path ? `${path}.${key}` : key);
        });
      }
    };

    searchPrompts(navigationPrompts);
    return suggestions.slice(0, 5); // Return top 5 suggestions
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSuggestions(value ? getSuggestions(value) : []);
    setSelectedSuggestion(-1); // Reset selection when input changes
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        if (selectedSuggestion >= 0) {
          e.preventDefault();
          const selectedPrompt = suggestions[selectedSuggestion];
          setQuery(selectedPrompt);
          handleNavigation(selectedPrompt);
          setSuggestions([]);
        }
        break;
      case 'Escape':
        setSuggestions([]);
        setSelectedSuggestion(-1);
        break;
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        title="Navigation Assistant"
      >
        {isOpen ? <FiX size={24} /> : <FiNavigation2 size={24} />}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border border-neutral-200">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4">
            <h3 className="text-white font-medium">Navigation Assistant</h3>
            <p className="text-white/80 text-sm">Where would you like to go?</p>
          </div>

          <div className="p-4">
            <form onSubmit={handleSubmit} className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ex: Take me to explore page..."
                className="w-full px-4 py-2 rounded-lg border focus:ring-2"
              />
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border rounded-lg mt-1 shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setQuery(suggestion);
                        handleNavigation(suggestion);
                        setSuggestions([]);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        index === selectedSuggestion 
                          ? 'bg-primary-100 text-primary-700' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary-500 transition-colors"
              >
                <FiSend size={18} />
              </button>
            </form>

            <div className="mt-3 text-xs text-neutral-500">
              Try asking:
              <ul className="mt-1 space-y-1">
                <li>• "Take me to the events section"</li>
                <li>• "Show me the team members"</li>
                <li>• "I want to register my club"</li>
                <li>• "Help me contact support"</li>
                <li>• "Show me the FAQs"</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}