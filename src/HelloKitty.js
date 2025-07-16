import React, { useState } from 'react';

export default function HelloKitty() {
  const [hovered, setHovered] = useState(false);
  
  // Main container
  const kittyStyles = {
    position: 'relative', 
    width: 120, 
    height: 150, 
    margin: '0 auto',
    cursor: 'pointer',
    transform: hovered ? 'scale(1.05)' : 'scale(1)',
    transition: 'transform 0.2s ease'
  };
  
  // Tooltip styles
  const tooltipStyles = {
    position: 'absolute',
    left: '50%',
    top: -40,
    transform: 'translateX(-50%)',
    background: '#fff',
    color: '#ff69b4',
    fontWeight: 700,
    fontSize: '0.9rem',
    padding: '8px 16px',
    borderRadius: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    border: '2px solid #ff69b4',
    whiteSpace: 'nowrap',
    zIndex: 10,
    pointerEvents: 'none',
    opacity: hovered ? 1 : 0,
    transition: 'opacity 0.3s ease',
  };
  
  // Head (adjusted for smaller size)
  const headStyles = {
    position: 'absolute', 
    top: 30, 
    left: 15, 
    width: 90, 
    height: 75, 
    background: '#ffffff', 
    border: '3px solid #000', 
    borderRadius: '45px 45px 40px 40px',
    zIndex: 2,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };
  
  // Left ear (adjusted for smaller size)
  const leftEarStyles = {
    position: 'absolute', 
    top: -12, 
    left: -8, 
    width: 28, 
    height: 32, 
    background: '#ffffff', 
    border: '3px solid #000', 
    borderBottomColor: 'transparent',
    borderRadius: '15px 12px 4px 15px',
    zIndex: 1,
    transform: 'rotate(-10deg)'
  };
  
  // Right ear (adjusted for smaller size)
  const rightEarStyles = {
    position: 'absolute', 
    top: -12, 
    left: 70, 
    width: 28, 
    height: 32, 
    background: '#ffffff', 
    border: '3px solid #000', 
    borderBottomColor: 'transparent',
    borderRadius: '12px 15px 15px 4px',
    zIndex: 1,
    transform: 'rotate(10deg)'
  };
  
  // Face container
  const faceStyles = { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%' 
  };
  
  // Eyes (adjusted for smaller size)
  const eyeStyles = { 
    position: 'absolute', 
    width: 8, 
    height: 10, 
    background: '#000', 
    borderRadius: '50%' 
  };
  const leftEyeStyles = { ...eyeStyles, top: 25, left: 22 };
  const rightEyeStyles = { ...eyeStyles, top: 25, left: 60 };
  
  // Nose (adjusted for smaller size)
  const noseStyles = { 
    position: 'absolute', 
    top: 35, 
    left: 40, 
    width: 8, 
    height: 5, 
    background: '#FFD700', 
    border: '2px solid #000', 
    borderRadius: '50%' 
  };
  
  // Whiskers (adjusted for smaller size)
  const whiskerStyles = { 
    position: 'absolute', 
    width: 20, 
    height: 2, 
    background: '#000', 
    borderRadius: '1px' 
  };
  
  const whiskers = [
    { top: 30, left: -3, rotate: -20 },
    { top: 36, left: -3, rotate: -10 },
    { top: 42, left: -3, rotate: 0 },
    { top: 30, left: 73, rotate: 20 },
    { top: 36, left: 73, rotate: 10 },
    { top: 42, left: 73, rotate: 0 },
  ];
  
  // Bow (adjusted for smaller size)
  const bowCenter = { 
    position: 'absolute', 
    top: 3, 
    left: 65, 
    width: 14, 
    height: 14, 
    background: '#FF1744', 
    border: '3px solid #000', 
    borderRadius: '50%',
    zIndex: 3 
  };
  
  const bowLeft = { 
    position: 'absolute', 
    top: -1, 
    left: 55, 
    width: 16, 
    height: 20, 
    background: '#FF1744', 
    border: '3px solid #000', 
    borderRadius: '50% 20% 20% 50%',
    zIndex: 2,
    transform: 'rotate(-25deg)' 
  };
  
  const bowRight = { 
    position: 'absolute', 
    top: -1, 
    left: 73, 
    width: 16, 
    height: 20, 
    background: '#FF1744', 
    border: '3px solid #000', 
    borderRadius: '20% 50% 50% 20%',
    zIndex: 2,
    transform: 'rotate(25deg)' 
  };
  
  // Body (adjusted for smaller size)
  const bodyStyles = { 
    position: 'absolute', 
    top: 95, 
    left: 40, 
    width: 40, 
    height: 35, 
    background: '#FF1744', 
    border: '3px solid #000', 
    borderRadius: '20px 20px 15px 15px',
    zIndex: 1 
  };
  
  // Arms (adjusted for smaller size)
  const leftArm = { 
    position: 'absolute', 
    top: 105, 
    left: 18, 
    width: 20, 
    height: 16, 
    background: '#ffffff', 
    border: '3px solid #000', 
    borderRadius: '12px',
    transform: 'rotate(-15deg)',
    zIndex: 1
  };
  
  const rightArm = { 
    position: 'absolute', 
    top: 105, 
    left: 82, 
    width: 20, 
    height: 16, 
    background: '#ffffff', 
    border: '3px solid #000', 
    borderRadius: '12px',
    transform: 'rotate(15deg)',
    zIndex: 1
  };
  
  // Legs (adjusted for smaller size)
  const leftLeg = { 
    position: 'absolute', 
    top: 125, 
    left: 45, 
    width: 15, 
    height: 20, 
    background: '#ffffff', 
    border: '3px solid #000', 
    borderRadius: '10px',
    transform: 'rotate(-5deg)',
    zIndex: 1
  };
  
  const rightLeg = { 
    position: 'absolute', 
    top: 125, 
    left: 60, 
    width: 15, 
    height: 20, 
    background: '#ffffff', 
    border: '3px solid #000', 
    borderRadius: '10px',
    transform: 'rotate(5deg)',
    zIndex: 1
  };

  return (
    <div
      id="kitty"
      style={kittyStyles}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={tooltipStyles}>Hello there, nice to meet you!</div>
      
      {/* Head */}
      <div id="head" style={headStyles}>
        <div id="leftear" style={leftEarStyles}></div>
        <div id="rightear" style={rightEarStyles}></div>
        
        {/* Face */}
        <div id="face" style={faceStyles}>
          <div className="lefteye" style={leftEyeStyles}></div>
          <div className="righteye" style={rightEyeStyles}></div>
          <div className="nose" style={noseStyles}></div>
          {whiskers.map((w, i) => (
            <div 
              key={i} 
              style={{ 
                ...whiskerStyles, 
                top: w.top, 
                left: w.left, 
                transform: `rotate(${w.rotate}deg)` 
              }} 
            />
          ))}
        </div>
        
        {/* Bow */}
        <div style={bowLeft}></div>
        <div style={bowCenter}></div>
        <div style={bowRight}></div>
      </div>
      
      {/* Body */}
      <div id="body" style={bodyStyles}></div>
      
      {/* Arms */}
      <div id="leftarm" style={leftArm}></div>
      <div id="rightarm" style={rightArm}></div>
      
      {/* Legs */}
      <div id="leftleg" style={leftLeg}></div>
      <div id="rightleg" style={rightLeg}></div>
    </div>
  );
}