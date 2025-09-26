export const trackConversion = async (data) => {
  await fetch("http://localhost:3001/track-conversion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
