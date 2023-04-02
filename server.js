const express = require('express');
const { exec } = require('child_process');
const findProcess = require('find-process');
const { Configuration, OpenAIApi } = require('openai');

const app = express()

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./'))

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

async function getHtmlCompletion(testHtml, prompt) {
    const openai = new OpenAIApi(configuration);
    const completion =  await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [ { role: "system", content: "You are an HTML expert. The first user request will specify some language description of want for html block. The second user request will only be the html. Generate a better version of this html with user specifications in mind. Only respond with HTML, but you can include any extra thoughts/explanation in comments of html." }, 
                    { role: "user", content: prompt},
                    { role: "user", content: testHtml },],
        temperature: 0.9
    });
    const newHtml = completion.data.choices[0].message.content

    return newHtml
}

app.post('/transform', async (req, res) => {
    const html = req.body.html
    const prompt = req.body.prompt
    const llamaHtml = await getHtmlCompletion(html, prompt)
    res.json({ transformedHtml: llamaHtml })
})


app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
  
    if (true | process.env.NODE_ENV === 'development') {
      const processList = await findProcess('port', PORT);
      const browserProcess = processList.find((proc) => proc.name.toLowerCase().includes('browser'));
  
      if (!browserProcess) {
        exec('start http://localhost:3000', (err, stdout, stderr) => {
          if (err) {
            console.error('Error opening browser window:', err);
            return;
          }
          console.log('Browser window opened successfully:', stdout);
        });
      } else {
        console.log('Browser tab is already open');
      }
    }
  });