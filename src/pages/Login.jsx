import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Login() 
{
  const location = useLocation();

  const isRegisterUser = location.pathname === '/register/user';
  const isRegisterClub = location.pathname === '/register/club';
  const isRegisterOrg = location.pathname === '/register/organization';
  const isLogin = location.pathname === '/login';

  const role = isRegisterUser ? 'user' : isRegisterClub ? 'club' : isRegisterOrg ? 'organization' : undefined;
  // if isRegisterUser is true, role = 'User' if not then it moves to next condition as  condition ? value_if_true : value_if_false;

  // 🔹 Step 1: State to store input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    usn: '',
    description: '',
    password: '',
  });

  // 🔹 Step 2: State for showing a success message
  const [successMessage, setSuccessMessage] = useState('');

  // 🔹 Step 3: Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 🔹 Step 4: Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();

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
          window.location.href = '/';
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
        
        console.log("Sending registration payload:", payload);
        
        const response = await axios.post("http://localhost:5000/api/auth/register", payload);

        setSuccessMessage(response.data.message || 'Registration successful!');
        console.log(response.data.message);
        
        // 🔹 Step 5: Clear input fields after submission
        setFormData({ name: '', email: '', usn: '', description: '', password: '' });

        // Hide success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error("Registration Error:", error.response ? error.response.data : error.message);
      setSuccessMessage(error.response?.data?.message || 'Registration failed');
    }
  }





  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#b5d4e8] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-[#b5d4e8] rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(0,0,0,0.4)] hover:scale-[1.02] transition-all duration-300 ease-in-out relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 z-0"
          style={{ backgroundImage: 'url("/Images/Login Page Background.jpg")' }}
        ></div>
        
        <div className="flex rounded-3xl overflow-hidden relative z-10">
          {/* Left Side - Navigation */}
          <div className="w-1/3 bg-[#b5d4e8] p-8 space-y-6 rounded-l-3xl">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">Welcome</h2>
            <nav className="space-y-4 bg-[#b5d4e8] p-4 rounded-xl shadow-[inset_0_4px_8px_rgba(0,0,0,0.2)]">
              <Link to="/register/user" className={`block w-full text-left py-2 px-4 rounded-lg hover:bg-[#a3c6e0] hover:shadow-lg transition-all ${isRegisterUser ? 'bg-[#a3c6e0] shadow-lg text-primary font-semibold' : 'text-gray-700'}`}>
                Register As User
              </Link>
              <Link to="/register/club" className={`block w-full text-left py-2 px-4 rounded-lg hover:bg-[#a3c6e0] hover:shadow-lg transition-all ${isRegisterClub ? 'bg-[#a3c6e0] shadow-lg text-primary font-semibold' : 'text-gray-700'}`}>
                Register As Club
              </Link>
              <Link to="/register/organization" className={`block w-full text-left py-2 px-4 rounded-lg hover:bg-[#a3c6e0] hover:shadow-lg transition-all ${isRegisterOrg ? 'bg-[#a3c6e0] shadow-lg text-primary font-semibold' : 'text-gray-700'}`}>
                Register As Organization
              </Link>
              <Link to="/login" className={`block w-full text-left py-2 px-4 rounded-lg hover:bg-[#a3c6e0] hover:shadow-lg transition-all ${isLogin ? 'bg-[#a3c6e0] shadow-lg text-primary font-semibold' : 'text-gray-700'}`}>
                Login
              </Link>
            </nav>
          </div>

          {/* Right Side - Form */}
          <div className="w-2/3 p-8 relative">
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <h3 className="text-2xl font-bold text-center mb-4">
                {isRegisterUser ? 'Register as User' :
                 isRegisterClub ? 'Register as Club' :
                 isRegisterOrg ? 'Register as Organization' : 'Login'}
              </h3>

              {/* Success Message */}
              {successMessage && <p className="text-green-600 text-center font-semibold">{successMessage}</p>}

              {/* Input Fields */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary" required />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary" required />
              </div>

              {/* Show USN field only for User Registration */}
              {!isRegisterClub && !isRegisterOrg && (
                <div>
                  <label htmlFor="usn" className="block text-sm font-medium text-gray-700">USN (Optional)</label>
                  <input type="text" id="usn" value={formData.usn} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary" />
                </div>
              )}

              {/* Show Description field only for Club/Organization Registration */}
              {(isRegisterClub || isRegisterOrg) && (
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea id="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary"></textarea>
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary" required />
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full bg-primary text-white rounded-md py-2 hover:bg-secondary transition-colors">
                {isLogin ? 'Login' : 
                 isRegisterUser ? 'Register User' :
                 isRegisterClub ? 'Register Club' :
                 isRegisterOrg ? 'Register Organization' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
