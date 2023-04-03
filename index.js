class SmartElement extends HTMLElement {
  constructor(apiKey) {
    super();
  }

  async improve(prompt) {
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
  
      const originalHtml = this.innerHTML;
      this.innerHTML = transformedHtml;
      this.insertAdjacentHTML('beforeend', `
        <button id="accept-changes">Accept changes</button>
        <button id="reject-changes">Reject changes</button>
      `);
  
      const acceptChangesButton = this.querySelector("#accept-changes");
      const rejectChangesButton = this.querySelector("#reject-changes");

      return new Promise((resolve) => {
        acceptChangesButton.onclick = () => {
          acceptChangesButton.remove();
          rejectChangesButton.remove();
          resolve(true);
        };
  
        rejectChangesButton.onclick = () => {
          acceptChangesButton.remove();
          rejectChangesButton.remove();
          this.innerHTML = originalHtml;
          resolve(false);
        };
      });
    }
}

customElements.define('smart-element', SmartElement);
