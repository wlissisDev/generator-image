PORT = 3333;

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');
const multer = require('multer');


const app = express();
app.use(cors());
app.use(express.json());

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});



app.post("/images", async (req, res) => {
    try {
        const { prompt } = req.body
        const openai = new OpenAIApi(configuration);
        const response = await openai.createImage({
            prompt: prompt,
            n: 3,
            size: "1024x1024",
        });
        console.log(response);
        res.send(response.data.data)
    }
    catch (error) {
        console.error(error)
    }
})


app.listen({
    host: '0.0.0.0',
    port: process.env.PORT || PORT
}, () => { console.log("server rotando na porta:" + PORT) });
