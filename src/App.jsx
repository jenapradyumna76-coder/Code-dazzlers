import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Hero from './components/Hero';
import About from './components/About';
import { Button } from './components/ui/button';

// --- DASHBOARD COMPONENT ---
const Dashboard = ({ userDB }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [gbAmount, setGbAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [orders, setOrders] = useState([]); 
  const [chatHistory, setChatHistory] = useState([{ role: 'bot', text: `EcoSecure AI ready for ${userDB?.company}. How can I assist you?` }]);
  const [userInput, setUserInput] = useState('');

  // 1. AI CHAT LOGIC
  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    const newChat = [...chatHistory, { role: 'user', text: userInput }];
    setChatHistory(newChat);
    const query = userInput.toLowerCase();
    setUserInput('');
    setTimeout(() => {
      let reply = "I'm analyzing your request. Our standard rate is ₹1 per GB.";
      if (query.includes('price')) reply = "Our standard rate is ₹1 per GB for all services.";
      if (query.includes('safe')) reply = "Destruction is done on our site under a 24/7 secure environment.";
      setChatHistory([...newChat, { role: 'bot', text: reply }]);
    }, 800);
  };

  // 2. GENERATE ORDER
  const generateOrder = (type, device = "N/A", customDesc = "") => {
    const newOrder = {
      id: "ECO-" + Math.floor(Math.random() * 1000000),
      type: type,
      device: device,
      gb: gbAmount,
      cost: gbAmount * 1,
      desc: customDesc || description,
      status: "Technician Dispatched",
      date: new Date().toLocaleDateString()
    };
    setOrders([...orders, newOrder]);
    setActiveTab('receipt');
  };

  const features = [
    { id: 'services', title: "Our Services", icon: "📋" },
    { id: 'wipe', title: "Full Wipe Bar", icon: "🧹" },
    { id: 'ewaste', title: "E-Waste Management", icon: "♻️" },
    { id: 'chat', title: "AI Chatbot (LLM)", icon: "🤖" },
    { id: 'track', title: "Track Order ID", icon: "📍" },
    { id: 'report', title: "Report Generation", icon: "📜" }
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Company Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{userDB?.company}</h1>
            <p className="text-sm text-slate-500">{userDB?.address}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>Logout</Button>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {features.map((f) => (
            <div key={f.id} onClick={() => { setActiveTab(f.id); setGbAmount(0); setDescription(''); }} className="p-4 bg-white rounded-xl shadow-sm border hover:border-emerald-500 cursor-pointer transition-all text-center">
              <div className="text-3xl mb-2">{f.icon}</div>
              <h3 className="text-xs font-bold">{f.title}</h3>
            </div>
          ))}
        </div>

        {activeTab && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-2xl max-w-lg w-full relative max-h-[85vh] overflow-y-auto shadow-2xl">
              <button onClick={() => setActiveTab(null)} className="absolute top-4 right-4 text-gray-400 text-xl">✕</button>
              
              {/* 1. SERVICES */}
              {activeTab === 'services' && (
                <div>
                  <h2 className="text-xl font-bold mb-4 text-emerald-700">Our Services</h2>
                  <div className="space-y-4 text-sm text-slate-600">
                    <p><strong>1. Data Sanitization:</strong> Remote digital wiping for cloud and local servers.</p>
                    <p><strong>2. E-Waste Pickup:</strong> Corporate hardware collection services.</p>
                    <p><strong>3. Off-Site Destruction:</strong> Destruction will be done on our site under a secure environment.</p>
                  </div>
                </div>
              )}

              {/* 2. FULL WIPE (Description Restored) */}
              {activeTab === 'wipe' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Remote Full Data Wipe</h2>
                  <input type="number" className="w-full p-2 border rounded mb-3" placeholder="Data Amount (GB)" onChange={(e) => setGbAmount(e.target.value)} />
                  <textarea 
                    className="w-full p-2 border rounded mb-4" 
                    placeholder="Describe what needs to be wiped (e.g., Azure Server, 5 SSDs, HR Database...)" 
                    onChange={(e) => setDescription(e.target.value)} 
                  />
                  <p className="text-lg font-bold text-emerald-700 mb-4 text-center">Price: ₹{gbAmount * 1}</p>
                  <Button className="w-full bg-emerald-600" onClick={() => generateOrder('Digital Wipe')}>Initiate Wipe</Button>
                </div>
              )}

              {/* 3. E-WASTE */}
              {activeTab === 'ewaste' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">E-Waste Pickup</h2>
                  <input type="text" className="w-full p-2 border rounded mb-3" placeholder="Device Name" id="ew-dev" />
                  <textarea className="w-full p-2 border rounded mb-3" placeholder="Action needed..." id="ew-act" />
                  <input type="number" className="w-full p-2 border rounded mb-3" placeholder="Data Volume (GB)" onChange={(e) => setGbAmount(e.target.value)} />
                  <p className="text-lg font-bold text-emerald-700 mb-4 text-center">Price: ₹{gbAmount * 1}</p>
                  <Button className="w-full bg-emerald-600" onClick={() => generateOrder('E-Waste', document.getElementById('ew-dev').value, document.getElementById('ew-act').value)}>Proceed</Button>
                </div>
              )}

              {/* 4. CHATBOT */}
              {activeTab === 'chat' && (
                <div className="flex flex-col h-96">
                  <h2 className="text-xl font-bold mb-4">AI Chatbot</h2>
                  <div className="flex-1 bg-slate-50 p-3 rounded mb-3 overflow-y-auto space-y-2 text-sm">
                    {chatHistory.map((m, i) => (
                      <div key={i} className={`p-2 rounded-lg max-w-[80%] ${m.role === 'bot' ? 'bg-emerald-100 self-start' : 'bg-blue-600 text-white self-end ml-auto'}`}>{m.text}</div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input className="flex-1 p-2 border rounded" placeholder="Ask about prices..." value={userInput} onChange={e=>setUserInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSendMessage()} />
                    <Button onClick={handleSendMessage}>Ask</Button>
                  </div>
                </div>
              )}

              {/* 5. TRACKING & 6. REPORTS */}
              {activeTab === 'track' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Live Tracking</h2>
                  {orders.length === 0 ? <p className="text-center py-10 text-slate-400">No orders.</p> : 
                    orders.map((o, i) => (
                      <div key={i} className="p-3 border rounded mb-2 bg-slate-50">
                        <p className="text-xs font-bold text-emerald-700">{o.id} - {o.type}</p>
                        <p className="text-[10px] text-blue-600 font-bold uppercase">{o.status}</p>
                      </div>
                    ))
                  }
                </div>
              )}

              {activeTab === 'report' && (
                <div className="text-center py-10">
                  <h2 className="text-xl font-bold mb-2">Audit Reports</h2>
                  <p className="text-sm text-slate-500 italic">Work Under Process for {userDB?.company}</p>
                </div>
              )}

              {/* RECEIPT */}
              {activeTab === 'receipt' && (
                <div className="text-center">
                  <div className="text-5xl mb-4">🚚</div>
                  <h2 className="text-xl font-bold text-emerald-600 mb-4">Order Confirmed</h2>
                  <div className="bg-slate-50 p-4 rounded text-left text-xs mb-6 border">
                    <p className="text-blue-600 font-bold mb-2 text-center italic">Our technician will reach you shortly.</p>
                    <p><strong>Order ID:</strong> {orders[orders.length-1]?.id}</p>
                    <p><strong>Cost:</strong> ₹{orders[orders.length-1]?.gb * 1}</p>
                    <p><strong>Location:</strong> {userDB?.address}</p>
                  </div>
                  <Button className="w-full" onClick={() => setActiveTab('track')}>Track Order</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- KEEP PREVIOUS LOGIN/SIGNUP/APP COMPONENTS ---
// (Ensure they pass 'userDB' to the Dashboard)
const SignupPage = ({ setUserDB }) => {
  const [f, setF] = useState({ e: '', p: '', c: '', a: '' });
  const n = useNavigate();
  const h = () => {
    if(!f.c || !f.a) return alert("Enter Company Info");
    setUserDB({ email: f.e, password: f.p, company: f.c, address: f.a });
    n('/login');
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Corporate Signup</h2>
        <input className="w-full p-3 mb-3 border rounded" placeholder="Company Name" onChange={e=>setF({...f, c:e.target.value})} />
        <input className="w-full p-3 mb-3 border rounded" placeholder="Full Address" onChange={e=>setF({...f, a:e.target.value})} />
        <input className="w-full p-3 mb-3 border rounded" placeholder="Gmail" onChange={e=>setF({...f, e:e.target.value})} />
        <input className="w-full p-3 mb-6 border rounded" type="password" placeholder="Password" onChange={e=>setF({...f, p:e.target.value})} />
        <Button className="w-full bg-emerald-600" onClick={h}>Create Account</Button>
      </div>
    </div>
  );
};

const LoginPage = ({ userDB }) => {
  const [e, setE] = useState('');
  const [p, setP] = useState('');
  const n = useNavigate();
  const h = () => {
    if (userDB && userDB.email === e && userDB.password === p) n('/dashboard');
    else alert("Login Failed");
  };
  return (
    <div className="flex items-center justify-center h-screen bg-slate-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input className="w-full p-3 mb-3 border rounded" placeholder="Gmail" onChange={v=>setE(v.target.value)} />
        <input className="w-full p-3 mb-6 border rounded" type="password" placeholder="Password" onChange={v=>setP(v.target.value)} />
        <Button className="w-full bg-emerald-600" onClick={h}>Login</Button>
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
          <Route path="/dashboard" element={userDB ? <Dashboard userDB={userDB} /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;