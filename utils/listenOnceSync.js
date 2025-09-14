// listenOnceSync.js

/**
 * Logs a list item to a symbolic location for cockpit tracking.
 * @param {Object} item - The item to log.
 * @param {string} location - The symbolic location tag.
 */
export function LogListItemToLocation(item, location) {
  const output = {
    location,
    timestamp: new Date().toISOString(),
    payload: item
  };

  console.log(?? [], JSON.stringify(output, null, 2));
}
