"use client";

import React from 'react';

interface AnimatedButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  textColor?: string;
  borderColor?: string;
  circleColor?: string;
  arrowColor?: string;
  hoverTextColor?: string;
  hoverArrowColor?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  text = 'Démarrer un projet',
  onClick,
  className = '',
  textColor = '#ffffff',
  borderColor = '#ffffff',
  circleColor = '#ffffff',
  arrowColor = '#ffffff',
  hoverTextColor = '#1a3a52',
  hoverArrowColor = '#1a3a52',
}) => {
  return (
    <>
      <style jsx>{`
        .animated-button {
          position: relative;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 16px 36px;
          border: 4px solid;
          border-color: transparent;
          font-size: 16px;
          background-color: inherit;
          border-radius: 100px;
          font-weight: 600;
          color: ${textColor};
          box-shadow: 0 0 0 2px ${borderColor};
          cursor: pointer;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          font-family: 'Hubot Sans', 'Inter', sans-serif;
        }

        .animated-button svg {
          position: absolute;
          width: 24px;
          fill: ${arrowColor};
          z-index: 9;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button .arr-1 {
          right: 16px;
        }

        .animated-button .arr-2 {
          left: -25%;
        }

        .animated-button .circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background-color: ${circleColor};
          border-radius: 50%;
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button .text {
          position: relative;
          z-index: 1;
          transform: translateX(-12px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button:hover {
          box-shadow: 0 0 0 12px transparent;
          color: ${hoverTextColor};
          border-radius: 12px;
        }

        .animated-button:hover .arr-1 {
          right: -25%;
        }

        .animated-button:hover .arr-2 {
          left: 16px;
        }

        .animated-button:hover .text {
          transform: translateX(12px);
        }

        .animated-button:hover svg {
          fill: ${hoverArrowColor};
        }

        .animated-button:active {
          scale: 0.95;
          box-shadow: 0 0 0 4px ${borderColor};
        }

        .animated-button:hover .circle {
          width: 220px;
          height: 220px;
          opacity: 1;
        }
      `}</style>

      <button className={`animated-button ${className}`} onClick={onClick}>
        <svg
          viewBox="0 0 24 24"
          className="arr-2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
        </svg>
        <span className="text">{text}</span>
        <span className="circle"></span>
        <svg
          viewBox="0 0 24 24"
          className="arr-1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
        </svg>
      </button>
    </>
  );
};

export default AnimatedButton;
