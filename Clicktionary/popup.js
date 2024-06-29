document.getElementById('translate').addEventListener('click', () => {
    const selectedLanguage = document.getElementById('language').value;
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        func: translatePage,
        args: [selectedLanguage]
      });
    });
  });
  
  function translatePage(language) {
    chrome.runtime.sendMessage({type: 'TRANSLATE', language: language});
  }
  