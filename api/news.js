module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const apiKey = process.env.GNEWS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing GNews API key' });
    }

    const url = `https://gnews.io/api/v4/top-headlines?country=ng&lang=en&max=12&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    // Optional: check if GNews returned an error
    if (data.errors) {
      console.error('GNews error:', data.errors);
      return res.status(500).json({ error: data.errors });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Function error:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};
