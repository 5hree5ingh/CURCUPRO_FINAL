import './ShinyText.css';

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
  const animationDuration = `${speed}s`;
  const animationDelay = `${delay}s`;
  const animationDirection = yoyo ? 'alternate' : 'normal';

  const gradientStyle = {
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
      className={`shiny-text ${disabled ? 'shiny-text--disabled' : ''} ${pauseOnHover ? 'shiny-text--pause-hover' : ''} ${className}`}
      style={gradientStyle}
    >
      {text}
    </span>
  );
};

export default ShinyText;
