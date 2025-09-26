import timeline from "../data/timeline.json";
export default function Timeline() {
  return (
    <div>
      <h2>🕰️ Symbolic Timeline</h2>
      {timeline.map((event, index) => (
        <div key={index}>
          {event.label} at {new Date(event.timestamp).toLocaleString()}
        </div>
      ))}
    </div>
  );
}
