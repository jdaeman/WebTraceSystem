
const controller = new AbortController();

const STORAGE_PLATFORM_KEY = "platform";
const ON_MESSAGE_LOGGING = "logging";
const configuration = {traceEnabled: true, broker: "localhost:8080"};



/**
 * fix to 2 digit
 * 
 * @param {number} digit 
 * @returns 
 */
function alignDigit(digit) {
    return (digit >= 10 ? ""+digit : "0"+digit);
}



/**
 * unix timestamp to yyyy-mm-dd HH:MM:SS timestamp
 * 
 * @param {number} timeStamp 
 * @returns 
 */
function toTimeFormat(timeStamp) {
    const tm = new Date(timeStamp);
    const year = tm.getFullYear();
    const _month = tm.getMonth()+1;
    const month = alignDigit(_month);
    const day = alignDigit(tm.getDate());

    const hour = alignDigit(tm.getHours());
    const min = alignDigit(tm.getMinutes());
    const sec = alignDigit(tm.getSeconds());
    
    return year+"-"+month+"-"+day+"T"+hour+":"+min+":"+sec;
}



/**
 * 
 */
chrome.runtime.onInstalled.addListener(() => {
    console.log("This extension is installed!");

    chrome.runtime.getPlatformInfo((platformInfo) => {
        console.log("PlatformInfo:", platformInfo);

        chrome.storage.local.set({platform: platformInfo}, () => {
            console.log("platformInfo saved by KEY: platform");
        });
    });

});



/**
 * handle all messages.
 * message must be json format.
 * 
 * json contents
 * 
 * "method": "logging", "message": "<in here log message>"
 * 
 * "method":  
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const obj = JSON.parse(message);

    if (!("method" in obj)) {
        console.warn("required filed [method] not exist");
        return;
    }

    const method = obj.method;
    if (method == ON_MESSAGE_LOGGING) {
        console.log(obj.message);
    } else if (method == "toggle") {
        configuration.traceEnabled = !configuration.traceEnabled;
    }
});



/**
 * push web access log to broker server
 * use POST method
 * data have some fileds
 * 1. url,
 * 2. timestamp,
 * 3. tab id,
 * 4. request id,
 * 
 * @param {object} data 
 */
function pushWebLog(data) {
	const timeoutId = setTimeout(() => controller.abort(), 5000);
    const options = {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
		signal: controller.signal
    };

    fetch(`http://${configuration.broker}/push`, options)
    .then(resp => {
        return new Promise(function(resolve, reject){
            if (resp.status == 200) {
                resolve(resp.json());
            } else {
                resp.json()
                .then(data => reject(new Error(JSON.stringify(data))))
                .catch(() => reject(new Error("Server response is not json!")));
            }
        });
    })
    .then(data => console.log(data))
    .catch(err => console.error("fetch timeout", err))
	.finally(() => clearTimeout(timeoutId));
}



/**
 * 
 */
chrome.webRequest.onBeforeRequest.addListener((details) => {
    if (!configuration.traceEnabled) {
        return;
    }

    const filter = (details.type == "main_frame" && 
                    details.url.startsWith("http") && 
                    !details.url.startsWith("http://localhost") &&
                    !details.url.startsWith("http://127.0.0.1"));

    if (!filter) {
        return;
    }

    const timeStamp = toTimeFormat(details.timeStamp);
    const url = details.url
    const tabId = details.tabId;
    const requestId = parseInt(details.requestId);

    const data = {
        timestamp: timeStamp,
        url : url,
        tab_id : tabId,
        request_id : requestId
    };


    console.log(timeStamp, " ", url);
    pushWebLog(data);
    
    // fetch(`http://${configuration.broker}/ping`)
    // .then((response) => response.json())
    // .then((data) => console.log(data))
    // .catch((error) => console.log(error));

}, {urls: ["<all_urls>"]});
