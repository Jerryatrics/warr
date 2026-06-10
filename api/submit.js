const axios = require('axios');

module.exports = async (req, res) => {
  // CORS support for cross-origin requests (useful if frontend is hosted elsewhere)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Ensure we have a parsed JSON body (Vercel sometimes leaves raw body)
  let body = req.body;
  if (!body) {
    try {
      body = await new Promise((resolve, reject) => {
        let data = '';
        req.on('data', chunk => { data += chunk; });
        req.on('end', () => {
          try { resolve(data ? JSON.parse(data) : {}); } catch (e) { resolve({}); }
        });
        req.on('error', err => reject(err));
      });
    } catch (e) {
      body = {};
    }
  }
  const { date, time, cuisine } = body || {};
  if (!date || !time || !cuisine) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
  if (!DISCORD_WEBHOOK_URL) {
    console.error('Missing DISCORD_WEBHOOK_URL env var');
    return res.status(500).json({ success: false, message: 'Server not configured' });
  }

  const content = `🎉 New Reservation!\n**Date:** ${date}\n**Time:** ${time}\n**Cuisine:** ${cuisine}`;

  try {
    await axios.post(DISCORD_WEBHOOK_URL, { content });
    return res.json({ success: true });
  } catch (err) {
    console.error('Error sending to Discord webhook:', err.message || err);
    return res.status(500).json({ success: false, message: 'Failed to send to Discord' });
  }
};
