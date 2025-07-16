import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import ProfileCard from './ProfileCard';
import MagnetLines from './MagnetLines';
import Squares from './Squares';
import VariableProximity from './VariableProximity';
import GradientText from './GradientText';
import AnimatedContent from './AnimatedContent';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Particles from './Particles';
import HelloKitty from './HelloKitty';
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const curatedContainerRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(0);
  const [infoBoxStates, setInfoBoxStates] = useState([
    { hovered: false, active: false },
    { hovered: false, active: false },
    { hovered: false, active: false },
  ]);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isReadsModalOpen, setIsReadsModalOpen] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false);
  const [visitorForm, setVisitorForm] = useState({ name: '', linkedin: '', feedback: '' });
  const [visitorSubmitted, setVisitorSubmitted] = useState(false);
  const [isListensModalOpen, setIsListensModalOpen] = useState(false);
  const currentSongs = [
    'Kodak - King , SM',
    'Back to Friends - Sombr',
    'Choo loo - The Local Train',
    'Red - Seedhe Maut',
    'Itna na mujhse tu pyar badha - Talat Mahmood , Lata Mangeshkar',
  ];

  const projects = [
    {
      title: 'Portfolio Website',
      image: '/portfolioimage.png', // Using existing image as placeholder
      description: 'A modern, responsive portfolio website built with React, Tailwind CSS, and GSAP animations. Showcases my work, skills, and contact information in a visually engaging way.',
     
    },
    {
      title: 'Animal Game',
      image: '/animalcatch.png', // Using existing image as placeholder
      description: 'Animal Game is a playful JavaScript-based web game where cute, custom-designed animals fall from the top of the screen, and players must catch them in a basket. You get three lives, so be quick! It combines fun visuals with interactive gameplay—all coded by Sanika. (PS - I drew the animals)',
      url: 'https://sanikaamle.github.io/Animalgame/' // Add your animal game URL here
    },
    {
      title: 'Egg Timer',
      image: '/egg.png', // Using existing image as placeholder
      description: 'The Egg Timer website is a cute, aesthetically designed tool that helps you perfectly time your eggs—whether soft, medium, or hard-boiled. With preset timers and a clean, fun interface, it makes cooking eggs both easy and delightful. Just pick your style and let the timer do the work!',
      url: 'https://sanikaamle.github.io/Eggtimer/pages/TimerSelection.html' // Add your egg timer URL here
    }
  ];

  const recentBooks = [
    'The 48 Laws of Power by Robert Greene',
    'The King series by Ana Huang',
    
  ];

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  const handleInfoBoxEvent = (idx, type, value) => {
    setInfoBoxStates(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], [type]: value };
      return next;
    });
  };

  const getInfoBoxStyle = idx => {
    const base = {
      flex: '1 1 320px',
      minWidth: '300px',
      background: '#282b23',
      borderRadius: '28px',
      padding: '36px 28px',
      color: '#f8f7f5',
      boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: '1.13rem',
      fontWeight: 500,
      letterSpacing: '0.01em',
      minHeight: '220px',
      justifyContent: 'flex-start',
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s cubic-bezier(.4,2,.6,1)',
      cursor: 'pointer',
    };
    if (infoBoxStates[idx].hovered) {
      base.transform = infoBoxStates[idx].active ? 'scale(1.08)' : 'scale(1.05)';
      base.boxShadow = '0 8px 40px 0 rgba(163,177,138,0.25), 0 2px 16px rgba(0,0,0,0.18)';
    }
    return base;
  };

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      setContactSubmitted(true);
      setTimeout(() => {
        setIsContactModalOpen(false);
        setContactSubmitted(false);
        setContactForm({ name: '', email: '' });
      }, 1500);
    } catch (err) {
      alert('Failed to submit. Please try again.');
    }
  };

  const handleReadsBoxClick = () => setIsReadsModalOpen(true);
  const handleSuggestionChange = (e) => setSuggestion(e.target.value);
  const handleSuggestionSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await fetch(`${apiUrl}/api/suggestion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suggestion }),
      });
      setSuggestionSubmitted(true);
      setSuggestion('');
      setTimeout(() => setSuggestionSubmitted(false), 1500);
    } catch (err) {
      alert('Failed to submit suggestion.');
    }
  };

  const handleVisitorBoxClick = () => setIsVisitorModalOpen(true);
  const handleVisitorFormChange = (e) => {
    const { name, value } = e.target;
    setVisitorForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleVisitorFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await fetch(`${apiUrl}/api/visitor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitorForm),
      });
      setVisitorSubmitted(true);
      setVisitorForm({ name: '', linkedin: '', feedback: '' });
      setTimeout(() => setVisitorSubmitted(false), 1500);
    } catch (err) {
      alert('Failed to submit.');
    }
  };

  const handleListensBoxClick = () => setIsListensModalOpen(true);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#dad7cd' }}>
      {/* Header */}
      <header className="shadow-lg" style={{ backgroundColor: '#344e41' }} role="banner">
        <nav className="container mx-auto px-6 py-4" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold" style={{ color: '#dad7cd' }}>
              Sanika Amle
            </h1>
            <div className="flex space-x-8" role="menubar">
              <button
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={() => setActiveSection('home')}
                style={{ 
                  color: activeSection === 'home' ? '#588157' : '#dad7cd',
                  borderBottom: activeSection === 'home' ? '2px solid #588157' : 'none'
                }}
                role="menuitem"
                aria-current={activeSection === 'home' ? 'page' : undefined}
              >
                Home
              </button>
              <button
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => {
                  setActiveSection('about');
                  // Scroll to the introduction section (main content area)
                  const mainContent = document.querySelector('main');
                  if (mainContent) {
                    mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                style={{ 
                  color: activeSection === 'about' ? '#588157' : '#dad7cd',
                  borderBottom: activeSection === 'about' ? '2px solid #588157' : 'none'
                }}
                role="menuitem"
                aria-current={activeSection === 'about' ? 'page' : undefined}
              >
                About Me
              </button>
              <button
                className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                onClick={() => {
                  setActiveSection('projects');
                  // Scroll to the Curated Work section
                  if (curatedContainerRef.current) {
                    curatedContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                style={{ 
                  color: activeSection === 'projects' ? '#588157' : '#dad7cd',
                  borderBottom: activeSection === 'projects' ? '2px solid #588157' : 'none'
                }}
                role="menuitem"
                aria-current={activeSection === 'projects' ? 'page' : undefined}
              >
                Projects
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8" role="main">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh]" aria-labelledby="hero-heading">
          {/* Left Side - Introduction */}
          <div className="space-y-10">
            <div className="space-y-8">
              <h2 id="hero-heading" className="text-6xl font-bold leading-tight" style={{ color: '#344e41' }}>
                Hi, I'm <span style={{ color: '#588157' }}>Sanika Amle</span>
              </h2>
              <p className="text-2xl leading-relaxed" style={{ color: '#3a5a40' }}>
              A passionate Computer Science Engineering student who loves creating beautiful and functional web applications. I specialize in modern web technologies and enjoy turning complex problems into elegant solutions. Beyond coding, I'm also a technical writer who contributes to blogs and verses.
              </p>
              <p className="text-xl leading-relaxed" style={{ color: '#64724c' }}>
              With a strong foundation in front-end development, I build applications that provide exceptional user experiences. I'm always eager to learn new technologies and collaborate on innovative projects.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6">
              <button 
                className="px-10 py-4 rounded-lg font-semibold transition-colors duration-200 shadow-lg text-white text-lg"
                style={{ backgroundColor: '#588157' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#739f72'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#588157'}
                onClick={() => {
                  if (curatedContainerRef.current) {
                    curatedContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                View My Work
              </button>
              <a
                href="/Sanika_Amle_resume.pdf"
                download
                className="px-10 py-4 rounded-lg font-semibold transition-colors duration-200 border-2 text-lg"
                style={{ 
                  borderColor: '#588157', 
                  color: '#588157',
                  backgroundColor: 'transparent',
                  display: 'inline-block',
                  textAlign: 'center',
                  textDecoration: 'none',
                }}
                onMouseOver={e => {
                  e.target.style.backgroundColor = '#588157';
                  e.target.style.color = 'white';
                }}
                onMouseOut={e => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#588157';
                }}
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Right Side - Profile Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <ProfileCard
                name="Sanika Amle"
                title="Full Stack Developer"
                handle="sanikaamle"
                status="Available for work"
                contactText="Get In Touch"
                avatarUrl="/newsanika.png"
                showUserInfo={true}
                enableTilt={true}
                onContactClick={handleContactClick}
              />
            </div>
          </div>
        </section>

        {/* MagnetLines Section */}
        <div className="w-full flex justify-center mt-10" style={{ overflow: "hidden", marginBottom: '48px' }}>
          <MagnetLines
            rows={4}
            columns={15}
            containerSize="100%"
            lineColor="#588157"
            lineWidth="0.8vmin"
            lineHeight="5vmin"
            baseAngle={0}
            style={{ margin: "0 auto", width: "100%", maxWidth: "900px", height: "16vmin" }}
          />
        </div>

        {/* Stack Heading */}
        <section className="w-full flex justify-center mb-4" aria-labelledby="skills-heading">
          <h2 id="skills-heading" style={{ fontSize: '2.7rem', fontWeight: 900, color: '#344e41', letterSpacing: '0.05em', lineHeight: 1.1 }}>Stack</h2>
        </section>

        {/* Curved Squares Section with Skills Box */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '260px',
          margin: '0 auto',
          marginTop: '48px',
        }}>
          {/* Skills Box */}
          <div 
            role="list" 
            aria-label="Technical skills"
            style={{
              position: 'absolute',
              top: 145,
              left: '50%',
              transform: 'translateX(-50%) translateY(-60%)',
              background: '#fff',
              color: '#344e41',
              borderRadius: '80px',
              boxShadow: '0 2px 12px rgba(52,78,65,0.10)',
              padding: '39px 40px',
              fontWeight: 600,
              fontSize: '1.1rem',
              zIndex: 2,
              display: 'flex',
              gap: '18px',
              alignItems: 'center',
              minWidth: '220px',
              maxWidth: '90vw',
              flexWrap: 'wrap',
              border: '2px solid #dad7cd',
            }}
          >
            {['React', 'JavaScript', 'C++', 'Node.js', 'Python', 'HTML', 'CSS' ,'Tailwind CSS', 'Git', 'Github', 'MongoDB', 'SQL', 'Figma'].map(skill => (
              <span key={skill} role="listitem" className="skill-pop" style={{ padding: '4px 12px', borderRadius: '16px', background: '#e9e7e1', color: '#3a5a40', fontSize: '1.08rem', fontWeight: 700, transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s' }}>{skill}</span>
            ))}
          </div>
          {/* The green curved box */}
          <div style={{
            width: '100%',
            height: '260px',
            borderRadius: '0 0 120px 120px / 0 0 100px 100px',
            background: '#588157',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(52,78,65,0.10)'
          }}>
            <Squares
              speed={0.5}
              squareSize={40}
              direction='diagonal'
              borderColor='#fff'
              hoverFillColor='#222'
            />
          </div>
        </div>

        {/* Darker Theme Section with Two Boxes */}
        <section style={{
          width: '90vw',
          background: 'linear-gradient(180deg, #344e41 0%, #212619 100%)',
          padding: '80px 0 100px 0',
          marginTop: '70px',
          marginBottom: '30px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '40px',
            justifyContent: 'center',
          }}>
            {/* Journey Box */}
            <div style={{
              flex: '1 1 350px',
              minWidth: '320px',
              background: '#3a5a40',
              borderRadius: '32px',
              padding: '40px 32px',
              color: '#f8f7f5',
              boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              fontSize: '1.15rem',
              fontWeight: 500,
              letterSpacing: '0.01em',
            }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '18px', color: '#dad7cd', letterSpacing: '0.03em' }}>Journey</h3>
              <p style={{ color: '#edefe8', fontWeight: 400, lineHeight: 1.7 }}>
                {/* Add your journey/timeline/experience here */}
                My journey in tech began with curiosity and a love for building things. From learning the basics of web development to mastering modern frameworks, every step has been a story of growth and creativity. I look forward to learning whatever comes my way, embracing new technologies and challenges that will continue shaping my path as a developer.
              </p>
            </div>
            {/* Let's Work Together Box */}
            <div style={{
              flex: '1 1 350px',
              minWidth: '320px',
              background: '#588157',
              borderRadius: '32px',
              padding: '40px 32px',
              color: '#f8f7f5',
              boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              fontSize: '1.15rem',
              fontWeight: 500,
              letterSpacing: '0.01em',
            }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '18px', color: '#dad7cd', letterSpacing: '0.03em' }}>Let's Work Together</h3>
              <p style={{ color: '#edefe8', fontWeight: 400, lineHeight: 1.7 }}>
                {/* Add your call-to-action or contact info here */}
                Interested in collaborating or have a project in mind? Let's connect and create something amazing together!
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginTop: '24px',
              }}>
                <button
                  type="button"
                  style={{
                    background: '#344e41',
                    color: '#dad7cd',
                    padding: '12px 28px',
                    borderRadius: '18px',
                    fontWeight: 700,
                    fontSize: '1.08rem',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    letterSpacing: '0.02em',
                    transition: 'background 0.18s, color 0.18s',
                    display: 'inline-block',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                  onClick={handleContactClick}
                  onMouseOver={e => { e.target.style.background = '#dad7cd'; e.target.style.color = '#344e41'; }}
                  onMouseOut={e => { e.target.style.background = '#344e41'; e.target.style.color = '#dad7cd'; }}
                >
                  Contact Me
                </button>
                <span style={{
                  background: '#fff',
                  color: '#344e41',
                  padding: '10px 20px',
                  borderRadius: '14px',
                  fontWeight: 600,
                  fontSize: '1.02rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  border: '1.5px solid #dad7cd',
                  userSelect: 'all',
                  cursor: 'pointer',
                  display: 'inline-block',
                  transition: 'background 0.18s, color 0.18s',
                }}
                title="Click to copy"
                onClick={e => {
                  navigator.clipboard.writeText('sanika.amle123@gmail.com');
                  e.target.innerText = 'Copied!';
                  setTimeout(() => { e.target.innerText = 'sanika.amle123@gmail.com'; }, 600);
                }}
                >sanika.amle123@gmail.com</span>
              </div>
            </div>
          </div>
        </section>

        {/* Curated Work Section with Gradient */}
        <section 
          aria-labelledby="projects-heading"
          style={{
            width: '100vw',
            minHeight: '340px',
            padding: '80px 0 120px 0',
            background: 'linear-gradient(180deg, #344e41 0%, #212619 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw'
          }}
        >
          <div style={{
            width: '100%',
            minHeight: '340px',
            padding: 0,
            background: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            position: 'relative',
          }}>
            <div
              ref={curatedContainerRef}
              style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
            >
              {/* Decorative Bows */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                display: 'flex',
                gap: '10px',
                zIndex: 5,
                padding: '12px',
              }}>
                <img
                  src="/bow.png"
                  alt="bow"
                  style={{
                    width: '90px',
                    height: 'auto',
                    opacity: 0.92,
                    pointerEvents: 'none',
                  }}
                />
                <img
                  src="/bow.png"
                  alt="bow"
                  style={{
                    width: '90px',
                    height: 'auto',
                    opacity: 0.92,
                    pointerEvents: 'none',
                  }}
                />
              </div>
              
              <VariableProximity
                label={'Curated Work'}
                className={'curated-work-heading variable-proximity-demo'}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 144"
                containerRef={curatedContainerRef}
                radius={120}
                falloff='linear'
                style={{
                  fontSize: '5rem',
                  fontWeight: 900,
                  color: '#dad7cd',
                  letterSpacing: '0.05em',
                  marginBottom: '48px',
                  lineHeight: 1.1,
                  textShadow: '0 0 20px rgba(163,177,138,0.6), 0 0 40px rgba(163,177,138,0.4), 0 0 60px rgba(163,177,138,0.2), 0 2px 12px rgba(0,0,0,0.10)',
                  textAlign: 'center',
                  width: '100%',
                  maxWidth: '100vw',
                  display: 'block',
                  cursor: 'pointer',
                }}
              />
              {/* Projects Showcase */}
              <div style={{
                display: 'flex',
                width: '100%',
                maxWidth: '1100px',
                margin: '110px auto',
                gap: '48px',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                minHeight: '340px',
              }}>
                {/* Left: Project Images and Floating Details */}
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '32px', flex: '0 0 400px', alignItems: 'flex-start', minHeight: '800px', marginLeft: '0' }} ref={imagesContainerRef}>
                  {projects.map((project, idx) => (
                    <AnimatedContent
                      key={project.title}
                      distance={150}
                      direction="horizontal"
                      reverse={true}
                      duration={1.2}
                      ease="bounce.out"
                      initialOpacity={0.2}
                      animateOpacity
                      scale={1.1}
                      threshold={0.2}
                      delay={0.3 + idx * 0.1}
                    >
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'block' }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="project-image"
                          style={{
                            width: '400px',
                            height: '250px',
                            objectFit: 'fill',
                            borderRadius: '18px',
                            boxShadow: idx === selectedProject ? '0 4px 24px #dad7cd99' : '0 2px 8px #0002',
                            border: idx === selectedProject ? '3px solid #dad7cd' : '2px solid #e9e7e1',
                            cursor: 'pointer',
                            transition: 'box-shadow 0.2s, border 0.2s, transform 0.18s cubic-bezier(.4,2,.6,1)',
                            outline: 'none',
                          }}
                          onMouseEnter={() => setSelectedProject(idx)}
                        />
                      </a>
                    </AnimatedContent>
                  ))}
                  {/* Floating Details Box */}
                  <div style={{
                    position: 'absolute',
                    left: '420px',
                    top: `${selectedProject * (250 + 32)}px`,
                    transition: 'top 0.35s cubic-bezier(.4,2,.6,1)',
                    zIndex: 10,
                    flex: 1,
                    background: '#212619',
                    borderRadius: '24px',
                    padding: '36px 32px',
                    color: '#dad7cd',
                    minHeight: '180px',
                    boxShadow: '0 2px 16px #0002',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    maxWidth: '520px',
                    width: '480px',
                  }}>
                    <h4 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '18px', color: '#a3b18a', letterSpacing: '0.03em' }}>{projects[selectedProject].title}</h4>
                    <p style={{ color: '#edefe8', fontWeight: 400, lineHeight: 1.7, fontSize: '1.15rem' }}>{projects[selectedProject].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Animated Text Section */}
          <div style={{
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 20px',
          }}>
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="custom-class"
            >
              <span style={{ fontSize: '3.5rem', fontWeight: 700, lineHeight: 1.2 }}>
                From concept to <strong style={{ fontWeight: 900 }}>creation</strong> let's make it <strong style={{ fontWeight: 900 }}>happen</strong>
              </span>
            </GradientText>
          </div>
        </section>

        {/* Three Info Boxes Section */}
        <section style={{
          width: '100vw',
          padding: '70px 0 70px 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          minHeight: '320px',
          backgroundColor: '#22281b'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '40px',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '1200px',
          }}>
            {/* Box 1 */}
            <div
              style={getInfoBoxStyle(0)}
              onMouseEnter={() => handleInfoBoxEvent(0, 'hovered', true)}
              onMouseLeave={() => handleInfoBoxEvent(0, 'hovered', false)}
              onMouseDown={() => handleInfoBoxEvent(0, 'active', true)}
              onMouseUp={() => handleInfoBoxEvent(0, 'active', false)}
              tabIndex={0}
              onClick={handleReadsBoxClick}
            >
              <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
              />
              <div className="particles-box-content" style={{ textAlign: 'center', width: '100%' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px', color: '#a3b18a', letterSpacing: '0.03em' }}>My Recent Reads</h3>
                {/* Add your content here */}
              </div>
            </div>
            {/* Box 2 */}
            <div
              style={getInfoBoxStyle(1)}
              onMouseEnter={() => handleInfoBoxEvent(1, 'hovered', true)}
              onMouseLeave={() => handleInfoBoxEvent(1, 'hovered', false)}
              onMouseDown={() => handleInfoBoxEvent(1, 'active', true)}
              onMouseUp={() => handleInfoBoxEvent(1, 'active', false)}
              tabIndex={0}
              onClick={handleVisitorBoxClick}
            >
              <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
              />
              <div className="particles-box-content" style={{ textAlign: 'center', width: '100%' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px', color: '#a3b18a', letterSpacing: '0.03em' }}>Let me know you were here!</h3>
                {/* Add your content here */}
              </div>
            </div>
            {/* Box 3 */}
            <div
              style={getInfoBoxStyle(2)}
              onMouseEnter={() => handleInfoBoxEvent(2, 'hovered', true)}
              onMouseLeave={() => handleInfoBoxEvent(2, 'hovered', false)}
              onMouseDown={() => handleInfoBoxEvent(2, 'active', true)}
              onMouseUp={() => handleInfoBoxEvent(2, 'active', false)}
              tabIndex={0}
              onClick={handleListensBoxClick}
            >
              <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
              />
              <div className="particles-box-content" style={{ textAlign: 'center', width: '100%' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px', color: '#a3b18a', letterSpacing: '0.03em' }}>Current Listens</h3>
                {/* Add your content here */}
              </div>
            </div>
          </div>
        </section>

        {/* Squares Animation Transition Section */}
        <div style={{
          width: '100vw',
          background: '#ece9dd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          height: '140px',
          overflow: 'hidden',
        }}>
          <Squares
            speed={0.7}
            squareSize={36}
            direction='horizontal'
            borderColor='#b5c7a7'
            hoverFillColor='#a3b18a'
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: '#344e41', marginTop: '-2rem' }} role="contentinfo">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg" style={{ color: '#dad7cd' }}>
             Sanika Amle
          </p>
          <nav className="flex justify-center space-x-6 mt-4" role="navigation" aria-label="Social media links">
            <a 
              href="https://github.com/sanikaamle" 
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: '#a3b18a' }}
              onMouseOver={(e) => e.target.style.color = '#dad7cd'}
              onMouseOut={(e) => e.target.style.color = '#a3b18a'}
              aria-label="Visit Sanika's GitHub profile"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/sanika-amle-6777b8313/" 
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: '#a3b18a' }}
              onMouseOver={(e) => e.target.style.color = '#dad7cd'}
              onMouseOut={(e) => e.target.style.color = '#a3b18a'}
              aria-label="Visit Sanika's LinkedIn profile"
            >
              LinkedIn
            </a>
            <a 
              href="https://x.com/sanika_amle" 
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: '#a3b18a' }}
              onMouseOver={(e) => e.target.style.color = '#dad7cd'}
              onMouseOut={(e) => e.target.style.color = '#a3b18a'}
              aria-label="Visit Sanika's Twitter profile"
            >
              Twitter
            </a>
            <a 
              href="https://www.instagram.com/the_versemake/" 
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: '#a3b18a' }}
              onMouseOver={(e) => e.target.style.color = '#dad7cd'}
              onMouseOut={(e) => e.target.style.color = '#a3b18a'}
              aria-label="Visit Sanika's Instagram profile"
            >
              Instagram
            </a>
          </nav>
        </div>
      </footer>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(44, 54, 41, 0.75)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
          onClick={() => setIsContactModalOpen(false)}
        >
          <div
            style={{
              background: '#22281b',
              borderRadius: '24px',
              padding: '36px 32px',
              minWidth: '320px',
              minHeight: '220px',
              boxShadow: '0 8px 40px 0 rgba(163,177,138,0.25), 0 2px 16px rgba(0,0,0,0.18)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsContactModalOpen(false)}
              style={{
                position: 'absolute',
                top: 12,
                right: 18,
                background: 'none',
                border: 'none',
                color: '#a3b18a',
                fontSize: '1.5rem',
                cursor: 'pointer',
                fontWeight: 700,
              }}
              aria-label="Close"
            >×</button>
            <h2 style={{ color: '#a3b18a', fontWeight: 800, fontSize: '1.5rem', marginBottom: '18px', letterSpacing: '0.03em' }}>Contact Me</h2>
            {contactSubmitted ? (
              <div style={{ color: '#dad7cd', fontWeight: 600, fontSize: '1.1rem', textAlign: 'center' }}>
                Thank you! Your message has been submitted.
              </div>
            ) : (
              <form onSubmit={handleContactFormSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={handleContactFormChange}
                  required
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1.5px solid #a3b18a',
                    fontSize: '1.08rem',
                    background: '#282b23',
                    color: '#dad7cd',
                    outline: 'none',
                  }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={contactForm.email}
                  onChange={handleContactFormChange}
                  required
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1.5px solid #a3b18a',
                    fontSize: '1.08rem',
                    background: '#282b23',
                    color: '#dad7cd',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    marginTop: '10px',
                    padding: '12px',
                    borderRadius: '10px',
                    background: '#a3b18a',
                    color: '#22281b',
                    fontWeight: 700,
                    fontSize: '1.08rem',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.18s',
                  }}
                >Submit</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Recent Reads Modal */}
      {isReadsModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(44, 54, 41, 0.25)', // subtle backdrop
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
          onClick={() => setIsReadsModalOpen(false)}
        >
          <div
            style={{
              background: 'rgba(34,40,27,0.97)',
              borderRadius: '18px',
              padding: '28px 22px',
              minWidth: '260px',
              minHeight: '180px',
              maxWidth: '350px',
              boxShadow: '0 4px 24px 0 rgba(64,255,170,0.18), 0 2px 8px rgba(0,0,0,0.18)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsReadsModalOpen(false)}
              style={{
                position: 'absolute',
                top: 8,
                right: 12,
                background: 'none',
                border: 'none',
                color: '#40ffaa',
                fontSize: '1.3rem',
                cursor: 'pointer',
                fontWeight: 700,
              }}
              aria-label="Close"
            >×</button>
            <h2 style={{ color: '#40ffaa', fontWeight: 900, fontSize: '1.2rem', marginBottom: '12px', letterSpacing: '0.03em', textShadow: '0 2px 8px #4079ff55', textAlign: 'center' }}>My Recent Reads</h2>
            <ul style={{ color: '#dad7cd', fontWeight: 600, fontSize: '1.02rem', marginBottom: '14px', textAlign: 'left', width: '100%', maxWidth: '300px', listStyle: 'inside disc' }}>
              {recentBooks.map((book, idx) => (
                <li key={idx} style={{ marginBottom: '6px', lineHeight: 1.4 }}>{book}</li>
              ))}
            </ul>
            <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
              <h4 style={{ color: '#4079ff', fontWeight: 800, fontSize: '1.02rem', marginBottom: '6px' }}>Suggest a Book! (optional)</h4>
              <form onSubmit={handleSuggestionSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Your book suggestion..."
                  value={suggestion}
                  onChange={handleSuggestionChange}
                  style={{
                    padding: '8px',
                    borderRadius: '7px',
                    border: '1.2px solid #40ffaa',
                    fontSize: '0.98rem',
                    background: '#22281b',
                    color: '#dad7cd',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '8px',
                    borderRadius: '7px',
                    background: '#4079ff',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.98rem',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.18s',
                  }}
                >Submit</button>
              </form>
              {suggestionSubmitted && (
                <div style={{ color: '#40ffaa', fontWeight: 700, marginTop: '8px', textAlign: 'center', fontSize: '0.98rem' }}>
                  Thank you for your suggestion!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Visitor Modal */}
      {isVisitorModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(44, 54, 41, 0.25)', // subtle backdrop
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
          onClick={() => setIsVisitorModalOpen(false)}
        >
          <div
            style={{
              background: 'rgba(34,40,27,0.97)',
              borderRadius: '18px',
              padding: '28px 22px',
              minWidth: '260px',
              minHeight: '180px',
              maxWidth: '350px',
              boxShadow: '0 4px 24px 0 rgba(255,179,71,0.18), 0 2px 8px rgba(0,0,0,0.18)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVisitorModalOpen(false)}
              style={{
                position: 'absolute',
                top: 8,
                right: 12,
                background: 'none',
                border: 'none',
                color: '#ffb347',
                fontSize: '1.3rem',
                cursor: 'pointer',
                fontWeight: 700,
              }}
              aria-label="Close"
            >×</button>
            <h2 style={{ color: '#ffb347', fontWeight: 900, fontSize: '1.2rem', marginBottom: '12px', letterSpacing: '0.03em', textShadow: '0 2px 8px #ff5e6255', textAlign: 'center' }}>Let me know you were here!</h2>
            <form onSubmit={handleVisitorFormSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={visitorForm.name}
                onChange={handleVisitorFormChange}
                required
                style={{
                  padding: '8px',
                  borderRadius: '7px',
                  border: '1.2px solid #ffb347',
                  fontSize: '0.98rem',
                  background: '#22281b',
                  color: '#dad7cd',
                  outline: 'none',
                }}
              />
              <input
                type="text"
                name="linkedin"
                placeholder="Your LinkedIn"
                value={visitorForm.linkedin}
                onChange={handleVisitorFormChange}
                style={{
                  padding: '8px',
                  borderRadius: '7px',
                  border: '1.2px solid #ffb347',
                  fontSize: '0.98rem',
                  background: '#22281b',
                  color: '#dad7cd',
                  outline: 'none',
                }}
              />
              <textarea
                name="feedback"
                placeholder="How did you feel about my portfolio?"
                value={visitorForm.feedback}
                onChange={handleVisitorFormChange}
                rows={2}
                style={{
                  padding: '8px',
                  borderRadius: '7px',
                  border: '1.2px solid #ffb347',
                  fontSize: '0.98rem',
                  background: '#22281b',
                  color: '#dad7cd',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '8px',
                  borderRadius: '7px',
                  background: '#ff5e62',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.98rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.18s',
                  marginTop: '4px',
                }}
              >Submit</button>
            </form>
            {visitorSubmitted && (
              <div style={{ color: '#ffb347', fontWeight: 700, marginTop: '8px', textAlign: 'center', fontSize: '0.98rem' }}>
                Thank you for your feedback!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Current Listens Modal */}
      {isListensModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(44, 54, 41, 0.25)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
          onClick={() => setIsListensModalOpen(false)}
        >
          <div
            style={{
              background: 'rgba(34,40,27,0.97)',
              borderRadius: '18px',
              padding: '28px 22px',
              minWidth: '260px',
              minHeight: '180px',
              maxWidth: '350px',
              boxShadow: '0 4px 24px 0 rgba(255,179,255,0.18), 0 2px 8px rgba(0,0,0,0.18)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsListensModalOpen(false)}
              style={{
                position: 'absolute',
                top: 8,
                right: 12,
                background: 'none',
                border: 'none',
                color: '#ff5e62',
                fontSize: '1.3rem',
                cursor: 'pointer',
                fontWeight: 700,
              }}
              aria-label="Close"
            >×</button>
            <h2 style={{ color: '#ff5e62', fontWeight: 900, fontSize: '1.2rem', marginBottom: '12px', letterSpacing: '0.03em', textShadow: '0 2px 8px #ffb34755', textAlign: 'center' }}>Current Listens</h2>
            <ul style={{ color: '#dad7cd', fontWeight: 600, fontSize: '1.02rem', marginBottom: '14px', textAlign: 'left', width: '100%', maxWidth: '300px', listStyle: 'inside disc' }}>
              {currentSongs.map((song, idx) => (
                <li key={idx} style={{ marginBottom: '6px', lineHeight: 1.4 }}>{song}</li>
              ))}
            </ul>
            <div style={{ margin: '0 auto', marginTop: 10 }}>
              <HelloKitty />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
