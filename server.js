const express = require('express');
const { exec } = require('child_process');
const { Configuration, OpenAIApi } = require('openai');

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./'))

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

async function getHtmlCompletion(testHtml) {
    const openai = new OpenAIApi(configuration);
    const completion =  await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [ { role: "system", content: "You are an HTML expert. Every user message will send a block of html. Construct an improved version of it in some regard. Only respond with HTML, but you can include any extra thoughts/explanation in comments of html." }, 
                    { role: "user", content: testHtml },],
        temperature: 0.9
    });
    const newHtml = completion.data.choices[0].message.content

    return newHtml
}

app.post('/transform', async (req, res) => {
    const html = req.body.html
    const llamaHtml = await getHtmlCompletion(html)
    res.json({ transformedHtml: llamaHtml })
})

app.listen(3000, () => {
    console.log(`Server running on port 3000`)

    exec('start http://localhost:3000', (err, stdout, stderr) => {
    if (err) {
      console.error('Error opening browser window:', err);
      return;
    }
    console.log('Browser window opened successfully:', stdout);
  });
});
