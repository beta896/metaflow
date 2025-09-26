import React, { useEffect, useState } from "react";

export default function OfferMatchPanel() {
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/offer-match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product: "Wireless Earbuds",
        region: "Egypt",
        link: "https://metaflow.link/earbuds123",
        commission: "12%",
        assignedTo: "creator@buzzflow.io",
        lifeCycleTag: "LCT-ACTIVE"
      })
    })
      .then(res => res.json())
      .then(data => setOffer(data.offer));
  }, []);

  return (
    <div>
      <h3>🔵 Offer Match Panel</h3>
      {offer ? (
        <ul>
          <li>Product: {offer.product}</li>
          <li>Region: {offer.region}</li>
          <li>Link: <a href={offer.link}>{offer.link}</a></li>
          <li>Commission: {offer.commission}</li>
          <li>Assigned To: {offer.assignedTo}</li>
          <li>Tag: {offer.lifeCycleTag}</li>
          <li>Encrypted: {offer.encryptedTag}</li>
          <li>Timestamp: {new Date(offer.timestamp).toLocaleString()}</li>
        </ul>
      ) : (
        <p>Loading offer...</p>
      )}
    </div>
  );
}
