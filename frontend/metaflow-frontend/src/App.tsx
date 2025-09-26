import OfferVerdict from './modules/offers/OfferVerdict';

const sampleProfile = {
  followers: 875,
  engagementRate: 0.82,
  socials: ['Instagram'],
};

function App() {
  return (
    <div>
      <h1>Metaflow Offer Engine</h1>
      <OfferVerdict profile={sampleProfile} />
    </div>
  );
}

export default App;
