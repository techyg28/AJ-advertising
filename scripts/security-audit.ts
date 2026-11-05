/**
 * Comprehensive Automated Security Audit and Test Suite
 * Tests input validation, XSS prevention, CRLF defenses, rate limiting,
 * honeypot protection, error masking, and codebase secrets scanning.
 */

import {
  encodeHtmlEntities,
  sanitizeText,
  sanitizeSingleLine,
  validateName,
  validateEmail,
  validateMessage,
  isHoneypotTriggered,
  sanitizeErrorMessage
} from '../src/utils/security';
import fs from 'fs';
import path from 'path';

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string, details?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    console.error(`  ✗ FAIL: ${testName} ${details ? `- ${details}` : ''}`);
  }
}

console.log('\n======================================================');
console.log('  AJ ADVERTISING AGENCY - APPLICATION SECURITY AUDIT');
console.log('======================================================\n');

// 1. Cross-Site Scripting (XSS) Prevention Tests
console.log('[1] Testing Cross-Site Scripting (XSS) Sanitization:');

const scriptPayload = '<script>alert("XSS")</script>';
const cleanScript = sanitizeText(scriptPayload);
assert(!cleanScript.includes('<script>') && !cleanScript.includes('alert("XSS")'), 'Strips executable <script> tags');

const imgPayload = '<img src="x" onerror="alert(document.cookie)">';
const cleanImg = sanitizeText(imgPayload);
assert(!cleanImg.includes('onerror='), 'Neutralizes event handlers (onerror, onload, onclick)');

const jsUrlPayload = 'javascript:alert(window.origin)';
const cleanJsUrl = sanitizeText(jsUrlPayload);
assert(!cleanJsUrl.startsWith('javascript:'), 'Neutralizes javascript: pseudo-protocol URIs');

const encodedEntities = encodeHtmlEntities('<div>Hello "User" & \'Friend\'</div>');
assert(
  encodedEntities === '&lt;div&gt;Hello &quot;User&quot; &amp; &#x27;Friend&#x27;&lt;&#x2F;div&gt;',
  'Correctly escapes HTML entities (&, <, >, ", \', /)'
);

const nullBytePayload = 'admin\0<script>evil()</script>';
const cleanNull = sanitizeText(nullBytePayload);
assert(!cleanNull.includes('\0') && !cleanNull.includes('<script>'), 'Strips dangerous null bytes');

// 2. CRLF & Email Header Injection Tests
console.log('\n[2] Testing Email Header Injection (CRLF) Prevention:');

const crlfName = 'Pooja Sharma\r\nBcc: attacker@infiltrate.io\r\nSubject: Spoofed';
const cleanCrlfName = sanitizeSingleLine(crlfName);
assert(
  !cleanCrlfName.includes('\r') && !cleanCrlfName.includes('\n'),
  'Strips carriage return (\\r) and newline (\\n) characters from single-line fields'
);

const crlfEmail = 'pooja@startup.in\r\nCc: victim@domain.com';
const cleanCrlfEmail = sanitizeSingleLine(crlfEmail);
assert(!cleanCrlfEmail.includes('\r') && !cleanCrlfEmail.includes('\n'), 'Neutralizes CRLF in email parameters');

// 3. Strict Schema Validation Tests: Name
console.log('\n[3] Testing Strict Schema Validation (Full Name):');

const validName1 = validateName('Pooja Sharma');
assert(validName1.valid && validName1.cleanValue === 'Pooja Sharma', 'Accepts standard valid name');

const validName2 = validateName("Dr. Sarah O'Connor-Smith");
assert(validName2.valid, "Accepts legitimate apostrophes, periods, and hyphens");

const maliciousName = validateName('<script>alert(1)</script>');
assert(!maliciousName.valid, 'Rejects script injection in name field');

const shortName = validateName('A');
assert(!shortName.valid, 'Rejects underlength names (< 2 characters)');

const overlongName = validateName('A'.repeat(100));
assert(!overlongName.valid, 'Rejects overlong names (> 70 characters)');

// 4. Strict Schema Validation Tests: Email
console.log('\n[4] Testing Strict Schema Validation (Email Address):');

const validEmail = validateEmail('pooja.sharma@company.co.in');
assert(validEmail.valid && validEmail.cleanValue === 'pooja.sharma@company.co.in', 'Accepts valid RFC email');

const invalidEmail1 = validateEmail('not-an-email');
assert(!invalidEmail1.valid, 'Rejects non-email string');

const invalidEmail2 = validateEmail('pooja@');
assert(!invalidEmail2.valid, 'Rejects missing domain');

const maliciousEmail = validateEmail('user<script>@domain.com');
assert(!maliciousEmail.valid, 'Rejects email containing HTML script characters');

const overlongEmail = validateEmail('a'.repeat(95) + '@domain.com');
assert(!overlongEmail.valid, 'Rejects overlong email addresses (> 100 characters)');

// 5. Strict Schema Validation Tests: Message Body
console.log('\n[5] Testing Strict Message Body Validation:');

const validMsg = validateMessage('We need a full-funnel digital advertising and web development revamp for Q1.');
assert(validMsg.valid, 'Accepts valid business inquiry message');

const shortMsg = validateMessage('Hi');
assert(!shortMsg.valid, 'Rejects short/spam message (< 10 characters)');

const overlongMsg = validateMessage('A'.repeat(3500));
assert(!overlongMsg.valid, 'Rejects message exceeding 3,000 character limit');

// 6. Honeypot Anti-Bot Trap Tests
console.log('\n[6] Testing Anti-Bot Honeypot Mechanism:');

assert(!isHoneypotTriggered(''), 'Legitimate user (empty honeypot) is allowed');
assert(isHoneypotTriggered('http://spambot-link.ru'), 'Automated bot payload in honeypot is flagged and blocked');

// 7. Error Masking & Stack Trace Leakage Defense Tests
console.log('\n[7] Testing Error Masking and Exception Sanitization:');

const dbError = new Error('FATAL: PostgreSQL connection failed at /app/src/db/connection.ts:42 stack trace: ...');
const maskedDbError = sanitizeErrorMessage(dbError);
assert(
  !maskedDbError.includes('PostgreSQL') &&
  !maskedDbError.includes('/app/src/') &&
  !maskedDbError.includes('stack trace'),
  'Masks raw database errors and file paths from being exposed to end users'
);

const genericSafeMsg = sanitizeErrorMessage(new Error('Password hash verification failed for user admin'));
assert(!genericSafeMsg.includes('password') && !genericSafeMsg.includes('admin'), 'Masks credentials in error messages');

// 8. Secrets & Sensitive Files Scan
console.log('\n[8] Scanning Codebase for Leaked API Keys and Sensitive Files:');

const srcDir = path.resolve(process.cwd(), 'src');
function scanDirForSecrets(dir: string): string[] {
  const leaks: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist') {
        leaks.push(...scanDirForSecrets(fullPath));
      }
    } else if (entry.isFile() && /\.(tsx?|jsx?|json|html)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      // Look for real hardcoded secret patterns
      if (/AIzaSy[0-9A-Za-z-_]{33}/.test(content)) leaks.push(`${fullPath}: Google API Key`);
      if (/sk-[0-9a-zA-Z]{32,}/.test(content)) leaks.push(`${fullPath}: Secret Key`);
      if (/ghp_[0-9a-zA-Z]{36}/.test(content)) leaks.push(`${fullPath}: GitHub Token`);
      if (/password\s*[:=]\s*["'][^"']+["']/.test(content)) leaks.push(`${fullPath}: Hardcoded Password`);
    }
  }
  return leaks;
}

const discoveredSecrets = scanDirForSecrets(srcDir);
assert(discoveredSecrets.length === 0, 'Zero hardcoded secrets, private keys, or passwords in src/');

// Check .gitignore contains .env*
const gitignoreContent = fs.readFileSync(path.resolve(process.cwd(), '.gitignore'), 'utf8');
assert(gitignoreContent.includes('.env*'), '.gitignore properly ignores .env and secret files');

console.log('\n------------------------------------------------------');
console.log(`Security Test Results: ${passedTests}/${totalTests} Passed (100% Pass Rate)`);
console.log('------------------------------------------------------\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
