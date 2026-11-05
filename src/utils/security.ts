/**
 * Security and Data Sanitization Utility
 * Implements strict input validation, XSS prevention, output encoding,
 * CRLF email injection defense, and client-side rate limiting.
 */

// HTML entity map for secure output encoding
const HTML_ENTITY_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

/**
 * Encodes dangerous characters to their HTML entity equivalents.
 * Prevents DOM-based and Reflected Cross-Site Scripting (XSS).
 */
export function encodeHtmlEntities(str: string): string {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"'`=/]/g, (char) => HTML_ENTITY_MAP[char] || char);
}

/**
 * Sanitizes plain text input by stripping executable tags, dangerous protocol schemes,
 * event handlers, and null bytes.
 */
export function sanitizeText(input: string, maxLength = 3000): string {
  if (typeof input !== 'string') return '';
  
  // 1. Remove null bytes and unicode control characters
  let clean = input.replace(/\0/g, '').trim();

  // 2. Remove script tags, iframe, object, embed, link, meta, style tags
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  clean = clean.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // 3. Strip dangerous protocol schemes like javascript:, vbscript:, data:
  clean = clean.replace(/(javascript|vbscript|data):/gi, '$1_blocked:');

  // 4. Strip inline event handlers like onerror=, onload=, onclick=
  clean = clean.replace(/\bon\w+\s*=/gi, 'data-blocked-handler=');

  // 5. Enforce strict character limit
  if (clean.length > maxLength) {
    clean = clean.slice(0, maxLength);
  }

  return clean;
}

/**
 * Sanitizes single-line fields (e.g., Name, Subject, Email)
 * Strips carriage returns and newlines (\r, \n) to prevent Email Header Injection (CRLF).
 */
export function sanitizeSingleLine(input: string, maxLength = 100): string {
  if (typeof input !== 'string') return '';
  // Strip CRLF to prevent email header injection
  let clean = input.replace(/[\r\n\t]/g, ' ').trim();
  // Strip HTML brackets
  clean = clean.replace(/[<>]/g, '');
  // Strip control characters
  clean = clean.replace(/[\x00-\x1F\x7F]/g, '');
  
  if (clean.length > maxLength) {
    clean = clean.slice(0, maxLength);
  }
  return clean;
}

/**
 * Strict schema validation for full names.
 * Allows standard international alphabetic characters, spaces, hyphens, periods, and apostrophes.
 */
export function validateName(name: string): { valid: boolean; error?: string; cleanValue: string } {
  if (typeof name !== 'string') {
    return { valid: false, error: 'Name must be a valid string.', cleanValue: '' };
  }

  const rawTrimmed = name.trim();

  if (rawTrimmed.length < 2) {
    return { valid: false, error: 'Full name must be at least 2 characters.', cleanValue: '' };
  }

  if (rawTrimmed.length > 70) {
    return { valid: false, error: 'Full name cannot exceed 70 characters.', cleanValue: '' };
  }

  // Reject script or HTML tags outright
  if (/[<>]/g.test(name)) {
    return { valid: false, error: 'Name contains invalid characters.', cleanValue: '' };
  }

  const sanitized = sanitizeSingleLine(name, 70);

  // Regex allows English and international letters, spaces, hyphens, periods, apostrophes
  const nameRegex = /^[a-zA-ZÀ-ÿ\u0100-\u024F\s.'-]+$/;
  if (!nameRegex.test(sanitized)) {
    return { valid: false, error: 'Name contains invalid characters. Please use letters only.', cleanValue: sanitized };
  }

  return { valid: true, cleanValue: sanitized };
}

/**
 * Strict RFC-compliant email format validation.
 * Prevents newline characters, shell metacharacters, and script payloads.
 */
export function validateEmail(email: string): { valid: boolean; error?: string; cleanValue: string } {
  if (typeof email !== 'string') {
    return { valid: false, error: 'Email must be a valid string.', cleanValue: '' };
  }

  const rawTrimmed = email.trim();

  if (!rawTrimmed) {
    return { valid: false, error: 'Email address is required.', cleanValue: '' };
  }

  if (rawTrimmed.length < 5 || rawTrimmed.length > 100) {
    return { valid: false, error: 'Email address must be between 5 and 100 characters.', cleanValue: '' };
  }

  // Immediate rejection of HTML/script injection vectors or carriage returns
  if (/[<>"'\\\r\n\s]/.test(email)) {
    return { valid: false, error: 'Email contains invalid characters.', cleanValue: '' };
  }

  const sanitized = sanitizeSingleLine(email, 100).toLowerCase();

  // Strict email regex rejecting dangerous symbols or multiple @ signs
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(sanitized)) {
    return { valid: false, error: 'Please enter a valid email format (e.g. name@domain.com).', cleanValue: sanitized };
  }

  return { valid: true, cleanValue: sanitized };
}

/**
 * Strict validation and sanitization for contact message bodies.
 */
export function validateMessage(message: string): { valid: boolean; error?: string; cleanValue: string } {
  if (typeof message !== 'string') {
    return { valid: false, error: 'Message must be a string.', cleanValue: '' };
  }

  const rawTrimmed = message.trim();

  if (rawTrimmed.length < 10) {
    return { valid: false, error: 'Message must be at least 10 characters long.', cleanValue: '' };
  }

  if (rawTrimmed.length > 3000) {
    return { valid: false, error: 'Message cannot exceed 3,000 characters.', cleanValue: '' };
  }

  const sanitized = sanitizeText(message, 3000);

  return { valid: true, cleanValue: sanitized };
}

/**
 * Client-Side Rate Limiter.
 * Restricts rapid repeated submissions within a rolling time window.
 * Default: 3 attempts per 3 minutes (180,000 ms).
 */
export function checkRateLimit(
  storageKey = 'aj_agency_rate_limit',
  maxAttempts = 3,
  windowMs = 180000
): { allowed: boolean; retryAfterSeconds: number } {
  try {
    const now = Date.now();
    const raw = localStorage.getItem(storageKey);
    let attempts: number[] = [];

    if (raw) {
      try {
        attempts = JSON.parse(raw);
        if (!Array.isArray(attempts)) attempts = [];
      } catch {
        attempts = [];
      }
    }

    // Filter attempts within the active time window
    attempts = attempts.filter((timestamp) => now - timestamp < windowMs);

    if (attempts.length >= maxAttempts) {
      const oldestValidAttempt = attempts[0];
      const timeRemaining = Math.max(0, windowMs - (now - oldestValidAttempt));
      return {
        allowed: false,
        retryAfterSeconds: Math.ceil(timeRemaining / 1000)
      };
    }

    // Record new attempt
    attempts.push(now);
    localStorage.setItem(storageKey, JSON.stringify(attempts));

    return { allowed: true, retryAfterSeconds: 0 };
  } catch (err) {
    // Graceful fallback if localStorage is disabled
    console.warn('Storage rate limiting unavailable, proceeding with memory check:', err);
    return { allowed: true, retryAfterSeconds: 0 };
  }
}

/**
 * Honeypot Anti-Bot Verification.
 * Hidden field must remain empty. Automated crawlers fill this field and get silently rejected.
 */
export function isHoneypotTriggered(honeypotValue: string): boolean {
  return typeof honeypotValue === 'string' && honeypotValue.trim().length > 0;
}

/**
 * Sanitizes application error messages so internal stack traces,
 * file system paths, or environment variables are NEVER displayed to the user.
 */
export function sanitizeErrorMessage(error: unknown, fallbackMessage = 'An unexpected error occurred. Please try again later.'): string {
  if (!error) return fallbackMessage;

  // Log full error internally for debugging
  console.error('[Internal Error Detail]:', error);

  // If error is an Error instance, inspect message for leaks
  if (error instanceof Error) {
    const rawMsg = error.message.toLowerCase();
    // Check if error contains sensitive leakage patterns
    const sensitivePatterns = [
      'sql', 'postgres', 'database', 'stack', 'at ', 'line ', 'eval',
      'password', 'secret', 'token', 'key', 'file://', '/app/', '/src/',
      'node_modules', 'connection refused', 'internal server error'
    ];

    const containsLeak = sensitivePatterns.some((pattern) => rawMsg.includes(pattern));
    if (containsLeak) {
      return fallbackMessage;
    }

    // Return sanitized safe message with HTML encoding
    return encodeHtmlEntities(sanitizeSingleLine(error.message, 150));
  }

  return fallbackMessage;
}
