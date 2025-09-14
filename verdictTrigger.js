async function submitVerdict() {
  const payload = {
    symbol: 'AUDUSD',
    verdict: 'Hold',
    capital: 1000,
    entry: 1.2345,
    stop: 1.2300,
    target: 1.2400,
    hold: 'Waiting for breakout',
    date: new Date().toISOString(),
    link: 'https://tradingview.com/chart',
    mvp: 'Live',
    backend: 'Stable',
    logic: 'Confirmed'
  };

  const res = await fetch('http://localhost:3000/api/verdict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const result = await res.json();
  console.log(result);
}

submitVerdict();
