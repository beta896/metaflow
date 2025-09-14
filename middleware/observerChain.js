// observerChain.js — Modular Observer Chain

export function primaryObserver(data) {
  console.log('[observer:primary]', data);
  secondaryObserver(data);
}

function secondaryObserver(data) {
  console.log('[observer:secondary]', data);
  metaObserver(data);
}

function metaObserver(data) {
  console.log('[observer:meta]', data);
}
