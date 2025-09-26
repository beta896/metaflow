import React from 'react';
import { trackConversion } from '../../utils/tracking';

export default function ConversionButton() {
  return (
    <button onClick={() => trackConversion({ offerId: 'xyz', userRole: 'guest' })}>
      Track Offer
    </button>
  );
}
