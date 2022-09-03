
chrome.runtime.onInstalled.addListener(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    console.log("Installed");


    fetch("http://127.0.0.1:8080/ping", {signal: controller.signal})
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
    .finally(() => {
        console.log("timeout");
        clearTimeout(timeoutId)
    }); 
});