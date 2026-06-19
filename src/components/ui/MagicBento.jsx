import './MagicBento.css';

const cardData = [
  {
    title: 'Pharmaceuticals',
    description: 'Anti-inflammatory APIs · Oncology adjuvants · Nano-curcumin delivery systems',
    label: 'Pharma Grade',
    icon: 'pharma'
  },
  {
    title: 'Nutraceuticals',
    description: 'Capsules · Tablets · Softgels · Effervescents · Powders',
    label: 'Nutra Grade',
    icon: 'nutra'
  },
  {
    title: 'Cosmetics & Personal Care',
    description: 'Anti-aging serums · Brightening creams · Sunscreens · Topical absorption optimized',
    label: 'Personal Care',
    icon: 'cosmetics'
  },
  {
    title: 'Food & Beverage',
    description: 'E100 natural colorant · Beverages · Dairy · Bakery · Confectionery',
    label: 'Food Grade',
    icon: 'food'
  },
  {
    title: 'Animal Nutrition',
    description: 'Poultry growth · Antioxidant feed additive · Gut health enhancement',
    label: 'Feed Grade',
    icon: 'animal'
  }
];

const renderIcon = (type) => {
  switch (type) {
    case 'pharma':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#b0741a" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 9v6M9 12h6" strokeWidth="1.5" />
        </svg>
      );
    case 'nutra':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#b0741a" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 21 3c-1.4 4-2 5.5-3.1 11.2A7 7 0 0 1 11 20z" />
          <path d="M9 15l7-7" strokeWidth="1" />
        </svg>
      );
    case 'cosmetics':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#b0741a" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z" />
          <path d="M12 18.5a3.5 3.5 0 0 0 3-3.5" opacity="0.6" />
        </svg>
      );
    case 'food':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#b0741a" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M3 17h18a1 1 0 0 0 1-1c0-4.25-3.5-7.5-8-7.5s-8 3.25-8 7.5a1 1 0 0 0 1 1z" />
          <path d="M12 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
          <path d="M2 19.5h20" />
        </svg>
      );
    case 'animal':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#b0741a" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 22V2" strokeWidth="1" />
          <path d="M12 18c-2.2-1.5-2.5-3.5-1-5 1.5 1.5 1 4.5 1 5z" fill="#b0741a" fillOpacity="0.1" />
          <path d="M12 18c2.2-1.5 2.5-3.5 1-5-1.5 1.5-1 4.5-1 5z" fill="#b0741a" fillOpacity="0.1" />
          <path d="M12 13c-2.2-1.5-2.5-3.5-1-5 1.5 1.5 1 4.5 1 5z" fill="#b0741a" fillOpacity="0.1" />
          <path d="M12 13c2.2-1.5 2.5-3.5 1-5-1.5 1.5-1 4.5-1 5z" fill="#b0741a" fillOpacity="0.1" />
          <path d="M12 8c-2.2-1.5-2.5-3.5-1-5 1.5 1.5 1 4.5 1 5z" fill="#b0741a" fillOpacity="0.1" />
          <path d="M12 8c2.2-1.5 2.5-3.5 1-5-1.5 1.5-1 4.5-1 5z" fill="#b0741a" fillOpacity="0.1" />
        </svg>
      );
    default:
      return null;
  }
};

const MagicBento = () => (
  <div className="card-grid bento-section">
    {cardData.map((card, index) => (
      <div key={index} className="magic-bento-card">
        <div className="magic-bento-card__header">
          <div className="magic-bento-card__label-container">
            <div className="magic-bento-card__label">{card.label}</div>
            <div className="magic-bento-card__line"></div>
          </div>
        </div>
        <div className="magic-bento-card__icon-badge">
          {renderIcon(card.icon)}
        </div>
        <div className="magic-bento-card__content">
          <h2 className="magic-bento-card__title">{card.title}</h2>
          <p className="magic-bento-card__description">{card.description}</p>
        </div>
      </div>
    ))}
  </div>
);

export default MagicBento;
