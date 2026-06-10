const express = require('express');
const axios = require('axios');
const app = express();

// Basic JSON parsing
app.use(express.json());

// Simple CORS middleware for local testing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

app.post('/api/submit', async (req, res) => {
  const { date, time, cuisine } = req.body;

  if (!DISCORD_WEBHOOK_URL) {
    console.error('Missing DISCORD_WEBHOOK_URL environment variable.');
    return res.status(500).json({ success: false, message: 'Server not configured' });
  }

  if (!date || !time || !cuisine) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  const content = `🎉 New Reservation!\n**Date:** ${date}\n**Time:** ${time}\n**Cuisine:** ${cuisine}`;

  try {
    await axios.post(DISCORD_WEBHOOK_URL, { content });
    return res.json({ success: true, message: 'Sent to Discord' });
  } catch (err) {
    console.error('Discord send error:', err.message || err);
    return res.status(500).json({ success: false, message: err.message || 'Failed to send' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
