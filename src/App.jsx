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
  const [orders, setOrders] = useState([]); // Stores all orders
  const [chatHistory, setChatHistory] = useState([{ role: 'bot', text: 'EcoSecure AI ready. How can I help?' }]);
  const [userInput, setUserInput] = useState('');

  // 1. AI CHAT LOGIC
  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    const newChat = [...chatHistory, { role: 'user', text: userInput }];
    setChatHistory(newChat);
    setUserInput('');
    setTimeout(() => {
      setChatHistory([...newChat, { role: 'bot', text: "I am processing your security query. You can view all active orders in the Tracking Section." }]);
    }, 1000);
  };

  // 2. GENERATE ORDER
  const generateOrder = () => {
    const newOrder = {
      id: "ECO-" + Math.floor(Math.random() * 1000000),
      gb: gbAmount,
      desc: description,
      status: "In Progress",
      reportGenerated: false, // Report is not ready initially
      date: new Date().toLocaleDateString()
    };
    setOrders([...orders, newOrder]);
    setActiveTab('receipt');
  };

  const features = [
    { id: 'wipe', title: "Full Wipe Bar", desc: "Data erasure setup", icon: "🧹" },
    { id: 'ewaste', title: "E-Waste Management", desc: "Sustainable disposal", icon: "♻️" },
    { id: 'chat', title: "AI Chatbot (LLM)", desc: "Security assistant", icon: "🤖" },
    { id: 'track', title: "Track Order ID", desc: "Check live status", icon: "📍" },
    { id: 'report', title: "Report Generation", desc: "View final certificates", icon: "📜" }
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-slate-800">EcoSecure Control Panel</h1>
        
        {/* Main Grid with all 5 features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {features.map((f) => (
            <div key={f.id} onClick={() => setActiveTab(f.id)} className="p-4 bg-white rounded-xl shadow-sm border hover:border-emerald-500 cursor-pointer transition-all text-center">
              <div className="text-3xl mb-2">{f.icon}</div>
              <h3 className="text-sm font-bold mb-1">{f.title}</h3>
              <p className="text-[10px] text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>

        {activeTab && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-2xl max-w-lg w-full relative max-h-[85vh] overflow-y-auto">
              <button onClick={() => setActiveTab(null)} className="absolute top-4 right-4 text-gray-400">✕</button>
              
              {/* 1. FULL WIPE */}
              {activeTab === 'wipe' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Setup Data Wipe</h2>
                  <input type="number" className="w-full p-2 border rounded mb-3" placeholder="Amount (GB)" onChange={(e) => setGbAmount(e.target.value)} />
                  <textarea className="w-full p-2 border rounded mb-4" placeholder="Description..." onChange={(e) => setDescription(e.target.value)} />
                  <p className="font-bold text-emerald-700 mb-4">Cost: ₹{gbAmount * 1}</p>
                  <Button className="w-full bg-emerald-600" onClick={generateOrder}>Submit & Generate Order</Button>
                </div>
              )}

              {/* 2. E-WASTE */}
              {activeTab === 'ewaste' && (
                <div className="text-center">
                  <h2 className="text-xl font-bold mb-2">E-Waste Management</h2>
                  <p className="text-slate-600 mb-4">Request pickup for physical hardware recycling.</p>
                  <Button variant="outline" onClick={() => alert("Pickup service currently unavailable in your region.")}>Check Availability</Button>
                </div>
              )}

              {/* 3. CHATBOT */}
              {activeTab === 'chat' && (
                <div className="flex flex-col h-80">
                  <h2 className="text-xl font-bold mb-4">Security AI</h2>
                  <div className="flex-1 bg-slate-50 p-3 rounded mb-3 overflow-y-auto text-sm space-y-2">
                    {chatHistory.map((m, i) => <div key={i} className={`p-2 rounded ${m.role === 'bot' ? 'bg-emerald-100' : 'bg-blue-100 self-end'}`}>{m.text}</div>)}
                  </div>
                  <div className="flex gap-2">
                    <input className="flex-1 p-2 border rounded text-sm" placeholder="Ask anything..." value={userInput} onChange={(e) => setUserInput(e.target.value)} />
                    <Button onClick={handleSendMessage}>Send</Button>
                  </div>
                </div>
              )}

              {/* 4. TRACK ORDER ID */}
              {activeTab === 'track' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Live Order Tracking</h2>
                  {orders.length === 0 ? <p className="text-slate-400 text-center py-4">No active orders found.</p> : (
                    <div className="space-y-4">
                      {orders.map((o, i) => (
                        <div key={i} className="p-3 border rounded bg-slate-50">
                          <div className="flex justify-between text-xs font-bold mb-2"><span>{o.id}</span><span className="text-emerald-600">{o.status}</span></div>
                          <div className="w-full bg-gray-200 h-1.5 rounded-full"><div className="bg-emerald-500 h-1.5 rounded-full w-1/3"></div></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 5. REPORT GENERATION */}
              {activeTab === 'report' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Compliance Reports</h2>
                  {orders.length === 0 ? <p className="text-slate-400 text-center py-4">Status: Pending (No orders found)</p> : (
                    <div className="space-y-3">
                      {orders.map((o, i) => (
                        <div key={i} className="p-4 border rounded-lg flex justify-between items-center bg-gray-50">
                          <div>
                            <p className="text-sm font-bold">{o.id} Report</p>
                            <p className="text-[10px] text-slate-500">Issued: {o.date}</p>
                          </div>
                          {o.reportGenerated ? (
                            <Button size="sm" variant="outline" className="text-xs">Download PDF</Button>
                          ) : (
                            <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded">Work Under Process</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* RECEIPT VIEW */}
              {activeTab === 'receipt' && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2 text-emerald-600">Success!</h2>
                  <p className="mb-6 text-sm">Order <strong>{orders[orders.length-1]?.id}</strong> has been created.</p>
                  <Button className="w-full" onClick={() => setActiveTab('track')}>Go to Tracking</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- AUTH PAGES (Keep as is) ---
const LoginPage = ({ userDB }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = () => {
    if (userDB && userDB.email === email && userDB.password === password) navigate('/dashboard');
    else alert("Invalid credentials!");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 p-4">
      <div className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <input className="w-full p-3 mb-4 border rounded" type="email" placeholder="Gmail" onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full p-3 mb-6 border rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <Button className="w-full bg-emerald-600 mb-4" onClick={handleLogin}>Login</Button>
        <button onClick={() => navigate('/signup')} className="text-sm text-emerald-600 w-full text-center">Create Account</button>
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
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 p-4">
      <div className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <input className="w-full p-3 mb-4 border rounded" type="email" placeholder="Gmail" onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full p-3 mb-6 border rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <Button className="w-full bg-emerald-600" onClick={handleSignup}>Sign Up</Button>
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