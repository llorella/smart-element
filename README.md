# Smart Element

smart-element is a Javascript library that allows you to create a custom element that can be used on any web page. It leverages OpenAI's GPT-3.5-turbo to transform content wrapped by the <smart-element> tag, with the ability to add user specifications. This is a small project I hacked together when I grew annoyed writing HTML for my personal website. It's mostly intended as a tool to use while designing webpages, and not for production. 

## Server Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/smart-element.git
```

2. Install dependencies:

```bash
cd smart-element
npm install
```

3. Set up the environment variables by creating a .env file in the root directory of the project with the following content:

```bash
OPENAI_API_KEY=your_openai_api_key
```

4. Start the server:
```bash
npm start
```

The server will be running on http://localhost:3000.

## Client-side Integration

1. Include the smart-element web component in your HTML file:

```bash
<script src="path/to/smart-element/index.js"></script>
```

2. Use the <smart-element> custom element in your HTML:

```html
<smart-element>
  <!-- Your content here -->
</smart-element>
```

3. Call the improve() method when needed, for example, on a button click or form submission:

```javascript
const smartElement = document.querySelector('smart-element');
smartElement.improve();
```

4. Make sure the server is running when using the client-side component, as it communicates with the server to perform the transformation.


## Example Usage

An example HTML file and associated JavaScript are included in the example directory. To use the example, ensure the server is running and open the example/index.html file in your web browser.
