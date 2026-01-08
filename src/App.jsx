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
  const [chatHistory, setChatHistory] = useState([{ role: 'bot', text: `EcoSecure AI ready for ${userDB?.company}. How can I assist you with your data security today?` }]);
  const [userInput, setUserInput] = useState('');

  // 1. IMPROVED AI CHAT LOGIC (Working Responses)
  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    const newChat = [...chatHistory, { role: 'user', text: userInput }];
    setChatHistory(newChat);
    const query = userInput.toLowerCase();
    setUserInput('');

    setTimeout(() => {
      let reply = "I'm analyzing your request. For specific service pricing, please check our 'Full Wipe' or 'E-Waste' sections.";
      if (query.includes('hello') || query.includes('hi')) reply = `Hello! How can EcoSecure help ${userDB?.company} today?`;
      if (query.includes('price') || query.includes('cost')) reply = "Our standard rate is ₹1 per GB for both digital wiping and e-waste data sanitization.";
      if (query.includes('safe') || query.includes('secure')) reply = "All destruction is performed at our specialized site under a 24/7 secure, monitored environment.";
      if (query.includes('technician')) reply = "Once an order is placed, a technician is dispatched to your registered address for pickup.";
      
      setChatHistory([...newChat, { role: 'bot', text: reply }]);
    }, 800);
  };

  // 2. GENERATE ORDER
  const generateOrder = (type, device = "N/A") => {
    const newOrder = {
      id: "ECO-" + Math.floor(Math.random() * 1000000),
      type: type,
      device: device,
      gb: gbAmount,
      cost: gbAmount * 1,
      company: userDB?.company,
      address: userDB?.address,
      status: "Technician Dispatched",
      reportGenerated: false,
      date: new Date().toLocaleDateString()
    };
    setOrders([...orders, newOrder]);
    setActiveTab('receipt');
  };

  const features = [
    { id: 'services', title: "Our Services", desc: "View service descriptions", icon: "📋" },
    { id: 'wipe', title: "Full Wipe Bar", desc: "Data erasure setup", icon: "🧹" },
    { id: 'ewaste', title: "E-Waste Management", desc: "Hardware recycling", icon: "♻️" },
    { id: 'chat', title: "AI Chatbot (LLM)", desc: "Security assistant", icon: "🤖" },
    { id: 'track', title: "Track Order ID", desc: "Check live status", icon: "📍" },
    { id: 'report', title: "Report Generation", desc: "View certificates", icon: "📜" }
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{userDB?.company}</h1>
            <p className="text-sm text-slate-500">{userDB?.address}</p>
          </div>
          <Button variant="outline" className="text-xs" onClick={() => window.location.href = '/'}>Logout</Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {features.map((f) => (
            <div key={f.id} onClick={() => { setActiveTab(f.id); setGbAmount(0); }} className="p-4 bg-white rounded-xl shadow-sm border hover:border-emerald-500 cursor-pointer transition-all text-center">
              <div className="text-3xl mb-2">{f.icon}</div>
              <h3 className="text-xs font-bold mb-1">{f.title}</h3>
            </div>
          ))}
        </div>

        {activeTab && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-2xl max-w-lg w-full relative max-h-[85vh] overflow-y-auto">
              <button onClick={() => setActiveTab(null)} className="absolute top-4 right-4 text-gray-400">✕</button>
              
              {/* --- UPDATED SERVICES DESCRIPTION --- */}
              {activeTab === 'services' && (
                <div>
                  <h2 className="text-xl font-bold mb-4 text-emerald-700">Service Portfolio</h2>
                  <div className="space-y-4 text-sm text-slate-600">
                    <p><strong>1. Data Sanitization:</strong> High-level digital wiping for servers and cloud storage.</p>
                    <p><strong>2. E-Waste Pickup:</strong> Secure collection of hardware from your corporate location.</p>
                    <p><strong>3. Off-Site Destruction:</strong> <span className="text-emerald-700 font-semibold">Destruction will be done on our site under a secure environment</span> to ensure zero data leakage.</p>
                    <p><strong>4. LLM-Based Auditing:</strong> Smart reporting for your annual ESG and compliance filings.</p>
                  </div>
                </div>
              )}

              {/* --- E-WASTE WITH PRICING --- */}
              {activeTab === 'ewaste' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">E-Waste Logistics</h2>
                  <input type="text" className="w-full p-2 border rounded mb-3" placeholder="Device (e.g. HDD, Laptop)" id="ew-device" />
                  <textarea className="w-full p-2 border rounded mb-3" placeholder="Disposal Instructions..." id="ew-action" />
                  <input type="number" className="w-full p-2 border rounded mb-2" placeholder="Est. Data Volume (GB)" onChange={(e) => setGbAmount(e.target.value)} />
                  <p className="text-lg font-bold text-emerald-700 mb-4">Total Quote: ₹{gbAmount * 1}</p>
                  <p className="text-[10px] text-slate-500 mb-4">Note: Technician will verify volume at {userDB?.address}</p>
                  <Button className="w-full bg-emerald-600" onClick={() => generateOrder('E-Waste', document.getElementById('ew-device').value)}>Proceed to Pickup</Button>
                </div>
              )}

              {/* --- CHATBOT (ACTIVE) --- */}
              {activeTab === 'chat' && (
                <div className="flex flex-col h-96">
                  <h2 className="text-xl font-bold mb-4">EcoSecure AI</h2>
                  <div className="flex-1 bg-slate-50 p-3 rounded mb-3 overflow-y-auto text-sm space-y-3">
                    {chatHistory.map((m, i) => (
                      <div key={i} className={`p-2 rounded-lg max-w-[85%] ${m.role === 'bot' ? 'bg-emerald-100 self-start' : 'bg-blue-600 text-white self-end ml-auto'}`}>
                        {m.text}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input className="flex-1 p-2 border rounded text-sm" placeholder="Ask about security..." value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} />
                    <Button className="bg-emerald-600" onClick={handleSendMessage}>Ask</Button>
                  </div>
                </div>
              )}

              {/* --- RECEIPT VIEW --- */}
              {activeTab === 'receipt' && (
                <div className="text-center py-4">
                  <div className="text-5xl mb-4">✅</div>
                  <h2 className="text-2xl font-bold text-emerald-600 mb-2">Request Logged</h2>
                  <p className="text-sm mb-6">Order <strong>{orders[orders.length-1]?.id}</strong> is now live.</p>
                  <div className="bg-slate-50 p-4 rounded-xl text-left text-xs mb-6 border">
                    <p className="text-blue-600 font-bold mb-1 italic text-center">Our technician will reach you shortly.</p>
                    <hr className="my-2" />
                    <p><strong>Device:</strong> {orders[orders.length-1]?.device}</p>
                    <p><strong>Service:</strong> {orders[orders.length-1]?.type}</p>
                    <p><strong>Cost:</strong> ₹{orders[orders.length-1]?.cost}</p>
                    <p><strong>Pickup:</strong> {userDB?.address}</p>
                  </div>
                  <Button className="w-full" onClick={() => setActiveTab('track')}>Track Order</Button>
                </div>
              )}

              {/* --- OTHER TABS (TRACK/WIPE/REPORT) --- */}
              {activeTab === 'track' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Live Tracking</h2>
                  {orders.length === 0 ? <p className="text-center text-slate-400 py-10">No orders placed yet.</p> : 
                    orders.map((o, i) => (
                      <div key={i} className="p-3 border rounded mb-3 bg-slate-50 text-xs">
                        <div className="flex justify-between font-bold mb-1"><span>{o.id}</span><span className="text-blue-600 uppercase">{o.status}</span></div>
                        <p>Service: {o.type} | Cost: ₹{o.cost}</p>
                      </div>
                    ))
                  }
                </div>
              )}

              {activeTab === 'wipe' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Digital Wipe</h2>
                  <input type="number" className="w-full p-2 border rounded mb-4" placeholder="Volume (GB)" onChange={(e) => setGbAmount(e.target.value)} />
                  <p className="text-lg font-bold text-emerald-700 mb-4">Charge: ₹{gbAmount * 1}</p>
                  <Button className="w-full bg-emerald-600" onClick={() => generateOrder('Digital Wipe')}>Initiate Erasure</Button>
                </div>
              )}

              {activeTab === 'report' && (
                <div className="text-center py-10">
                  <h2 className="text-xl font-bold mb-2">Audit Reports</h2>
                  <p className="text-slate-500 text-sm">Reports for {userDB?.company} are currently <strong>Work Under Process</strong>.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- AUTH PAGES ---
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