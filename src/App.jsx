import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Hero from './components/Hero';
import About from './components/About';
import { Button } from './components/ui/button';

// --- LOGIN PAGE COMPONENT ---
const LoginPage = ({ userDB }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userDB && userDB.email === email && userDB.password === password) {
      navigate('/dashboard');
    } else {
      alert("Invalid credentials! Please sign up first.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
      <div className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-slate-800">Login</h2>
        <input className="w-full p-3 mb-4 border rounded" type="email" placeholder="Gmail" onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full p-3 mb-6 border rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <Button className="w-full bg-emerald-600 mb-4" onClick={handleLogin}>Login</Button>
        <button onClick={() => navigate('/signup')} className="text-sm text-emerald-600 w-full text-center">Don't have an account? Sign Up</button>
      </div>
    </div>
  );
};

// --- SIGNUP PAGE COMPONENT ---
const SignupPage = ({ setUserDB }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    setUserDB({ email, password });
    alert("Account created successfully!");
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
      <div className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-slate-800">Create Account</h2>
        <input className="w-full p-3 mb-4 border rounded" type="email" placeholder="Gmail" onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full p-3 mb-6 border rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <Button className="w-full bg-emerald-600 mb-4" onClick={handleSignup}>Sign Up</Button>
      </div>
    </div>
  );
};

// --- DASHBOARD COMPONENT ---
const Dashboard = () => {
  const features = [
    { title: "Full Wipe Bar", desc: "Military-grade data erasure", icon: "🧹" },
    { title: "E-Waste Management", desc: "Sustainable disposal tracking", icon: "♻️" },
    { title: "AI Chatbot (LLM)", desc: "Trained security assistant", icon: "🤖" },
    { title: "Report Section", desc: "Compliance & Audit logs", icon: "📊" }
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">EcoSecure Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <div key={i} className="p-6 bg-white rounded-xl shadow-sm border hover:border-emerald-500 cursor-pointer transition-all">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-slate-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
function App() {
  const [userDB, setUserDB] = useState(null); // This stores our "fake" user database

  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<><Hero /><About /></>} />
          <Route path="/login" element={<LoginPage userDB={userDB} />} />
          <Route path="/signup" element={<SignupPage setUserDB={setUserDB} />} />
          <Route path="/dashboard" element={userDB ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;