import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
const API_URL = 'https://secrets-api.appbrewery.com/random';

// 3. Use the public folder for static files.
app.use(express.static("public"));

// 4. When the user goes to the home page it should render the index.ejs file.
app.get('/', async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.render('index.ejs', { secret: response.data.secret, user: response.data.username });
    } catch (error) {
        console.log(error.response.data);
        res.status(500);
    }
});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
