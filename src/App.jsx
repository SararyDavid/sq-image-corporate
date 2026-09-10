import React, { useState } from 'react';
import { motion } from 'framer-motion';

const App = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const sendToTelegram = async (e) => {
    e.preventDefault();
    setStatus('Transmitting enquiry...');

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    
    const text = `
🚀 *New SQ Image Enquiry*
*Name:* ${formData.name}
*Email:* ${formData.email}
*Company:* ${formData.company}
*Message:* ${formData.message}
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'Markdown' }),
      });

      if (response.ok) {
        setStatus('Enquiry successfully transmitted.');
        setFormData({ name: '', email: '', company: '', message: '' });
        setTimeout(() => setStatus(''), 4000);
      } else {
        setStatus('Transmission failed. Check bot credentials.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Network error during transmission.');
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#06090f] text-slate-100 font-sans flex flex-col overflow-x-hidden selection:bg-blue-600 selection:text-white">
      
      {/* Industrial Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0c_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0c_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="bg-[#06090f]/90 backdrop-blur-xl border-b border-slate-800/80 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-auto flex items-center justify-center overflow-hidden">
              <img 
                src="/sq-logo.png" 
                alt="SQ Image Logo" 
                className="h-full w-auto object-contain mix-blend-screen filter brightness-125"
                onError={(e) => { e.target.style.display = 'none'; }} 
              />
            </div>
            <div className="flex flex-col border-l border-slate-800 pl-3">
              <span className="font-extrabold tracking-wider text-base text-white leading-none">
                SQ <span className="text-[#FF3366]">IMAGE</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-medium mt-1">Pte Ltd • Est. 1997</span>
            </div>
          </div>
          <div className="hidden lg:flex space-x-6 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#about" className="hover:text-blue-400 transition-colors">Legacy</a>
            <a href="#governance" className="hover:text-blue-400 transition-colors">Mission & Values</a>
            <a href="#solutions" className="hover:text-blue-400 transition-colors">Solutions</a>
            <a href="#industries" className="hover:text-blue-400 transition-colors">Industries</a>
            <a href="#expertise" className="hover:text-blue-400 transition-colors">Tech Stack</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">Portfolio</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-28 md:py-36 px-6 flex items-center justify-center min-h-[85vh] border-b border-slate-800/80 overflow-hidden">
        <div className="absolute inset-0 opacity-15 mix-blend-luminosity pointer-events-none scale-105">
          <img 
            src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2070&auto=format&fit=crop" 
            alt="Logistics & Fleet" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#06090f] via-[#06090f]/90 to-transparent"></div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative max-w-4xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold tracking-wider text-blue-400 mb-6 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            Technology Integration Partner • Singapore & Southeast Asia
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-[1.12] text-white">
            Driving the Future of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-slate-200 to-[#FF3366]">Connected Mobility Since 1997</span>
          </h1>
          <p className="text-base md:text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Established since 1997, SQ Image (S) Pte Ltd delivers intelligent fleet technologies, AI video telematics, IoT connectivity and integrated mobility solutions that improve safety, operational efficiency and business performance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#solutions" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm tracking-wide uppercase shadow-lg shadow-blue-600/20">
              Explore Our Solutions
            </a>
            <a href="#contact" className="bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm tracking-wide uppercase">
              Contact Our Team
            </a>
          </div>
        </motion.div>
      </header>

      {/* About & Evolution (Why SQ Image) */}
      <section id="about" className="py-24 px-6 relative bg-[#04060a] border-b border-slate-800/80">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="border-l-2 border-[#FF3366] pl-6 mb-12">
            <h2 className="text-xs font-bold text-[#FF3366] uppercase tracking-widest mb-1">Our Journey</h2>
            <h3 className="text-3xl font-extrabold text-white">Three Decades of Industry Leadership</h3>
            <p className="text-slate-400 text-sm mt-2">From automotive electronics to intelligent fleet technologies, SQ Image has continuously evolved to meet the changing needs of the transportation industry.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="bg-[#0b0f17] border border-slate-800 hover:border-slate-700 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-blue-400 font-mono text-xs uppercase">1997 Foundation</span>
                <h4 className="text-lg font-bold text-white mt-1 mb-2">Automotive Electronics & Audio</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Started as a specialist in car audio and vehicle electronics before scaling into official accessories distribution for Sony authorized dealer networks.</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="bg-[#0b0f17] border border-slate-800 hover:border-slate-700 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-blue-400 font-mono text-xs uppercase">OEM Evolution</span>
                <h4 className="text-lg font-bold text-white mt-1 mb-2">Wiring Harness Execution</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Successfully secured and delivered OEM wiring harness projects, adapting seamlessly when vehicle manufacturers integrated standard factory accessories.</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="bg-[#0b0f17] border border-slate-800 hover:border-blue-500/50 p-6 rounded-2xl flex flex-col justify-between border-l-2 border-l-blue-500 shadow-sm">
              <div>
                <span className="text-blue-400 font-mono text-xs uppercase">Modern Era</span>
                <h4 className="text-lg font-bold text-white mt-1 mb-2">GPS & AI Telematics</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Pivoted into full-scale enterprise GPS fleet management and advanced AI video telematics systems powering regional transport networks.</p>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-8 p-6 bg-[#0b0f17] border border-slate-800 rounded-2xl text-center">
            <p className="text-sm font-semibold text-slate-300">Technology changes. <span className="text-blue-400">Our commitment to innovation never does.</span></p>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Core Values */}
      <section id="governance" className="py-24 px-6 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }} className="bg-[#0b0f17] border border-slate-800 hover:border-slate-700 p-8 rounded-3xl shadow-sm">
              <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Our Vision</h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">To become Southeast Asia’s trusted technology integration partner for intelligent mobility, connected vehicles and fleet digitalisation.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }} className="bg-[#0b0f17] border border-slate-800 hover:border-slate-700 p-8 rounded-3xl shadow-sm">
              <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Our Mission</h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">To deliver innovative, reliable and scalable technology solutions that improve safety, operational efficiency and business productivity while building long-term partnerships with our customers.</p>
            </motion.div>
          </div>
          <div className="bg-[#0b0f17] border border-slate-800 p-8 rounded-3xl flex flex-col justify-center shadow-sm">
            <h2 className="text-xs font-bold text-[#FF3366] uppercase tracking-widest mb-4">Core Values</h2>
            <div className="grid grid-cols-2 gap-4 text-sm font-semibold text-slate-200">
              {['Innovation', 'Integrity', 'Reliability', 'Customer Partnership', 'Continuous Improvement', 'Professional Excellence'].map((val, i) => (
                <motion.div key={i} whileHover={{ x: 4 }} transition={{ duration: 0.2 }} className="p-3 bg-[#06090f] border border-slate-800 hover:border-blue-500/40 rounded-xl flex items-center gap-3 cursor-default">
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span> {val}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Solutions Bento Grid */}
      <section id="solutions" className="py-28 px-6 relative bg-[#04060a] border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Architecture & Capabilities</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white">Enterprise Customer Solutions</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[250px] gap-6">
            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="md:col-span-2 md:row-span-2 bg-[#0b0f17] border border-slate-800 hover:border-blue-500/50 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-end group shadow-sm">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" alt="Telemetry" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10">
                <span className="text-xs font-mono text-blue-400 uppercase">Primary Offering</span>
                <h4 className="text-2xl md:text-3xl font-bold text-white mt-1 mb-2">Fleet Management Solutions</h4>
                <p className="text-slate-400 text-sm max-w-md">Command entire enterprise operations with real-time tracking, intelligent routing, and predictive analytics designed for scale.</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="bg-[#0b0f17] border border-slate-800 hover:border-slate-700 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
              <span className="text-xs font-mono text-[#FF3366] uppercase">Active Safety</span>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">AI Video Telematics</h4>
                <p className="text-slate-400 text-xs">Next-gen driver behavior monitoring and proactive ADAS collision avoidance.</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="bg-[#0b0f17] border border-slate-800 hover:border-slate-700 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
              <span className="text-xs font-mono text-blue-400 uppercase">Infrastructure</span>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">IoT Connectivity & Cloud</h4>
                <p className="text-slate-400 text-xs">Seamless physical-to-cloud sensor synchronization ensuring zero data loss.</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="md:col-span-2 bg-[#0b0f17] border border-slate-800 hover:border-slate-700 rounded-3xl p-6 flex flex-col justify-center shadow-sm">
              <span className="text-xs font-mono text-slate-500 uppercase mb-1">Security & Support</span>
              <h4 className="text-lg font-bold text-white mb-1">Vehicle Security, Professional Installation & Maintenance</h4>
              <p className="text-slate-400 text-xs max-w-lg">Military-grade asset protection, automated remote immobilization, end-to-end technical deployment and preventive maintenance.</p>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="bg-[#0b0f17] border border-slate-800 hover:border-slate-700 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
              <span className="text-xs font-mono text-slate-500 uppercase">Integration</span>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">System Integration</h4>
                <p className="text-slate-400 text-xs">Custom API routing and enterprise software architecture synchronization.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section id="industries" className="py-24 px-6 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Sectors</h2>
            <h3 className="text-3xl font-extrabold text-white">Industries We Serve</h3>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {['Logistics', 'Transportation', 'Construction', 'Government', 'Healthcare', 'Marine', 'Utilities', 'Security', 'Commercial Fleets', 'Smart Mobility'].map((ind, i) => (
              <motion.div key={i} whileHover={{ y: -3, borderColor: 'rgba(59, 130, 246, 0.5)' }} transition={{ duration: 0.2 }} className="bg-[#0b0f17] border border-slate-800 py-4 px-3 rounded-xl text-slate-300 font-semibold text-sm cursor-default shadow-sm">
                {ind}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Expertise */}
      <section id="expertise" className="py-24 px-6 bg-[#04060a] border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Capabilities</h2>
            <h3 className="text-3xl font-extrabold text-white">Technology Expertise</h3>
          </motion.div>
          <div className="flex flex-wrap gap-3">
            {['GPS Telematics', 'Artificial Intelligence', 'Video Analytics', 'ADAS', 'Driver Monitoring', 'IoT', 'Cloud Platform', 'Fleet Analytics', 'API Integration', 'Connected Vehicles'].map((tech, i) => (
              <motion.span key={i} whileHover={{ scale: 1.03, backgroundColor: 'rgba(30, 41, 59, 1)' }} transition={{ duration: 0.2 }} className="bg-[#0b0f17] border border-slate-800 px-4 py-2.5 rounded-lg text-slate-300 font-mono text-xs uppercase tracking-wider cursor-default shadow-sm">
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-24 px-6 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Track Record</h2>
            <h3 className="text-3xl font-extrabold text-white">Featured Project Deployments</h3>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="bg-[#0b0f17] border border-slate-800 hover:border-slate-700 p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-white mb-2">Fleet Digitalisation</h4>
              <p className="text-slate-400 text-xs">Full-scale telematics transformation for regional transport networks.</p>
            </motion.div>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="bg-[#0b0f17] border border-slate-800 hover:border-slate-700 p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-white mb-2">AI Driver Safety Deployment</h4>
              <p className="text-slate-400 text-xs">Active ADAS and driver behavior monitoring implementation.</p>
            </motion.div>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="bg-[#0b0f17] border border-slate-800 hover:border-slate-700 p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-white mb-2">Government Fleet Solutions</h4>
              <p className="text-slate-400 text-xs">Secure tracking and asset governance for municipal infrastructure.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Us & Enquiry Form */}
      <section id="contact" className="py-24 px-6 bg-[#04060a] relative">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Direct Channel</h2>
            <h3 className="text-3xl font-extrabold text-white mb-6">Contact Our Team</h3>
            <p className="text-slate-400 text-sm mb-8">Ready to transform your fleet or explore enterprise integration? Connect with our systems architecture team.</p>
            
            <div className="space-y-4 text-sm text-slate-300 bg-[#0b0f17] border border-slate-800 p-6 rounded-2xl">
              <div className="flex items-start gap-4 border-b border-slate-800 pb-4">
                <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase font-mono block mb-0.5">Corporate Address</span>
                  <span className="text-white font-medium">Toul Kork, Phnom Penh, Cambodia</span>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-slate-800 pb-4">
                <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase font-mono block mb-0.5">Telephone</span>
                  <span className="text-white font-medium">Available via corporate inquiry</span>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-slate-800 pb-4">
                <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase font-mono block mb-0.5">Corporate Email</span>
                  <span className="text-blue-400 font-medium">enquiry@sqimage.com</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase font-mono block mb-0.5">Instant Messaging</span>
                  <span className="text-white font-medium">WhatsApp / Telegram Direct Integration</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0b0f17] border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={sendToTelegram} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="w-full bg-[#06090f] border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Corporate Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@enterprise.com" className="w-full bg-[#06090f] border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Company / Organization</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Logistics Corp Ltd." className="w-full bg-[#06090f] border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Project Requirements</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows="3" placeholder="Fleet size and technical scope..." className="w-full bg-[#06090f] border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition resize-none"></textarea>
              </div>
              
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] text-xs tracking-wider uppercase shadow-md shadow-blue-600/20">
                Submit Enquiry
              </button>
              
              {status && (
                <p className={`text-center mt-3 text-xs font-mono ${status.includes('successfully') ? 'text-green-400' : 'text-rose-400'}`}>
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#06090f] py-8 text-center border-t border-slate-800 text-slate-500 text-xs">
        <p>© 2026 SQ Image (S) Pte Ltd. All Rights Reserved. Intelligent Fleet & Mobility Solutions.</p>
      </footer>
    </div>
  );
};

export default App;