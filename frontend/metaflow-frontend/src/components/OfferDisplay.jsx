import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OfferDisplay = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios.get('/api/offers')
      .then(res => setOffers(res.data.offers))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Active Offers</h2>
      <ul>
        {offers.map(offer => (
          <li key={offer.id}>
            <strong>{offer.campaignName}</strong> by {offer.issuerName} — {offer.contractStatus}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfferDisplay;
