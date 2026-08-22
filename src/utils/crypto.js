/**
 * Security & Cryptography Utilities
 */

/**
 * Computes SHA-256 hash of a string combined with a salt using Web Crypto API.
 * @param {string} text 
 * @param {string} salt 
 * @returns {Promise<string>} Hex-encoded SHA-256 hash
 */
export async function hashPassword(text, salt = '') {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Escapes potentially dangerous characters from user input before HTML rendering
 * @param {any} value 
 * @returns {string} Sanitized string
 */
export function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
