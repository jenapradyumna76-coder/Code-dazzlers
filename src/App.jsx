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
  const [chatHistory, setChatHistory] = useState([{ role: 'bot', text: `EcoSecure ready for ${userDB?.company || 'your company'}. How can I help?` }]);
  const [userInput, setUserInput] = useState('');

  // 1. GENERATE ORDER (Used for both Wipe and E-Waste)
  const generateOrder = (type, device = "N/A") => {
    const newOrder = {
      id: "ECO-" + Math.floor(Math.random() * 1000000),
      type: type,
      device: device,
      gb: gbAmount,
      company: userDB?.company,
      address: userDB?.address,
      status: "Technician Assigned",
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
            <h1 className="text-2xl font-bold text-slate-800">Welcome, {userDB?.company}</h1>
            <p className="text-sm text-slate-500">{userDB?.address}</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">Verified Account</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {features.map((f) => (
            <div key={f.id} onClick={() => setActiveTab(f.id)} className="p-4 bg-white rounded-xl shadow-sm border hover:border-emerald-500 cursor-pointer transition-all text-center">
              <div className="text-3xl mb-2">{f.icon}</div>
              <h3 className="text-xs font-bold mb-1">{f.title}</h3>
            </div>
          ))}
        </div>

        {activeTab && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-2xl max-w-lg w-full relative max-h-[85vh] overflow-y-auto">
              <button onClick={() => setActiveTab(null)} className="absolute top-4 right-4 text-gray-400">✕</button>
              
              {/* --- SERVICES DESCRIPTION --- */}
              {activeTab === 'services' && (
                <div>
                  <h2 className="text-xl font-bold mb-4 text-emerald-700">EcoSecure Services</h2>
                  <div className="space-y-4 text-sm text-slate-600">
                    <p><strong>1. Data Sanitization:</strong> NIST 800-88 compliant erasure for HDDs, SSDs, and Servers.</p>
                    <p><strong>2. E-Waste Pickup:</strong> Doorstep hardware collection for sustainable recycling.</p>
                    <p><strong>3. On-Site Shredding:</strong> Physical destruction of storage media at your company location.</p>
                    <p><strong>4. Compliance Audit:</strong> Full documentation and Green Certificates for ESG reporting.</p>
                  </div>
                </div>
              )}

              {/* --- E-WASTE MANAGEMENT (NEW WORKFLOW) --- */}
              {activeTab === 'ewaste' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Request E-Waste Pickup</h2>
                  <input type="text" className="w-full p-2 border rounded mb-3" placeholder="Device Name (e.g. Laptop, Server)" id="deviceName" />
                  <textarea className="w-full p-2 border rounded mb-3" placeholder="What should we do? (e.g. Shredding, Recycling)" id="action" />
                  <input type="number" className="w-full p-2 border rounded mb-4" placeholder="Amount of Data inside (GB)" onChange={(e) => setGbAmount(e.target.value)} />
                  <div className="bg-blue-50 p-3 rounded mb-4 text-xs text-blue-800">
                    Our technician will arrive at <strong>{userDB?.address}</strong> for this pickup.
                  </div>
                  <Button className="w-full bg-emerald-600" onClick={() => generateOrder('E-Waste', document.getElementById('deviceName').value)}>Proceed</Button>
                </div>
              )}

              {/* --- FULL WIPE --- */}
              {activeTab === 'wipe' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Setup Remote Data Wipe</h2>
                  <input type="number" className="w-full p-2 border rounded mb-3" placeholder="Amount (GB)" onChange={(e) => setGbAmount(e.target.value)} />
                  <textarea className="w-full p-2 border rounded mb-4" placeholder="Software details..." onChange={(e) => setDescription(e.target.value)} />
                  <Button className="w-full bg-emerald-600" onClick={() => generateOrder('Digital Wipe')}>Submit Request</Button>
                </div>
              )}

              {/* --- RECEIPT VIEW --- */}
              {activeTab === 'receipt' && (
                <div className="text-center">
                  <div className="text-4xl mb-4">🚛</div>
                  <h2 className="text-2xl font-bold mb-2 text-emerald-600">Request Confirmed!</h2>
                  <p className="mb-4 text-sm">Order <strong>{orders[orders.length-1]?.id}</strong> is active.</p>
                  <div className="bg-slate-50 p-4 rounded text-left text-xs mb-6">
                    <p className="font-bold text-blue-600 mb-2">Technician Status: Will reach you shortly.</p>
                    <p><strong>Company:</strong> {userDB?.company}</p>
                    <p><strong>Location:</strong> {userDB?.address}</p>
                  </div>
                  <Button className="w-full" onClick={() => setActiveTab('track')}>Track Order</Button>
                </div>
              )}

              {/* --- TRACKING & REPORTS (SAME AS BEFORE) --- */}
              {activeTab === 'track' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Live Tracking</h2>
                  {orders.map((o, i) => (
                    <div key={i} className="p-3 border rounded mb-2 bg-slate-50 text-xs">
                      <div className="flex justify-between font-bold"><span>{o.id} ({o.type})</span><span className="text-blue-600">{o.status}</span></div>
                      <p className="mt-1">Device: {o.device} | Data: {o.gb}GB</p>
                    </div>
                  ))}
                </div>
              )}
              
              {/* (Keeping Report/Chat simple for brevity) */}
              {activeTab === 'report' && <div className="text-center p-10">Reports for {userDB?.company} are "Work Under Process".</div>}
              {activeTab === 'chat' && <div className="text-center p-10 text-emerald-600">AI Assistant Online for {userDB?.company}.</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- UPDATED SIGNUP (To get Company/Address) ---
const SignupPage = ({ setUserDB }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if(!company || !address) { alert("Please enter Company details"); return; }
    setUserDB({ email, password, company, address });
    alert("Corporate Account Created!");
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Corporate Registration</h2>
        <input className="w-full p-3 mb-3 border rounded" placeholder="Company Name" onChange={(e)=>setCompany(e.target.value)} />
        <input className="w-full p-3 mb-3 border rounded" placeholder="Company Address" onChange={(e)=>setAddress(e.target.value)} />
        <input className="w-full p-3 mb-3 border rounded" placeholder="Gmail" onChange={(e)=>setEmail(e.target.value)} />
        <input className="w-full p-3 mb-6 border rounded" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        <Button className="w-full bg-emerald-600" onClick={handleSignup}>Create Account</Button>
      </div>
    </div>
  );
};

// --- LOGIN PAGE ---
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
        <h2 className="text-3xl font-bold mb-6 text-center">Client Login</h2>
        <input className="w-full p-3 mb-4 border rounded" type="email" placeholder="Gmail" onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full p-3 mb-6 border rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <Button className="w-full bg-emerald-600" onClick={handleLogin}>Login</Button>
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
          <Route path="/dashboard" element={userDB ? <Dashboard userDB={userDB} /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;