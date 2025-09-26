import { useEffect, useState } from 'react';

const API_URL = 'https://your-affiliate-api.com/offers'; // Replace with real endpoint

export const useOffers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setOffers(data))
      .catch(() => setOffers([]));
  }, []);

  const trackClick = (offerId) => {
    fetch(`https://your-tracking-endpoint.com/click/${offerId}`, {
      method: 'POST',
    });
  };

  const trackImpression = (offerId) => {
    fetch(`https://your-tracking-endpoint.com/impression/${offerId}`, {
      method: 'POST',
    });
  };

  return { offers, trackClick, trackImpression };
};