import React, { useState, useEffect } from 'react';
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
  const [orders, setOrders] = useState([]); // Stores all generated orders
  const [chatHistory, setChatHistory] = useState([
    { role: 'bot', text: 'Hello! I am the EcoSecure AI. How can I assist with your data destruction today?' }
  ]);
  const [userInput, setUserInput] = useState('');

  // 1. CHATBOT LOGIC (Simple AI Response)
  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    const newChat = [...chatHistory, { role: 'user', text: userInput }];
    setChatHistory(newChat);
    setUserInput('');

    // Simulate AI thinking
    setTimeout(() => {
      let botReply = "I'm analyzing your request. For data wiping, please use the 'Full Wipe' tool.";
      if (userInput.toLowerCase().includes('price')) botReply = "Our current rate is ₹1 per GB of data wiped.";
      if (userInput.toLowerCase().includes('status')) botReply = "You can check your order status in the 'Report Section'.";
      
      setChatHistory([...newChat, { role: 'bot', text: botReply }]);
    }, 1000);
  };

  // 2. ORDER GENERATION
  const generateOrder = () => {
    const newOrder = {
      id: "ECO-" + Math.floor(Math.random() * 1000000),
      gb: gbAmount,
      totalCost: gbAmount * 1,
      desc: description,
      status: "In Progress", // Default status
      date: new Date().toLocaleDateString()
    };
    setOrders([...orders, newOrder]);
    setActiveTab('receipt');
  };

  const features = [
    { id: 'wipe', title: "Full Wipe Bar", desc: "Military-grade data erasure", icon: "🧹" },
    { id: 'chat', title: "AI Chatbot (LLM)", desc: "Trained security assistant", icon: "🤖" },
    { id: 'report', title: "Report Section", desc: "Track Orders & Compliance", icon: "📊" }
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-slate-800">EcoSecure Control Panel</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {features.map((f) => (
            <div key={f.id} onClick={() => setActiveTab(f.id)} className="p-6 bg-white rounded-xl shadow-sm border hover:border-emerald-500 cursor-pointer transition-all">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>

        {activeTab && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-2xl max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
              <button onClick={() => setActiveTab(null)} className="absolute top-4 right-4 text-gray-400">✕</button>
              
              {/* CHATBOT INTERFACE */}
              {activeTab === 'chat' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">AI Security Assistant</h2>
                  <div className="bg-slate-50 h-64 p-4 rounded mb-4 overflow-y-auto flex flex-col gap-3">
                    {chatHistory.map((msg, i) => (
                      <div key={i} className={`p-2 rounded-lg max-w-[80%] ${msg.role === 'bot' ? 'bg-emerald-100 self-start' : 'bg-blue-100 self-end'}`}>
                        {msg.text}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input className="flex-1 p-2 border rounded" placeholder="Type message..." value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} />
                    <Button className="bg-emerald-600" onClick={handleSendMessage}>Send</Button>
                  </div>
                </div>
              )}

              {/* FULL WIPE SETUP */}
              {activeTab === 'wipe' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Setup Data Wipe</h2>
                  <input type="number" className="w-full p-2 border rounded mb-4" placeholder="Enter Amount (GB)" onChange={(e) => setGbAmount(e.target.value)} />
                  <textarea className="w-full p-2 border rounded mb-4" placeholder="Description of items..." onChange={(e) => setDescription(e.target.value)} />
                  <p className="font-bold text-emerald-700 mb-6 text-lg">Estimated Cost: ₹{gbAmount * 1}</p>
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1" onClick={generateOrder}>Skip & Generate ID</Button>
                    <Button className="flex-1 bg-emerald-600" onClick={() => alert("Payment logic required for live use.")}>Pay ₹{gbAmount * 1}</Button>
                  </div>
                </div>
              )}

              {/* REPORT & TRACKING SECTION */}
              {activeTab === 'report' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Reports & Tracking</h2>
                  {orders.length === 0 ? (
                    <div className="text-center p-10 bg-slate-50 rounded border-dashed border-2">
                      <p className="text-slate-400">No reports generated yet. Status: <span className="text-orange-500 font-bold">PENDING</span></p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order, i) => (
                        <div key={i} className="p-4 border rounded-lg bg-slate-50">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-mono font-bold text-emerald-700">{order.id}</span>
                            <span className="px-2 py-1 bg-emerald-200 text-emerald-800 text-xs rounded-full uppercase font-bold">{order.status}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                          </div>
                          <p className="text-sm text-slate-600"><strong>Data:</strong> {order.gb} GB | <strong>Date:</strong> {order.date}</p>
                          <p className="text-xs text-slate-500 italic mt-1">"{order.desc}"</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* RECEIPT VIEW */}
              {activeTab === 'receipt' && (
                <div className="text-center">
                  <div className="text-4xl mb-4">📄</div>
                  <h2 className="text-2xl font-bold mb-4">Order ID: {orders[orders.length-1]?.id}</h2>
                  <p className="mb-6">Details saved to the Report Section.</p>
                  <Button className="w-full" onClick={() => setActiveTab('report')}>View Tracking</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- AUTH PAGES & APP (Keep your existing Login/Signup code) ---
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
          <h2 className="text-3xl font-bold mb-6 text-center text-slate-800">Login</h2>
          <input className="w-full p-3 mb-4 border rounded" type="email" placeholder="Gmail" onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full p-3 mb-6 border rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <Button className="w-full bg-emerald-600 mb-4" onClick={handleLogin}>Login</Button>
          <button onClick={() => navigate('/signup')} className="text-sm text-emerald-600 w-full text-center">Don't have an account? Sign Up</button>
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