import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginScreen from './Login';

// Keyframes for slower wave animation
const waveAnimation = keyframes`
  0%, 100% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
`;

// Styled component for the splash screen
const SplashContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red; /* Set the background color to red */
  background-image: linear-gradient(45deg, transparent 20%, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.2) 40%, transparent 40%, transparent 60%, rgba(255, 255, 255, 0.2) 60%, rgba(255, 255, 255, 0.2) 80%, transparent 80%);
  background-size: 300% 100%; /* Slow down the wave animation */
  animation: ${waveAnimation} 10s linear infinite; /* Slow down animation duration */
  transition: opacity 1s; /* Add transition for opacity */
`;

const SplashScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div>
      <SplashContainer style={{ opacity: loading ? 1 : 0 }}>
        <CircularProgress style={{ color: 'white' }} size={80} thickness={6} />
      </SplashContainer>
      {!loading && (
        <div
          style={{
            opacity: 1,
            transition: 'opacity 5s', // Longer transition time
          }}
        >
          <LoginScreen />
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
