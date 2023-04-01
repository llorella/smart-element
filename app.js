async function improveElement(elementId) {
    const smartElement = document.getElementById(elementId);
    try {
      await smartElement.improve();
    } catch (error) {
      console.error('Error improving HTML:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', async () => {
    improveElement('testing');
  });
  
  const button = document.getElementById('improve-button');
  button.addEventListener('click', async () => {
    improveElement('self-improve-block');
  });
  