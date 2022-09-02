
const STORAGE_PLATFORM_KEY = "platform";
const ON_MESSAGE_LOGGING = "req_logging";


document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("#main");
    const button = document.querySelector('#button');
    
    chrome.storage.local.get(STORAGE_PLATFORM_KEY, (result) => {
        const platform = result.platform;
        main.textContent = "Your platfrom: " + platform.arch + " / " + platform.os;
    });



    button.addEventListener("click", () => {
        if (button.textContent == "On") {
            button.textContent = "Off";
        } else {
            button.textContent = "On";
        }

        chrome.runtime.sendMessage(JSON.stringify({method: "toggle"}));
    });











});
