export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { LINE_CHANNEL_ACCESS_TOKEN, LINE_GROUP_ID } = process.env;

  try {
    const response = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        to: LINE_GROUP_ID,
        messages: [{ type: 'text', text: 'button clicked' }],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("LINE API error:", err);
    res.status(500).json({ error: err.message });
  }
}