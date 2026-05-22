require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json({ limit: '5mb' }));

app.post('/review', async (req, res) => {
  const { resumeText } = req.body;

  if (!resumeText || resumeText.length < 50) {
    return res.status(400).json({ error: 'Resume text is too short or missing.' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openrouter/auto',
        messages: [
          {
            role: 'user',
            content: `You are an expert resume reviewer. Analyze the resume below and return ONLY raw JSON (no markdown, no backticks, no explanation):
{
  "score": <number 1-10>,
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<point>", "<point>", "<point>"],
  "improvements": ["<point>", "<point>", "<point>"],
  "missing": ["<missing element>", "<missing element>"],
  "tips": ["<formatting/tone tip>", "<tip>"],
  "formatting": ["<formatting issue>", "<formatting issue>"]
}

Resume:
${resumeText.substring(0, 4000)}`
          }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || 'OpenRouter error: ' + response.status);
    }

    const data = await response.json();
    const raw = data.choices[0].message.content.trim();
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return res.status(500).json({ error: 'Could not parse AI response.' });

    const parsed = JSON.parse(match[0]);
    res.json(parsed);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Something went wrong.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});