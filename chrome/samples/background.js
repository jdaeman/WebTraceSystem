let color = '#3aa757';


// https://developer.chrome.com/docs/extensions/reference/runtime/

/**
 * runtime.onInstalled
 * 1. Fired when the extension is first installed
 * 2. the extension is updated to a new version
 * 3. Chrome is updated to a new version.
 */
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

