const express = require('express');
const bodyParser = require('body-parser');
const { FF3_1 } = require('ff3');
const crypto = require('crypto');
const FF3Cipher = require('ff3/lib/FF3Cipher');

const app = express();

// middleware to parse JSON requests
app.use(bodyParser.json());


// middleware to verify bearer token
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  // generate with: openssl rand -base64 32
  const TOKEN = 'BPmNB3+ngfs9vjUHdghftJq+DwfJ9fZz5GTIqNcDLxg=';
  if (authHeader && authHeader === `Bearer ${TOKEN}`) {
    console.log("Authorized.");
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

// generate random for string in case you need
app.get('/random/:length', verifyToken, async (req, res) => {
  const { length } = req.params;
  const randomString = crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
  res.json({ randomString });
});


// endpoint for encryption
app.post('/encrypt', verifyToken, async (req, res) => {
  const { key, data } = req.body;
  const key2 = new TextEncoder().encode(key);

  try {
    const FF3Cipher = require('ff3/lib/FF3Cipher');
    const tweak = "D8E7920AFA330A73";
    const radix = 36;
    const c = new FF3Cipher(key2, tweak, radix);
    let encryptedData = c.encrypt(data);
    //console.log(data, encryptedData)
    res.json({ encryptedData });
  }
  catch (error) {
    console.error('Encryption failed:', error);
    res.status(401).json({ error: 'Encryption error.' });
  }

});

// endpoint for decryption
app.post('/decrypt', verifyToken, async (req, res) => {
  const { key, data } = req.body;
  const key2 = new TextEncoder().encode(key);

  try {
    const tweak = "D8E7920AFA330A73";
    const radix = 36;
    const c = new FF3Cipher(key2, tweak, radix);
    let decryptedData = c.decrypt(data);
    //console.log(data, encryptedData)
    res.json({ decryptedData });
  }
  catch (error) {
    console.error('Encryption failed:', error);
    res.status(401).json({ error: 'Encryption error.' });
  }

});


// Define the /encrypt/email endpoint
app.post('/encrypt/email', verifyToken, async (req, res) => {
  const { key, data } = req.body;
  const [username, domain] = data.split('@');
  const key2 = new TextEncoder().encode(key);

  try {
    const FF3Cipher = require('ff3/lib/FF3Cipher');
    const tweak = "D8E7920AFA330A73";
    const radix = 36;
    const c = new FF3Cipher(key2, tweak, radix);
    const encryptedUsername = c.encrypt(username);
    const encryptedDomain = c.encrypt(domain);
    const encryptedEmail = encryptedUsername + '@' + encryptedDomain;

    //console.log(data, encryptedData)
    res.json({ encryptedEmail });
  }
  catch (error) {
    console.error('Encryption failed:', error);
    res.status(401).json({ error: 'Encryption error.' });
  }
});

// Define the /decrypt/email endpoint
app.post('/decrypt/email', verifyToken, async (req, res) => {
  const { key, data } = req.body;
  const [username, domain] = data.split('@');
  const key2 = new TextEncoder().encode(key);

  try {
    const FF3Cipher = require('ff3/lib/FF3Cipher');
    const tweak = "D8E7920AFA330A73";
    const radix = 36;
    const c = new FF3Cipher(key2, tweak, radix);
    const decryptedUsername = c.decrypt(username);
    const decryptedDomain = c.decrypt(domain);
    const decryptedEmail = decryptedUsername + '@' + decryptedDomain;

    //console.log(data, encryptedData)
    res.json({ decryptedEmail });
  }
  catch (error) {
    console.error('Encryption failed:', error);
    res.status(401).json({ error: 'Encryption error.' });
  }
});


// Credit card: /encrypt/cc endpoint
app.post('/encrypt/cc', verifyToken, async (req, res) => {
  const { key, data } = req.body;
  const key2 = new TextEncoder().encode(key);

  // Define the credit card format: XXXX-XXXX-XXXX-XXXX
  const creditCardFormat = /^(\d{4})-(\d{4})-(\d{4})-(\d{4})$/;
  // Check if the input matches the credit card format.
  if (!creditCardFormat.test(data)) {
    return res.status(400).json({ error: 'Invalid credit card format. Expected ....-....-....-....' });
  }

  try {
    const FF3Cipher = require('ff3/lib/FF3Cipher');
    const tweak = "D8E7920AFA330A73";
    const radix = 10;
    const c = new FF3Cipher(key2, tweak, radix);
    const data2 = data.replace(/-/g, "");

    const encrypted = c.encrypt(data2);

    // Combine the encrypted groups with hyphens.
    const encryptedCreditCard = encrypted.replace(/(.{4})/g, "$1-").slice(0, -1);

    //console.log(data, encryptedData)
    res.json({ encryptedCreditCard });
  }
  catch (error) {
    console.error('Encryption failed:', error);
    res.status(401).json({ error: 'Encryption error.' });
  }
});

// Credit card: /decrypt/cc endpoint
app.post('/decrypt/cc', verifyToken, async (req, res) => {
  const { key, data } = req.body;
  const key2 = new TextEncoder().encode(key);

  // Define the credit card format: XXXX-XXXX-XXXX-XXXX
  const creditCardFormat = /^(\d{4})-(\d{4})-(\d{4})-(\d{4})$/;
  // Check if the input matches the credit card format.
  if (!creditCardFormat.test(data)) {
    return res.status(400).json({ error: 'Invalid credit card format. Expected ....-....-....-....' });
  }

  try {
    const FF3Cipher = require('ff3/lib/FF3Cipher');
    const tweak = "D8E7920AFA330A73";
    const radix = 10;
    const c = new FF3Cipher(key2, tweak, radix);
    const data2 = data.replace(/-/g, "");

    const decrypted = c.decrypt(data2);

    // Combine the encrypted groups with hyphens.
    const decryptedCreditCard = decrypted.replace(/(.{4})/g, "$1-").slice(0, -1);

    //console.log(data, encryptedData)
    res.json({ decryptedCreditCard });
  }
  catch (error) {
    console.error('Decryption failed:', error);
    res.status(401).json({ error: 'Decryption error.' });
  }
});


// start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
