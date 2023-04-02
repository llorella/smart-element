class SmartElement extends HTMLElement {
  constructor(apiKey) {
    super();
    this.apiKey = apiKey;
  }

  async improve(prompt) {
    //use server endpoint for now because of node dependency openai
    const testHtml = this.innerHTML;
    try {
      const response = await fetch('/transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html: testHtml, prompt: prompt }),
      });

      if (response.ok) {
        const data = await response.json();
        const transformedHtml = data.transformedHtml;
        console.log('Transformed HTML:', transformedHtml);

        const shouldApplyTransformedHtml = await this.confirmChanges(prompt, transformedHtml);

        if (shouldApplyTransformedHtml) {
          this.innerHTML = transformedHtml;
        } 
      } else {
        console.error('Error:', response.statusText);}
      } catch (error) {
        console.error('Error:', error);
      }
    }

    async confirmChanges(prompt, transformedHtml) {
      console.log("Input prompt:", prompt);
      console.log("Transformed HTML:", transformedHtml);
  
      const previewContainer = document.getElementById("preview-container");
      const preview = document.getElementById("preview");
      const yesButton = document.getElementById("yes-button");
      const noButton = document.getElementById("no-button");
  
      preview.innerHTML = transformedHtml;
      previewContainer.style.display = "block";
  
      return new Promise((resolve) => {
        yesButton.onclick = () => {
          previewContainer.style.display = "none";
          this.innerHTML = transformedHtml;
          resolve(true);
        };
  
        noButton.onclick = () => {
          previewContainer.style.display = "none";
          resolve(false);
        };
      });
    }
  

}

customElements.define('smart-element', SmartElement);
