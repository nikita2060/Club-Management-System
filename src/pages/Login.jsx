import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Login() {
  const location = useLocation();
  const isRegisterUser = location.pathname === '/register/user';
  const isRegisterClub = location.pathname === '/register/club';
  const isRegisterOrg = location.pathname === '/register/organization';
  const isLogin = location.pathname === '/login';

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
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate data being "saved"
    console.log('Form Data Submitted:', formData);

    // Show success message
    setSuccessMessage('Registration Successful!');

    // 🔹 Step 5: Clear input fields after submission
    setFormData({ name: '', email: '', usn: '', description: '', password: '' });

    // Hide success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

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
