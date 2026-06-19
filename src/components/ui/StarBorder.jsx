import './StarBorder.css';

const StarBorder = ({
  color = '#d08f30',
  speed = '4s',
  className = '',
}) => {
  return (
    <div
      className={`star-border-line ${className}`}
      style={{
        '--star-color': color,
        '--star-speed': speed,
      }}
    />
  );
};

export default StarBorder;
