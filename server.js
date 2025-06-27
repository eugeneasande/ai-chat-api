const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

const DEEPSEEK_API_KEY = 'sk-cacf8f1a960942488334c479f7496885'; // Keep this SECRET!

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
      model: 'deepseek-chat', // or use your preferred model
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error('❌ API error:', err.message);
    res.status(500).json({ error: 'Failed to get reply from DeepSeek' });
  }
});

app.get('/', (req, res) => {
  res.send('✅ AI Chat Backend is Live!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
