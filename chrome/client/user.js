
const STORAGE_PLATFORM_KEY = "platform";
const ON_MESSAGE_LOGGING = "req_logging";


document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("#main");
    const toggleText = document.querySelector('#toggleText');
    const toggle = document.querySelector('#toggle');
    
    chrome.storage.local.get(STORAGE_PLATFORM_KEY, (result) => {
        const platform = result.platform;
        main.textContent = "Your platfrom: " + platform.arch + " / " + platform.os;
    });



    // button.addEventListener("click", () => {
    //     if (button.textContent == "On") {
    //         button.textContent = "Off";
    //     } else {
    //         button.textContent = "On";
    //     }

        
    // });


    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            toggleText.textContent = "Toggle On";
        } else {
            toggleText.textContent = "Toggle Off";
        }

        chrome.runtime.sendMessage(JSON.stringify({method: "toggle"}));
    });









});
