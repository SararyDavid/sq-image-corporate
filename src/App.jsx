import React, { useState } from 'react';
import { motion } from 'framer-motion';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendToTelegram = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

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
        setStatus('Message Sent Successfully!');
        setFormData({ name: '', email: '', company: '', message: '' });
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('Failed to send. Check your .env variables.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Error sending message.');
    }
  };

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="bg-navy-primary text-white p-4 sticky top-0 z-50 shadow-md border-b border-white/10 backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="h-10 md:h-12 flex items-center">
            <img 
              src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQVY-GMAMe8pgcJjwfJC6ShbTtH7hj1ROxxqOFdvXXs_1aYWc9JIU_umW1zj_rEEDgaYsFRrcTozvLULT0" 
              alt="SQ Image Logo" 
              className="h-full object-contain mix-blend-screen"
            />
          </div>
          <div className="hidden md:flex space-x-8 text-sm uppercase tracking-wide text-gray-300">
            <a href="#about" className="hover:text-electric-accent transition">About Us</a>
            <a href="#solutions" className="hover:text-electric-accent transition">Solutions</a>
            <a href="#contact" className="hover:text-electric-accent transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-navy-primary text-white py-24 md:py-32 px-6 border-b border-electric-accent/20 flex items-center justify-center min-h-[80vh]">
        <div className="absolute inset-0 overflow-hidden opacity-30 mix-blend-luminosity">
          <img 
            src="https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTEiQQXbTR8dZIYO-idJrnSHcxg28DdTBVyGUSLTwxdHNZI6aQ_0zx-iB8lijh-8GBwVHPiLsZn08hhefs" 
            alt="Connected Mobility Tech" 
            className="w-full h-full object-cover scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-primary via-navy-primary/80 to-transparent"></div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative max-w-5xl mx-auto text-center z-10 pt-10"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Driving the Future of <br/>
            <span className="text-electric-accent">Connected Mobility</span> Since 1997
          </h1>
          <p className="text-base md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed px-4">
            SQ Image (S) Pte Ltd delivers intelligent fleet technologies, AI video telematics, IoT connectivity and integrated mobility solutions that improve safety, operational efficiency and business performance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
            <a href="#solutions" className="bg-electric-accent text-white font-bold py-3 px-8 rounded hover:bg-orange-500 transition shadow-[0_0_15px_rgba(255,107,0,0.4)] text-center">
              Explore Our Solutions
            </a>
            <a href="#contact" className="bg-transparent border border-white text-white font-bold py-3 px-8 rounded hover:bg-white hover:text-navy-primary transition text-center">
              Contact Our Team
            </a>
          </div>
        </motion.div>
      </header>

      {/* Why SQ Image Section */}
      <section id="about" className="py-20 px-6 bg-white overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy-primary mb-8">Our Journey of Innovation</h2>
          <div className="text-left space-y-6 text-gray-600 leading-relaxed border-l-4 border-electric-accent pl-6 mx-4 md:mx-auto">
            <p><strong>1997:</strong> Started as an automotive electronics and car audio specialist.</p>
            <p><strong>Expansion:</strong> Grew into automotive accessories distribution, supplying Sony authorised dealers.</p>
            <p><strong>Evolution:</strong> Successfully secured OEM wiring harness projects and adapted when vehicle manufacturers integrated accessories.</p>
            <p><strong>Transformation:</strong> Pivoted into GPS fleet management and expanded into cutting-edge AI video telematics.</p>
            <p><strong>Today:</strong> A premier provider of integrated fleet technologies and intelligent mobility solutions.</p>
          </div>
          <div className="mt-12 p-6 bg-slate-100 rounded-lg border-t-2 border-electric-accent mx-4 md:mx-0">
            <h3 className="text-lg md:text-xl font-semibold text-navy-primary">Technology changes. Our commitment to innovation never does.</h3>
          </div>
        </motion.div>
      </section>

      {/* Premium Bento Grid Solutions Section */}
      <section id="solutions" className="py-24 px-6 bg-[#040404] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-electric-accent/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-16 md:text-left text-center"
          >
            <h2 className="text-sm font-bold text-electric-accent uppercase tracking-widest mb-2">Our Expertise</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Integrated Customer Solutions.
            </h3>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[240px] gap-6"
          >
            {/* Card 1 */}
            <motion.div variants={fadeUp} className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md hover:border-electric-accent/50 transition-all duration-500 group relative overflow-hidden flex flex-col justify-end min-h-[350px]">
              <img 
                src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRFekandBdEKUKTlZyiFbiv5nV098vlG5pnmRzyjeCXJGw4AGxobMh6FY_V1S_L_i7obzKnwsX-OpY2y94" 
                alt="Fleet Management Dashboard" 
                className="absolute top-0 right-0 w-full md:w-2/3 h-auto opacity-30 md:opacity-40 group-hover:opacity-60 transition-opacity duration-500 rounded-bl-3xl"
                style={{ WebkitMaskImage: 'linear-gradient(to left, black 40%, transparent)' }}
              />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-electric-accent/20 blur-[80px] rounded-full group-hover:bg-electric-accent/30 transition-all duration-500"></div>
              
              <div className="relative z-10 mt-auto pt-32 md:pt-0">
                <div className="h-12 w-12 md:h-14 md:w-14 bg-white/10 rounded-2xl mb-4 md:mb-6 flex items-center justify-center border border-white/10 backdrop-blur-lg">
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-electric-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3">Fleet Management</h4>
                <p className="text-gray-400 text-sm md:text-lg max-w-md">Command your entire operation. Advanced routing, real-time tracking, and analytics designed to scale with your enterprise.</p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md hover:border-electric-accent/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[200px]">
              <h4 className="text-lg md:text-xl font-bold text-white mb-2">AI Video Telematics</h4>
              <p className="text-gray-400 text-xs md:text-sm">Next-gen driver monitoring and intelligent ADAS systems that proactively prevent accidents.</p>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md hover:border-electric-accent/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[200px]">
              <h4 className="text-lg md:text-xl font-bold text-white mb-2">IoT Connectivity</h4>
              <p className="text-gray-400 text-xs md:text-sm">Seamless sensor integration linking your physical assets to our cloud architecture instantly.</p>
            </motion.div>

            {/* Card 4 */}
            <motion.div variants={fadeUp} className="md:col-span-2 bg-gradient-to-r from-electric-accent/10 to-transparent border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md hover:border-electric-accent/50 transition-all duration-300 flex flex-col justify-center min-h-[200px]">
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="h-2 w-2 rounded-full bg-electric-accent animate-pulse"></div>
                <h4 className="text-lg md:text-xl font-bold text-white">Vehicle Security Solutions</h4>
              </div>
              <p className="text-gray-400 text-xs md:text-sm max-w-lg">Military-grade asset protection with automated immobilization protocols, geo-fencing, and instant breach alerts.</p>
            </motion.div>

            {/* Card 5 */}
            <motion.div variants={fadeUp} className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md hover:border-electric-accent/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden min-h-[200px]">
               <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-tl-full"></div>
              <h4 className="text-lg md:text-xl font-bold text-white mb-2 relative z-10">Cloud Services</h4>
              <p className="text-gray-400 text-xs md:text-sm relative z-10">Reliable, decentralized data storage ensuring zero downtime.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section connected to Telegram */}
      <section id="contact" className="py-20 md:py-24 px-4 md:px-6 bg-[#040404] relative overflow-hidden border-t border-white/5">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto relative z-10 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-12 backdrop-blur-xl shadow-2xl"
        >
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">Partner With Us</h2>
            <p className="text-gray-400 text-sm md:text-base">Ready to transform your fleet? Send us a message and our integration team will be in touch.</p>
          </div>
          
          <form onSubmit={sendToTelegram} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-400 mb-1 md:mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-accent transition-colors text-sm md:text-base"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-400 mb-1 md:mb-2">Company Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-accent transition-colors text-sm md:text-base"
                  placeholder="john@company.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-400 mb-1 md:mb-2">Company Name</label>
              <input 
                type="text" 
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-accent transition-colors text-sm md:text-base"
                placeholder="Enterprise Logistics Ltd."
              />
            </div>
            
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-400 mb-1 md:mb-2">Project Requirements</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-accent transition-colors resize-none text-sm md:text-base"
                placeholder="Tell us about your fleet size and technology needs..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-electric-accent text-white font-bold py-3 md:py-4 rounded-lg hover:bg-orange-500 transition shadow-[0_0_20px_rgba(255,107,0,0.2)] hover:shadow-[0_0_30px_rgba(255,107,0,0.4)] text-sm md:text-base"
            >
              Send Enquiry
            </button>
            
            {status && (
              <p className={`text-center mt-4 font-medium text-sm md:text-base ${status.includes('Success') ? 'text-green-400' : 'text-orange-400'}`}>
                {status}
              </p>
            )}
          </form>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black text-gray-500 py-8 md:py-12 text-center mt-auto border-t border-white/5">
        <p className="text-xs md:text-sm">© 2026 SQ Image (S) Pte Ltd. Empowering intelligent mobility.</p>
      </footer>
    </div>
  );
};

export default App;