class SmartElement extends HTMLElement {
  constructor(apiKey) {
    super();
    this.apiKey = apiKey;
  }

  async improve() {
    //use server endpoint for now because of node dependency openai
    const testHtml = this.innerHTML;
    try {
      const response = await fetch('/transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html: testHtml }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const transformedHtml = data.transformedHtml;
        console.log('Transformed HTML:', transformedHtml);
  
        // Update the target element's inner HTML with the transformed HTML
        this.innerHTML = transformedHtml;
  
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

customElements.define('smart-element', SmartElement);