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

    // Helper function to navigate and close
    const navigateAndClose = (path, message) => {
      navigate(path);
      setResponse(message);
      setIsOpen(false);
      setIsLoading(false);
      return true;
    };

    // First check for exact matches from navigationPrompts
    const findExactMatch = () => {
      for (const [section, data] of Object.entries(navigationPrompts)) {
        // Handle main section prompts
        if (Array.isArray(data) && data.includes(userQuery)) {
          return navigateAndClose(navigationData[section].path, 
            `Taking you to ${section} page`);
        }
        
        if (typeof data === 'object') {
          // Check main section prompts
          if (data.main && data.main.includes(userQuery)) {
            return navigateAndClose(navigationData[section].path, 
              `Taking you to ${section} page`);
          }
          
          // Check subsections for explore
          if (section === 'explore' && data.sections) {
            for (const [subSection, prompts] of Object.entries(data.sections)) {
              if (prompts.includes(userQuery)) {
                return navigateAndClose(`/explore?tab=${subSection}`,
                  `Taking you to the ${subSection} section`);
              }
            }
          }

          // Check subsections for about
          if (section === 'about' && data.sections) {
            for (const [subSection, prompts] of Object.entries(data.sections)) {
              if (prompts.includes(userQuery)) {
                return navigateAndClose(`/about#${subSection}`,
                  `Taking you to the ${subSection} section`);
              }
            }
          }
          
          // Handle registration prompts
          if (section === 'login' && data.registration) {
            for (const [regType, prompts] of Object.entries(data.registration)) {
              if (prompts.includes(userQuery)) {
                return navigateAndClose(`/register/${regType}`,
                  `Taking you to ${regType} registration`);
              }
            }
          }
        }
      }
      return false;
    };

    // Try exact match first
    if (findExactMatch()) return;

    // Keyword matching for partial matches
    const keywordMatch = () => {
      // Check for specific explore sections
      if (lowerQuery.includes('event')) {
        return navigateAndClose('/explore?tab=events', 
          'Taking you to the events section');
      }
      
      if (lowerQuery.includes('club') && !lowerQuery.includes('register')) {
        return navigateAndClose('/explore?tab=clubs', 
          'Taking you to the clubs section');
      }
      
      if (lowerQuery.includes('featured')) {
        return navigateAndClose('/explore?tab=featured', 
          'Taking you to the featured section');
      }

      // Check for about sections
      const aboutKeywords = {
        team: ['team', 'members', 'who'],
        story: ['story', 'history', 'about us'],
        contact: ['contact', 'reach', 'support'],
        faq: ['faq', 'question', 'help']
      };

      for (const [section, keywords] of Object.entries(aboutKeywords)) {
        if (keywords.some(keyword => lowerQuery.includes(keyword))) {
          return navigateAndClose(`/about#${section}`,
            `Taking you to the ${section} section`);
        }
      }

      // Check for registration
      if (lowerQuery.includes('register') || lowerQuery.includes('signup')) {
        if (lowerQuery.includes('club')) {
          return navigateAndClose('/register/club',
            'Taking you to club registration');
        }
        if (lowerQuery.includes('organization') || lowerQuery.includes('org')) {
          return navigateAndClose('/register/organization',
            'Taking you to organization registration');
        }
        return navigateAndClose('/register/user',
          'Taking you to user registration');
      }

      // Check main pages
      for (const [page, data] of Object.entries(navigationData)) {
        if (data.keywords.some(keyword => lowerQuery.includes(keyword))) {
          return navigateAndClose(data.path,
            `Taking you to the ${page} page`);
        }
      }

      return false;
    };

    // Try keyword matching if exact match failed
    if (keywordMatch()) return;

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
    <div className="fixed bottom-24 right-6 z-40">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 animate-fadeIn">
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
                className="w-full px-4 py-3 pr-10 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              />
              
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setQuery(suggestion);
                        handleNavigation(suggestion);
                        setSuggestions([]);
                        setIsOpen(false); // Close navigation box when clicking a suggestion
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 ${
                        index === selectedSuggestion 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-neutral-700'
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary-500 transition-colors disabled:opacity-50"
              >
                <FiSend size={18} />
              </button>
            </form>

            {response && (
              <div className="mt-4 p-3 bg-primary-50 text-primary-700 rounded-lg text-sm">
                {response}
              </div>
            )}

            <div className="mt-4 text-xs text-neutral-500">
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

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 relative z-[41] ${
          isOpen 
            ? "bg-red-500 rotate-90" 
            : "bg-gradient-to-r from-primary-500 to-secondary-500 hover:shadow-primary-300/50 hover:shadow-xl"
        }`}
        title="Navigation Assistant"
      >
        {isOpen ? <FiX className="text-white text-xl" /> : <FiNavigation2 className="text-white text-xl" />}
      </button>
    </div>
  );
}