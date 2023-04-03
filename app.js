
document.addEventListener("DOMContentLoaded", async () => {
  const smartElement = document.querySelector('smart-element');
  const form = document.getElementById("smart-element-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const inputElement = document.getElementById("smart-element-input");
    const inputValue = inputElement.value;

    try {
      await smartElement.improve(inputValue);
    } catch (error) {
      console.error('Error improving HTML:', error);
    }

  });
});
  

