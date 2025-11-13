
import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { Demo } from './components/Demo';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Demo />
      </main>
      <Footer />
    </div>
  );
}

export default App;
