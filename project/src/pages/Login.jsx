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
      const response = await axios.post("http://localhost:5000/api/auth/register" , {
        name : formData.name,
        email : formData.email,
        usn : formData.usn,
        password : formData.password,
        role:role.toLowerCase(),
        description : formData.description

        });

        setSuccessMessage(response.data.message);
        console.log(response.data.message);

        
        // 🔹 Step 5: Clear input fields after submission
        setFormData({ name: '', email: '', usn: '', description: '', password: '' });

        // Hide success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      
    } catch (error) {

      console.error("Registration Error:", error.response ? error.response.data : error.message);
      setSuccessMessage(error.response?.data?.message || 'Registration failed');
      
    }
  }





  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f3f4f9] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex">
          {/* Left Side - Navigation */}
          <div className="w-1/3 bg-[#f3f4f9] p-8 space-y-6">
            <h2 className="text-2xl font-bold mb-8">Welcome</h2>
            <nav className="space-y-4">
              <Link to="/register/user" className={`block w-full text-left py-2 hover:text-primary transition-colors ${isRegisterUser ? 'text-primary font-semibold' : ''}`}>
                Register As User
              </Link>
              <Link to="/register/club" className={`block w-full text-left py-2 hover:text-primary transition-colors ${isRegisterClub ? 'text-primary font-semibold' : ''}`}>
                Register As Club
              </Link>
              <Link to="/register/organization" className={`block w-full text-left py-2 hover:text-primary transition-colors ${isRegisterOrg ? 'text-primary font-semibold' : ''}`}>
                Register As Organization
              </Link>
              <Link to="/login" className={`block w-full text-left py-2 hover:text-primary transition-colors ${isLogin ? 'text-primary font-semibold' : ''}`}>
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
                <input type="text" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" required />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" required />
              </div>

              {/* Show USN field only for User Registration */}
              {!isRegisterClub && !isRegisterOrg && (
                <div>
                  <label htmlFor="usn" className="block text-sm font-medium text-gray-700">USN (Optional)</label>
                  <input type="text" id="usn" value={formData.usn} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                </div>
              )}

              {/* Show Description field only for Club/Organization Registration */}
              {(isRegisterClub || isRegisterOrg) && (
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea id="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"></textarea>
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" required />
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full bg-primary text-white rounded-md py-2 hover:bg-secondary transition-colors">
                {isRegisterUser ? 'Register User' :
                 isRegisterClub ? 'Register Club' :
                 isRegisterOrg ? 'Register Organization' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
