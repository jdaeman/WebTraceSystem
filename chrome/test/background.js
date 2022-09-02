

let messageCount = 0;

chrome.runtime.onInstalled.addListener(() => {
    chrome.runtime.getPlatformInfo((platformInfo) => {
        console.log("PlatformInfo:" ,platformInfo)
    });

    // chrome.tabs.create({
    //     url: 'https://www.naver.com'
    // }, (tab) => {console.log("created tab: ", tab)});


    // const value = "wowoops"
    // chrome.storage.sync.set({aaa: value}, function() {
    //     console.log('Value is set to ' + value);
    // });
});

chrome.runtime.onMessage.addListener((message, sender) => {
    //console.log("messageCount: " ,messageCount);
    //console.log("sender: ", sender);
    console.log("message: ", message);
    messageCount += 1;

    // single
    //  or multiple keys by array(?)
    chrome.storage.sync.get('aaa', function(result) {
        console.log('Value currently is ' + result.aaa);
    });

    getCurrentTab()
    .then((tab) => {console.log("Tab: ", tab, tab.length)})
    .catch((error) => {console.log("Tab error: ", error)});
})

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    //  it's used to unpack the values of an array and assign them to new variables.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

// when the active tab in a window changes.
chrome.tabs.onActivated.addListener(moveToFirstPosition);

async function moveToFirstPosition(activeInfo) {
    console.log("activeInfo: ",activeInfo)
//   try {
//     await chrome.tabs.move(activeInfo.tabId, {index: 0});
//     console.log('Success.');
//   } catch (error) {
//     if (error == 'Error: Tabs cannot be edited right now (user may be dragging a tab).') {
//       setTimeout(() => moveToFirstPosition(activeInfo), 50);
//     } else {
//       console.error(error);
//     }
//   }
}