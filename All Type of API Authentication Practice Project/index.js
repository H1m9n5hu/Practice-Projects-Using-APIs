import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "lucifers";
const yourPassword = "lucifers";
const yourAPIKey = "fd8b8ace-5e08-4523-a2ad-8f94375bb971";
const yourBearerToken = "7c2a17be-bbbf-46e0-8cd8-1743368dc47e";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request", error.message);
    res.render("index.ejs", { content: error.message });
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      }
    });
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request", error.message);
    res.render("index.ejs", { content: error.message });
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`);
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request", error.message);
    res.render("index.ejs", { content: error.message });
  }
});

const config = {
  headers: { authorization: `Bearer ${yourBearerToken}`}
};

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/secrets/42", config);
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to made request", error.message);
    res.render("index.ejs", { content: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
