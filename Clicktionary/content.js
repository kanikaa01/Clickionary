// Create a tooltip element
const tooltip = document.createElement('div');
tooltip.id = 'word-definition-tooltip';
document.body.appendChild(tooltip);

// Function to fetch word definition
async function fetchWordDefinition(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data[0]?.meanings[0]?.definitions[0]?.definition || 'Definition not found';
  } else {
    throw new Error('Failed to fetch word definition');
  }
}

// Function to show tooltip
function showTooltip(x, y, content) {
  tooltip.innerHTML = content;
  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;
  tooltip.style.display = 'block';
}

// Function to hide tooltip
function hideTooltip() {
  tooltip.style.display = 'none';
}

// Event listener for double-click
document.addEventListener('dblclick', async (event) => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    try {
      const definition = await fetchWordDefinition(selectedText);
      showTooltip(event.pageX, event.pageY, `<strong>${selectedText}:</strong> ${definition}`);
    } catch (error) {
      showTooltip(event.pageX, event.pageY, `Error: ${error.message}`);
    }
  } else {
    hideTooltip();
  }
});

// Hide tooltip on click outside
document.addEventListener('click', (event) => {
  if (!tooltip.contains(event.target)) {
    hideTooltip();
  }
});
