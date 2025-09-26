import routes from "../data/routesMap.json";
export default function RouteMap() {
  return (
    <div>
      <h2>📦 Route Map</h2>
      {routes.map((route, index) => (
        <div key={index}>
          <strong>{route.method}</strong> {route.path} — Middleware: {route.middleware.join(", ")}
        </div>
      ))}
    </div>
  );
}
