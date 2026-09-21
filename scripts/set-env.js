// Génère src/environments/environment.ts à partir de .env.
// Lancé automatiquement avant `npm start` et `npm run build` (voir package.json).
// Ce fichier généré n'est jamais commité (voir .gitignore).

const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '..', '.env');
const outputPath = path.resolve(__dirname, '..', 'src', 'environments', 'environment.ts');
const requiredKeys = ['EMAILJS_SERVICE_ID', 'EMAILJS_TEMPLATE_ID', 'EMAILJS_PUBLIC_KEY'];

function parseEnvFile(content) {
  const result = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }
    const match = line.match(/^([\w.-]+)\s*=\s*(.*)$/);
    if (!match) {
      continue;
    }
    const key = match[1];
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  }
  return result;
}

if (!fs.existsSync(envPath)) {
  console.error('[set-env] Fichier .env introuvable à la racine du projet.');
  console.error('[set-env] Copie .env.example vers .env et renseigne tes identifiants EmailJS.');
  process.exit(1);
}

const env = parseEnvFile(fs.readFileSync(envPath, 'utf8'));
const missing = requiredKeys.filter((key) => !env[key]);
if (missing.length) {
  console.warn(`[set-env] Variables manquantes dans .env: ${missing.join(', ')}`);
}

const escape = (value) => (value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");

const fileContent = `// Fichier généré automatiquement par scripts/set-env.js à partir de .env.
// Ne pas éditer à la main, ne pas committer (voir .gitignore).
export const environment = {
  emailjsServiceId: '${escape(env.EMAILJS_SERVICE_ID)}',
  emailjsTemplateId: '${escape(env.EMAILJS_TEMPLATE_ID)}',
  emailjsPublicKey: '${escape(env.EMAILJS_PUBLIC_KEY)}',
};
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log('[set-env] src/environments/environment.ts généré depuis .env');
