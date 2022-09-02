# chrome extension

- Every extension requires a manifest.
- "command" in the manifest.json that enables a keyboard shortcut.
    - 잘 안되는데

## Manifest V3
- An extension manifest gives the browser information about the extension, such as the most important files and the capabilities the extension might use.
### features
- **Service workers** replace background pages.
- Network request modification is now handled with the new declarativeNetRequest API.
- an extension can only execute JavaScript that is included within its package.
    - 외부 javascript 를 request 해서 사용하지 못함
- Promise support has been added to many methods, though callbacks are still supported as an alternative.
- Web accessible resources: These resources are now available only to specified sites and extensions.

### migrate to v3 (update manifest.json)
1. manifest version
1. service worker
    - Must use fetch() to make requests.
    - **Doesn't have access to the DOM.**
1. host permissions
1. Action api
1. Executing arbitrary strings
    - "permissions": ["scripting"]
    - Injecting a static file
    - Static file injection with scripting.executeScript() is almost identical to how it used to work in the Tabs API.
1. Injecting a function
    - its source is sent to the **target tab** and it is run there.
    - https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/
1. deprecated APIs

v2 | v3
--- | ---
"manifest_version":2 | "manifest_version":3
"backgroud": {"scripts": [], "persistent": false} | "background": {"service_worker": "example.js", "type": "module"}
"permissions": ["tabs", "bookmarks", **"http://www.blogger.com/"**] | **"host_permissions"**: ["http://www.blogger.com/"]
"browser_asction": {...}, "page_action": {...} | "action": {...}
chrome.browserAction.onClicked.addListener(tab => { ... })<br>chrome.pageAction.onClicked.addListener(tab => { ... }) | chrome.action.onClicked.addListener(tab => { ... }); 
tabs.executeScript() | scripting.executeScript()
chrome.tabs.executeScript({file: 'content-script.js'}); | async function getCurrentTab() {/* ... */} <br> let tab = await getCurrentTab(); <br>chrome.scripting.executeScript({target: {tabId: tab.id},files: ['content-script.js']});

---
### Service worker
- background pages provide extension authors with an environment that lives independent of any other window or tab.
- This allows extensions to observe and take action in response to events.
- "service worker is a script that your browser runs in the background, separate from a web page,
- **service workers are terminated when not in use and restarted when needed**
- **service workers don't have access to DOM.**

---
https://developer.chrome.com/docs/extensions/reference/
