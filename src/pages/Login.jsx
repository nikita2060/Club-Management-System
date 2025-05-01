import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiMail, FiLock, FiFileText, FiHash } from 'react-icons/fi';

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const isRegisterUser = location.pathname === '/register/user';
  const isRegisterClub = location.pathname === '/register/club';
  const isRegisterOrg = location.pathname === '/register/organization';
  const isLogin = location.pathname === '/login';

  const role = isRegisterUser ? 'user' : isRegisterClub ? 'club' : isRegisterOrg ? 'organization' : undefined;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    usn: '',
    description: '',
    password: '',
    confirmPassword: ''
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    
    // Clear error for this field when user types
    if (errors[e.target.id]) {
      setErrors({
        ...errors,
        [e.target.id]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Description validation for clubs and organizations
    if ((isRegisterClub || isRegisterOrg) && !formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Check if we're on the login page
      if (isLogin) {
        // Handle login logic
        const loginResponse = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password
        });
        
        // Store token in localStorage
        localStorage.setItem('token', loginResponse.data.token);
        localStorage.setItem('user', JSON.stringify(loginResponse.data.user));
        
        setSuccessMessage('Login successful! Redirecting...');
        
        // Redirect to home page after successful login
        setTimeout(() => {
          navigate('/');
        }, 1500);
        
      } else {
        // Handle registration
        // Create payload with required fields
        const payload = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };
        
        // Add optional fields based on role
        if (role) {
          payload.role = role;
        }
        
        if (formData.usn && !isRegisterClub && !isRegisterOrg) {
          payload.usn = formData.usn;
        }
        
        if ((isRegisterClub || isRegisterOrg) && formData.description) {
          payload.description = formData.description;
        }
        
        const response = await axios.post("http://localhost:5000/api/auth/register", payload);

        setSuccessMessage(response.data.message || 'Registration successful!');
        
        // Clear input fields after submission
        setFormData({ 
          name: '', 
          email: '', 
          usn: '', 
          description: '', 
          password: '',
          confirmPassword: ''
        });

        // Redirect to login page after successful registration
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      setErrors({
        form: error.response?.data?.message || 'An error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out relative overflow-hidden border border-neutral-100">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('/Images/pattern.svg')] opacity-5 z-0"></div>
        
        <div className="flex rounded-3xl overflow-hidden relative z-10">
          {/* Left Side - Navigation */}
          <div className="w-1/3 bg-gradient-to-br from-primary-500 to-secondary-600 p-8 space-y-6 rounded-l-3xl">
            <h2 className="text-2xl font-bold mb-8 text-white">Welcome to ClubNect</h2>
            <nav className="space-y-4 bg-white/10 p-4 rounded-xl shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)]">
              <Link to="/register/user" className={`block w-full text-left py-3 px-4 rounded-lg transition-all ${isRegisterUser ? 'bg-white text-primary-600 shadow-lg' : 'text-white hover:bg-white/20'}`}>
                Register As User
              </Link>
              <Link to="/register/club" className={`block w-full text-left py-3 px-4 rounded-lg transition-all ${isRegisterClub ? 'bg-white text-secondary-600 shadow-lg' : 'text-white hover:bg-white/20'}`}>
                Register As Club
              </Link>
              <Link to="/register/organization" className={`block w-full text-left py-3 px-4 rounded-lg transition-all ${isRegisterOrg ? 'bg-white text-primary-600 shadow-lg' : 'text-white hover:bg-white/20'}`}>
                Register As Organization
              </Link>
              <Link to="/login" className={`block w-full text-left py-3 px-4 rounded-lg transition-all ${isLogin ? 'bg-white text-primary-600 shadow-lg' : 'text-white hover:bg-white/20'}`}>
                Login
              </Link>
            </nav>
            
            <div className="mt-auto pt-8">
              <div className="text-white/90 text-sm">
                <p>Join our community of clubs and organizations.</p>
                <p className="mt-2">Connect, collaborate, and create amazing experiences together!</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-2/3 p-8 relative bg-white">
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <h3 className="text-3xl font-bold text-center mb-6 text-neutral-800">
                {isRegisterUser ? 'Register as User' :
                 isRegisterClub ? 'Register as Club' :
                 isRegisterOrg ? 'Register as Organization' :
                 'Login to Your Account'}
              </h3>
              
              {/* Success Message */}
              {successMessage && (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center">
                  {successMessage}
                </div>
              )}
              
              {/* Form Error */}
              {errors.form && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center">
                  {errors.form}
                </div>
              )}
              
              {/* Name Field - Only for Registration */}
              {!isLogin && (
                <div className="form-field">
                  <label htmlFor="name" className="block text-neutral-700 mb-1">Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.name ? 'border-red-300 bg-red-50' : 'border-neutral-200'} focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all`}
                      placeholder="Enter your name"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
              )}
              
              {/* Email Field */}
              <div className="form-field">
                <label htmlFor="email" className="block text-neutral-700 mb-1">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.email ? 'border-red-300 bg-red-50' : 'border-neutral-200'} focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              {/* USN Field - Only for User Registration */}
              {isRegisterUser && (
                <div className="form-field">
                  <label htmlFor="usn" className="block text-neutral-700 mb-1">USN (Optional)</label>
                  <div className="relative">
                    <FiHash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      id="usn"
                      value={formData.usn}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.usn ? 'border-red-300 bg-red-50' : 'border-neutral-200'} focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all`}
                      placeholder="Enter your USN (optional)"
                    />
                  </div>
                </div>
              )}
              
              {/* Description Field - Only for Club/Org Registration */}
              {(isRegisterClub || isRegisterOrg) && (
                <div className="form-field">
                  <label htmlFor="description" className="block text-neutral-700 mb-1">Description</label>
                  <div className="relative">
                    <FiFileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.description ? 'border-red-300 bg-red-50' : 'border-neutral-200'} focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all`}
                      placeholder="Describe your club or organization"
                    />
                  </div>
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
              )}
              
              {/* Password Field */}
              <div className="form-field">
                <label htmlFor="password" className="block text-neutral-700 mb-1">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.password ? 'border-red-300 bg-red-50' : 'border-neutral-200'} focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all`}
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              
              {/* Confirm Password Field - Only for Registration */}
              {!isLogin && (
                <div className="form-field">
                  <label htmlFor="confirmPassword" className="block text-neutral-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                    <input
                      type="password"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-neutral-200'} focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all`}
                      placeholder="Confirm your password"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              )}
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium shadow-md hover:shadow-lg hover:shadow-primary-300/30 hover:-translate-y-1 transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
              </button>
              
              {/* Login/Register Toggle */}
              <div className="text-center mt-6">
                {isLogin ? (
                  <p className="text-neutral-600">
                    Don't have an account? <Link to="/register/user" className="text-primary-600 hover:text-primary-700 font-medium">Register</Link>
                  </p>
                ) : (
                  <p className="text-neutral-600">
                    Already have an account? <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">Login</Link>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
