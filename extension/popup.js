document.addEventListener('DOMContentLoaded', async () => {
  const tokenSection = document.getElementById('tokenSection');
  const mainSection = document.getElementById('mainSection');
  const apiTokenInput = document.getElementById('apiToken');
  const saveTokenButton = document.getElementById('saveToken');
  const saveButton = document.getElementById('saveButton');
  const changeTokenButton = document.getElementById('changeToken');
  const statusParagraph = document.getElementById('status');

  // Helper to support both browser (Firefox) and chrome (Chrome) APIs
  const api = window.browser || window.chrome;

  function getStorage(key) {
    return new Promise((resolve) => {
      api.storage.local.get(key, (result) => {
        // Chrome returns result directly in callback, Firefox returns promise but also supports callback in polyfill usually.
        // If using native browser namespace in Firefox, it returns promise.
        // Let's try to handle both if possible, but for now assuming callback style works for chrome and polyfilled browser.
        // If window.browser is native (Firefox), it returns a promise if no callback is provided.
        // But here we provided a callback.
        resolve(result);
      });
    });
  }

  // Better approach: check if it returns a promise
  async function getStoragePromised(key) {
    if (window.browser && browser.storage) {
      return browser.storage.local.get(key);
    }
    return new Promise(resolve => chrome.storage.local.get(key, resolve));
  }

  async function setStoragePromised(data) {
    if (window.browser && browser.storage) {
      return browser.storage.local.set(data);
    }
    return new Promise(resolve => chrome.storage.local.set(data, resolve));
  }

  async function queryTabsPromised(query) {
    if (window.browser && browser.tabs) {
      return browser.tabs.query(query);
    }
    return new Promise(resolve => chrome.tabs.query(query, resolve));
  }

  // Load token
  const { apiToken } = await getStoragePromised('apiToken');

  if (apiToken) {
    showMain();
  } else {
    showToken();
  }

  function showToken() {
    tokenSection.classList.remove('hidden');
    mainSection.classList.add('hidden');
  }

  function showMain() {
    tokenSection.classList.add('hidden');
    mainSection.classList.remove('hidden');
  }

  saveTokenButton.addEventListener('click', async () => {
    const token = apiTokenInput.value.trim();
    if (token) {
      await setStoragePromised({ apiToken: token });
      showMain();
      statusParagraph.textContent = 'Token saved!';
      setTimeout(() => statusParagraph.textContent = '', 2000);
    }
  });

  changeTokenButton.addEventListener('click', () => {
    showToken();
  });

  saveButton.addEventListener('click', async () => {
    statusParagraph.textContent = 'Saving...';
    try {
      const { apiToken } = await getStoragePromised('apiToken');
      if (!apiToken) {
        showToken();
        statusParagraph.textContent = 'Please set your API token.';
        return;
      }

      const tabs = await queryTabsPromised({ active: true, currentWindow: true });
      const tab = tabs[0];

      if (tab?.url) {
        console.log('Saving URL:', tab.url);
        console.log('Using token:', apiToken.substring(0, 10) + '...');

        const response = await fetch('http://localhost:3000/api/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiToken}`
          },
          body: JSON.stringify({ url: tab.url }),
        });

        console.log('Response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('Success:', data);
          statusParagraph.textContent = 'Page saved successfully!';
          setTimeout(() => statusParagraph.textContent = '', 3000);
        } else {
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
          console.error('Error response:', errorData);
          statusParagraph.textContent = `Error: ${errorData.error || 'Failed to save page.'}`;
        }
      } else {
        statusParagraph.textContent = 'Could not get current page URL.';
      }
    } catch (error) {
      console.error('Error saving page:', error);
      statusParagraph.textContent = `Error: ${error.message || 'An unexpected error occurred.'}`;
    }
  });
});
