import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Hero from './components/Hero';
import About from './components/About';

// These are simple placeholders for your new pages
const LoginPage = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-2xl font-bold mb-4">Login Page</h1>
    <a href="/" className="text-emerald-600 underline">Go Back Home</a>
  </div>
);

const SignupPage = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-2xl font-bold mb-4">Sign Up Page</h1>
    <a href="/" className="text-emerald-600 underline">Go Back Home</a>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
            </>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;