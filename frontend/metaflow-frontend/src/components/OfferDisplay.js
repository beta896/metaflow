import React, { useEffect } from 'react';
import { useOffers } from '../hooks/useOffers';

const OfferDisplay = () => {
  const { offers, trackClick, trackImpression } = useOffers();

  useEffect(() => {
    offers.forEach(offer => trackImpression(offer.id));
  }, [offers]);

  return (
    <div>
      <h2>Live Affiliate Offers</h2>
      {offers.map(offer => (
        <div key={offer.id} className="offer-card">
          <h3>{offer.title}</h3>
          <p>Payout: </p>
          <a href={offer.link} target="_blank" rel="noopener noreferrer" onClick={() => trackClick(offer.id)}>
            Convert Now
          </a>
        </div>
      ))}
    </div>
  );
};

export default OfferDisplay;
