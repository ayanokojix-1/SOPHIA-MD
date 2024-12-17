const config = require('../config');

/**
 * Returns the handler prefix after applying the rules:
 * - If the handler is "null" (string), treat it as an empty string.
 * - Otherwise, return the handler as defined in the config.
 */
function getHandler() {
  const handler = config.HANDLER?.trim().toLowerCase(); // Normalize the handler
  return handler === 'null' ? '' : handler; // Treat "null" as no prefix
}

/**
 * Returns a normalized regex to match commands:
 * - Supports optional spaces before/after the handler.
 * - Allows users to mistype spaces after the handler.
 * @param {string} handler - The handler prefix (e.g., "." or "#").
 * @param {string} commandName - The command name to match.
 * @returns {RegExp} A regex to match the command.
 */
function getCommandRegex(handler, commandName) {
  return new RegExp(`^\\s*${handler}\\s*${commandName}\\s*$`, 'i'); // Tolerates spaces
}

module.exports = { getHandler, getCommandRegex };
