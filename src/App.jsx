import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [activeEra, setActiveEra] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState('');

  const timelineEras = [
    {
      year: "1997",
      title: "Automotive Electronics & Audio",
      tag: "Foundation",
      desc: "Originated as a high-precision specialist in car audio and specialized automotive electronic components, establishing a benchmark for technical reliability."
    },
    {
      year: "2000s",
      title: "Authorized Dealer Supply Chain",
      tag: "Expansion",
      desc: "Scaled into nationwide distribution of elite automotive accessories, supplying major authorized dealer networks and expanding regional logistics."
    },
    {
      year: "2010s",
      title: "OEM Wiring Harness Execution",
      tag: "Engineering",
      desc: "Successfully engineered and fulfilled complex OEM wiring harness projects, adapting ahead of strict vehicle manufacturer factory standards."
    },
    {
      year: "Present",
      title: "GPS Fleet & AI Telematics",
      tag: "Transformation",
      desc: "Pivoted into full-scale enterprise GPS fleet management, intelligent AI video telematics systems, and cloud infrastructure powering modern transport networks."
    }
  ];

  const industries = ['Logistics', 'Transportation', 'Construction', 'Government', 'Healthcare', 'Marine', 'Utilities', 'Security', 'Commercial Fleets', 'Smart Mobility'];

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
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

          {/* Desktop Links */}
          <div className="hidden lg:flex space-x-6 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#about" className="hover:text-blue-400 transition-colors">Legacy</a>
            <a href="#governance" className="hover:text-blue-400 transition-colors">Mission</a>
            <a href="#solutions" className="hover:text-blue-400 transition-colors">Solutions</a>
            <a href="#expertise" className="hover:text-blue-400 transition-colors">Stack</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">Portfolio</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden pt-4 pb-3 border-t border-slate-800 mt-3 flex flex-col space-y-3 text-xs font-bold uppercase tracking-widest text-slate-300"
          >
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-400 transition-colors py-1">Legacy</a>
            <a href="#governance" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-400 transition-colors py-1">Mission</a>
            <a href="#solutions" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-400 transition-colors py-1">Solutions</a>
            <a href="#expertise" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-400 transition-colors py-1">Stack</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-400 transition-colors py-1">Portfolio</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-400 transition-colors py-1 text-blue-400">Contact</a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative py-28 md:py-36 px-6 flex items-center justify-center min-h-[85vh] border-b border-slate-800/80 overflow-hidden bg-[#06090f]">
        <div className="absolute inset-0 opacity-15 mix-blend-luminosity pointer-events-none scale-105">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
            alt="Connected Mobility Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#06090f] via-[#06090f]/90 to-transparent"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative max-w-4xl mx-auto text-center z-10 px-4">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] sm:text-xs font-semibold tracking-wider text-blue-400 mb-6 uppercase text-center max-w-xs sm:max-w-none mx-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse flex-shrink-0"></span>
            <span>Technology Integration Partner • Singapore & Southeast Asia</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 tracking-tight leading-[1.05] text-white">
            Driving the Future of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-slate-100 to-[#FF3366]">Connected Mobility</span>
          </h1>
          <p className="text-base md:text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Established in 1997, SQ Image (S) Pte Ltd delivers intelligent fleet technologies, AI video telematics, IoT connectivity and integrated mobility solutions across Singapore and Southeast Asia.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#solutions" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm tracking-wide uppercase shadow-lg shadow-blue-600/20">
              Explore Architecture
            </a>
            <a href="#contact" className="bg-[#0b0f17] hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm tracking-wide uppercase shadow-lg">
              Contact Integration Team
            </a>
          </div>
        </motion.div>
      </header>

      {/* Interactive 30-Year History Timeline Section */}
      <section id="about" className="py-28 px-6 relative bg-[#04060a] border-b border-slate-800/85">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
            <span className="text-xs font-mono text-[#FF3366] uppercase tracking-widest block mb-2">Chronological Evolution</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">Three Decades of Leadership</h2>
            <p className="text-slate-400 text-sm mt-4 max-w-xl">Select an era below to inspect our organizational growth from automotive specialists to enterprise telemetry leaders.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 relative z-10">
            {timelineEras.map((era, index) => (
              <button
                key={index}
                onClick={() => setActiveEra(index)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 ${
                  activeEra === index 
                    ? 'bg-blue-600/10 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.15)] scale-[1.02]' 
                    : 'bg-[#0b0f17] border-slate-800 text-slate-400 hover:border-slate-600 hover:bg-slate-800/50'
                }`}
              >
                <span className={`text-xs font-mono block mb-1 ${activeEra === index ? 'text-blue-400' : 'text-slate-500'}`}>{era.tag}</span>
                <span className="text-lg md:text-xl font-bold tracking-tight">{era.year}</span>
              </button>
            ))}
          </div>

          <div className="bg-[#0b0f17] border border-slate-800 rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-10 -right-10 p-8 opacity-5 font-mono text-[150px] font-black text-slate-400 pointer-events-none tracking-tighter">
              {timelineEras[activeEra].year}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEra}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 max-w-2xl"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 bg-slate-900 border border-slate-700 text-slate-300 rounded-md inline-block mb-6 shadow-inner">
                  Archive Node {activeEra + 1}.0
                </span>
                <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4 leading-tight">{timelineEras[activeEra].title}</h3>
                <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 text-pretty">{timelineEras[activeEra].desc}</p>
              </motion.div>
            </AnimatePresence>
            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              <span>SQ IMAGE ARCHIVE // 1997-2026</span>
              <span className="text-blue-400 flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span> STATUS: OPERATIONAL</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Core Values */}
      <section id="governance" className="py-24 px-6 border-b border-slate-800/80 bg-[#06090f]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-3"><div className="h-[1px] w-8 bg-blue-400"></div>Corporate Vision</h2>
              <p className="text-white text-xl md:text-2xl font-light leading-relaxed">
                "To become Southeast Asia’s trusted technology integration partner for <span className="font-semibold text-blue-400">intelligent mobility</span>, connected vehicles and fleet digitalisation."
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-xs font-mono text-[#FF3366] uppercase tracking-widest mb-4 flex items-center gap-3"><div className="h-[1px] w-8 bg-[#FF3366]"></div>Corporate Mission</h2>
              <p className="text-slate-300 text-base leading-relaxed">
                To deliver innovative, reliable and scalable technology solutions that improve safety, operational efficiency and business productivity while building long-term partnerships with our customers.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[#0b0f17] border border-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-[#FF3366]"></div>
              <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-8">Operating Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm font-medium text-slate-300">
                {['Innovation', 'Integrity', 'Reliability', 'Customer Partnership', 'Continuous Improvement', 'Professional Excellence'].map((val, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-blue-400 font-mono text-xs group-hover:border-blue-500 group-hover:text-white transition-colors">
                      0{i + 1}
                    </div>
                    <span className="group-hover:text-white transition-colors">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Solutions Section */}
      <section id="solutions" className="py-28 px-6 relative bg-[#04060a] border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14 text-center md:text-left">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-2">Architecture & Capabilities</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">Enterprise Customer Solutions</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[280px] gap-6">
            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#0b0f17] to-blue-950/20 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-end shadow-2xl group">
              <div className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" 
                  alt="Fleet Telemetry Dashboard" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/70 to-transparent z-0"></div>

              <div className="relative z-10">
                <span className="text-[10px] font-mono text-white bg-blue-600 px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block shadow-[0_0_10px_rgba(37,99,235,0.4)]">Primary Infrastructure</span>
                <h4 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">Fleet Management Solutions</h4>
                <p className="text-slate-300 text-base max-w-lg leading-relaxed">Command entire enterprise operations with real-time tracking, intelligent routing, and predictive analytics designed for massive commercial scale.</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="bg-[#0b0f17] border border-slate-800 hover:border-slate-600 rounded-3xl p-8 flex flex-col justify-between shadow-xl">
              <span className="text-[10px] font-mono text-[#FF3366] uppercase tracking-widest">Active Safety</span>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">AI Video Telematics</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Next-gen driver behavior monitoring and proactive ADAS collision avoidance.</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="bg-[#0b0f17] border border-slate-800 hover:border-slate-600 rounded-3xl p-8 flex flex-col justify-between shadow-xl">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">Infrastructure</span>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">IoT Connectivity & Cloud</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Seamless physical-to-cloud sensor synchronization ensuring zero data loss.</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="md:col-span-2 bg-[#0b0f17] border border-slate-800 hover:border-slate-600 rounded-3xl p-8 flex flex-col justify-center shadow-xl">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">Security & Support</span>
              <h4 className="text-xl md:text-2xl font-bold text-white mb-2">Vehicle Security, Installation & Maintenance</h4>
              <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">Military-grade asset protection, automated remote immobilization, end-to-end technical deployment and preventive maintenance.</p>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="bg-[#0b0f17] border border-slate-800 hover:border-slate-600 rounded-3xl p-8 flex flex-col justify-between shadow-xl">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Integration</span>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">System Integration</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Custom API routing and enterprise software architecture synchronization.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries Marquee */}
      <section id="industries" className="py-20 border-b border-slate-800/80 overflow-hidden bg-[#06090f]">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-1">Operational Sectors</span>
          <h2 className="text-3xl font-extrabold text-white">Industries We Serve</h2>
        </div>
        
        <div className="relative flex overflow-x-hidden group">
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#06090f] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#06090f] to-transparent z-10 pointer-events-none"></div>
          
          <motion.div 
            className="flex whitespace-nowrap gap-6 px-3"
            animate={{ x: [0, -1920] }} 
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            {[...industries, ...industries, ...industries].map((ind, i) => (
              <div key={i} className="bg-[#0b0f17] border border-slate-800 py-5 px-8 rounded-2xl text-slate-300 font-bold text-base md:text-lg flex-shrink-0 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-blue-500/50"></span> {ind}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technology Expertise */}
      <section id="expertise" className="py-24 px-6 bg-[#04060a] border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-1">Technical Stack</span>
            <h2 className="text-3xl font-extrabold text-white">Platform Capabilities</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0b0f17] border border-slate-800 p-8 rounded-3xl">
              <h3 className="text-white font-bold mb-6 flex items-center gap-3"><svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg> Intelligence & Analytics</h3>
              <div className="flex flex-wrap gap-2">
                {['Artificial Intelligence', 'Video Analytics', 'Fleet Analytics', 'Driver Monitoring'].map(tech => (
                  <span key={tech} className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded text-slate-300 font-mono text-[11px] uppercase tracking-wider">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="bg-[#0b0f17] border border-slate-800 p-8 rounded-3xl">
              <h3 className="text-white font-bold mb-6 flex items-center gap-3"><svg className="w-5 h-5 text-[#FF3366]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> Hardware & Safety</h3>
              <div className="flex flex-wrap gap-2">
                {['GPS Telematics', 'ADAS', 'IoT Sensors', 'Connected Vehicles'].map(tech => (
                  <span key={tech} className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded text-slate-300 font-mono text-[11px] uppercase tracking-wider">{tech}</span>
                ))}
              </div>
            </div>

            <div className="bg-[#0b0f17] border border-slate-800 p-8 rounded-3xl">
              <h3 className="text-white font-bold mb-6 flex items-center gap-3"><svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> Infrastructure</h3>
              <div className="flex flex-wrap gap-2">
                {['Cloud Platform', 'API Integration', 'Secure Routing', 'Data Redundancy'].map(tech => (
                  <span key={tech} className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded text-slate-300 font-mono text-[11px] uppercase tracking-wider">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-28 px-6 border-b border-slate-800/80 bg-[#06090f]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-14">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-1">Track Record</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">Featured Project Deployments</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.4 }} className="group relative bg-[#0b0f17] border border-slate-800 rounded-3xl overflow-hidden h-[400px] flex flex-col justify-end cursor-pointer shadow-2xl">
              <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700">
                <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1000&auto=format&fit=crop" alt="Fleet Digitalisation" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#06090f] via-[#06090f]/80 to-transparent z-10"></div>
              <div className="relative z-20 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex gap-2 mb-3">
                  <span className="text-[9px] font-mono uppercase bg-blue-600 px-2.5 py-1 rounded text-white shadow">Telematics</span>
                  <span className="text-[9px] font-mono uppercase bg-slate-800 px-2.5 py-1 rounded text-slate-300">Logistics</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Fleet Digitalisation</h4>
                <p className="text-slate-300 text-sm leading-relaxed">Full-scale telematics transformation for tier-1 regional transport networks.</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.4 }} className="group relative bg-[#0b0f17] border border-slate-800 rounded-3xl overflow-hidden h-[400px] flex flex-col justify-end cursor-pointer shadow-2xl">
              <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700">
                <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000&auto=format&fit=crop" alt="AI Driver Safety" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#06090f] via-[#06090f]/80 to-transparent z-10"></div>
              <div className="relative z-20 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex gap-2 mb-3">
                  <span className="text-[9px] font-mono uppercase bg-[#FF3366] px-2.5 py-1 rounded text-white shadow">ADAS AI</span>
                  <span className="text-[9px] font-mono uppercase bg-slate-800 px-2.5 py-1 rounded text-slate-300">Commercial</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">AI Driver Safety</h4>
                <p className="text-slate-300 text-sm leading-relaxed">Active collision avoidance and behavioral monitoring deployment for high-risk routes.</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.4 }} className="group relative bg-[#0b0f17] border border-slate-800 rounded-3xl overflow-hidden h-[400px] flex flex-col justify-end cursor-pointer shadow-2xl">
              <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700">
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop" alt="Municipal Solutions" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#06090f] via-[#06090f]/80 to-transparent z-10"></div>
              <div className="relative z-20 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex gap-2 mb-3">
                  <span className="text-[9px] font-mono uppercase bg-blue-600 px-2.5 py-1 rounded text-white shadow">GovTech</span>
                  <span className="text-[9px] font-mono uppercase bg-slate-800 px-2.5 py-1 rounded text-slate-300">Security</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Municipal Solutions</h4>
                <p className="text-slate-300 text-sm leading-relaxed">Secure tracking, asset governance, and compliance routing for municipal infrastructure.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-[#04060a] relative">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-1">Direct Channel</span>
            <h2 className="text-3xl font-extrabold text-white mb-6">Contact Our Team</h2>
            <p className="text-slate-400 text-sm mb-8">Ready to transform your fleet or explore enterprise integration? Connect with our systems architecture team.</p>
            
            <div className="space-y-4 text-sm text-slate-300 bg-[#0b0f17] border border-slate-800 p-6 rounded-3xl shadow-xl">
              <div className="flex items-start gap-4 border-b border-slate-800 pb-4">
                <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase font-mono block mb-0.5">Corporate Address</span>
                  <span className="text-white font-medium">Toul Kork, Phnom Penh, Cambodia</span>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-slate-800 pb-4">
                <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase font-mono block mb-0.5">Telephone</span>
                  <span className="text-white font-medium">Available via corporate inquiry</span>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-slate-800 pb-4">
                <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase font-mono block mb-0.5">Corporate Email</span>
                  <span className="text-blue-400 font-medium">enquiry@sqimage.com</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
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
      <footer className="bg-[#06090f] py-8 text-center border-t border-slate-800 text-slate-500 text-xs font-mono">
        <p>© 2026 SQ IMAGE (S) PTE LTD. ALL RIGHTS RESERVED. // PHNOM PENH, CAMBODIA</p>
      </footer>
    </div>
  );
};

export default App;