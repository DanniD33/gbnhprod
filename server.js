const express = require('express');

require('dotenv').config();
const apiKey = process.env.API_KEY;
const app = express();
const PORT = process.env.PORT || 3000;
var path = require('path');

app.use('/assets',express.static('assets'))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/landing.html'))
})

// app.use('/static', express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'assets')))

// app.use('assets', express.static(path.join(__dirname, './assetss')));
// app.use(express.static(path.join(__dirname, './views')));


// app.get('/api/weather', async (req, res) => {

//   try {
//     const response = await axios.get(
//       `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=London`
//     );
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch data' });
//   }
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));