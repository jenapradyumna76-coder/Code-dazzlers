import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Hero from './components/Hero';
import About from './components/About';
import { Button } from './components/ui/button';

// --- DASHBOARD COMPONENT ---
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [gbAmount, setGbAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [orderDetail, setOrderDetail] = useState(null);
  const [chatMessage, setChatMessage] = useState('');

  const generateOrder = () => {
    const newOrder = {
      id: "ECO-" + Math.floor(Math.random() * 1000000),
      gb: gbAmount,
      totalCost: gbAmount * 1, // 1 Rupee per GB
      desc: description,
      date: new Date().toLocaleString()
    };
    setOrderDetail(newOrder);
    setActiveTab('receipt');
  };

  const features = [
    { id: 'wipe', title: "Full Wipe Bar", desc: "Military-grade data erasure", icon: "🧹" },
    { id: 'ewaste', title: "E-Waste Management", desc: "Sustainable disposal tracking", icon: "♻️" },
    { id: 'chat', title: "AI Chatbot (LLM)", desc: "Trained security assistant", icon: "🤖" },
    { id: 'report', title: "Report Section", desc: "Compliance & Audit logs", icon: "📊" }
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-slate-800">EcoSecure Control Panel</h1>
        
        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {features.map((f) => (
            <div 
              key={f.id} 
              onClick={() => setActiveTab(f.id)}
              className="p-6 bg-white rounded-xl shadow-sm border hover:border-emerald-500 cursor-pointer transition-all"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* INTERACTIVE MODAL SECTION */}
        {activeTab && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-2xl max-w-md w-full relative">
              <button onClick={() => setActiveTab(null)} className="absolute top-4 right-4 text-gray-400">✕</button>
              
              {/* CHATBOT LOGIC */}
              {activeTab === 'chat' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">AI Security Assistant</h2>
                  <div className="bg-slate-50 h-40 p-3 rounded mb-4 overflow-y-auto text-sm">
                    <p className="text-emerald-600 font-bold">AI: Hello! How can I help you with data security today?</p>
                    {chatMessage && <p className="mt-2 text-slate-700">You: {chatMessage}</p>}
                  </div>
                  <input 
                    className="w-full p-2 border rounded mb-4" 
                    placeholder="Ask about data wiping..." 
                    onKeyDown={(e) => e.key === 'Enter' && setChatMessage(e.target.value)}
                  />
                  <Button className="w-full bg-emerald-600" onClick={() => alert("AI is processing...")}>Send</Button>
                </div>
              )}

              {/* FULL WIPE LOGIC */}
              {activeTab === 'wipe' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Setup Data Wipe</h2>
                  <label className="block text-sm font-medium mb-1">Enter Data Amount (GB)</label>
                  <input 
                    type="number" 
                    className="w-full p-2 border rounded mb-4" 
                    onChange={(e) => setGbAmount(e.target.value)}
                  />
                  <label className="block text-sm font-medium mb-1">Describe what is needed</label>
                  <textarea 
                    className="w-full p-2 border rounded mb-6" 
                    placeholder="e.g. 5 Hard drives from HR department"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className="bg-emerald-50 p-4 rounded mb-6">
                    <p className="text-emerald-800 font-bold">Total Cost: ₹{gbAmount * 1}</p>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1" onClick={generateOrder}>Skip Payment (Demo)</Button>
                    <Button className="flex-1 bg-emerald-600" onClick={() => alert("Redirecting to Gateway...")}>Pay ₹{gbAmount * 1}</Button>
                  </div>
                </div>
              )}

              {/* RECEIPT / ORDER ID */}
              {activeTab === 'receipt' && orderDetail && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">✓</div>
                  <h2 className="text-2xl font-bold mb-2">Order Generated!</h2>
                  <p className="text-slate-500 mb-6">Your request is being processed.</p>
                  <div className="bg-slate-50 p-4 rounded-lg text-left text-sm space-y-2">
                    <p><strong>Order ID:</strong> {orderDetail.id}</p>
                    <p><strong>Data:</strong> {orderDetail.gb} GB</p>
                    <p><strong>Total:</strong> ₹{orderDetail.totalCost}</p>
                    <p><strong>Notes:</strong> {orderDetail.desc}</p>
                    <p><strong>Date:</strong> {orderDetail.date}</p>
                  </div>
                  <Button className="w-full mt-6" onClick={() => setActiveTab(null)}>Return to Dashboard</Button>
                </div>
              )}

              {/* OTHER TABS */}
              {(activeTab === 'ewaste' || activeTab === 'report') && (
                <div className="text-center">
                  <h2 className="text-xl font-bold mb-4">Section Under Construction</h2>
                  <p className="mb-6 text-slate-500">This module is being trained for LLM integration.</p>
                  <Button onClick={() => setActiveTab(null)}>Close</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- AUTH PAGES (Previous Logic) ---
const LoginPage = ({ userDB }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = () => {
      if (userDB && userDB.email === email && userDB.password === password) navigate('/dashboard');
      else alert("Invalid credentials!");
    };
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
        <div className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
          <input className="w-full p-3 mb-4 border rounded" type="email" placeholder="Gmail" onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full p-3 mb-6 border rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <Button className="w-full bg-emerald-600 mb-4" onClick={handleLogin}>Login</Button>
          <button onClick={() => navigate('/signup')} className="text-sm text-emerald-600 w-full text-center">Need an account? Sign Up</button>
        </div>
      </div>
    );
};

const SignupPage = ({ setUserDB }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSignup = () => {
      setUserDB({ email, password });
      alert("Account created!");
      navigate('/login');
    };
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
        <div className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
          <input className="w-full p-3 mb-4 border rounded" type="email" placeholder="Gmail" onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full p-3 mb-6 border rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <Button className="w-full bg-emerald-600" onClick={handleSignup}>Create Account</Button>
        </div>
      </div>
    );
};

// --- MAIN APP ---
function App() {
  const [userDB, setUserDB] = useState(null);
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