import './ShinyText.css';
import { useState, useEffect } from 'react';

const ShinyText = ({
  text,
  disabled = false,
  speed = 2,
  className = '',
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = 'left',
  delay = 0
}) => {
  const [isStatic, setIsStatic] = useState(false);

  useEffect(() => {
    // Match the same checks as the CSS media queries + low-end-device class
    const isSmallScreen = window.innerWidth <= 768;
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasLowEndClass = document.documentElement.classList.contains('low-end-device');
    setIsStatic(isSmallScreen || isMobileUA || reducedMotion || hasLowEndClass);
  }, []);

  const animationDuration = `${speed}s`;
  const animationDelay = `${delay}s`;
  const animationDirection = yoyo ? 'alternate' : 'normal';

  // On mobile/low-end: render as plain solid text (no gradient trick)
  const style = isStatic
    ? { color }
    : {
        backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animationDuration,
        animationDelay,
        animationDirection,
        '--shine-direction': direction === 'left' ? 'normal' : 'reverse',
      };

  return (
    <span
      className={`${isStatic ? '' : 'shiny-text'} ${disabled ? 'shiny-text--disabled' : ''} ${pauseOnHover ? 'shiny-text--pause-hover' : ''} ${className}`}
      style={style}
    >
      {text}
    </span>
  );
};

export default ShinyText;
