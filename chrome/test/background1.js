/**
 * web request life cycle
 * 
 * onBeforeRequest (opt sync)
 * onBeforeSendHeaders (opt sync)
 * onSendHeaders
 * onHeadersReceived (opt sync)
 * ------------- onAuthRequired (opt sync)
 * -------- onBeforeRedirect 
 * onResponseStarted
 * onCompleted
 * 
 * onErrorOccured
 * */


/**
 * detail
 * 
 * onBeforeRequest
 * - This event is sent before any TCP connection is made and can be used to cancel or redirect requests.
 * 
 * onBeforeSendHeaders
 * - The event is intended to allow extensions to add, modify, and delete request headers.
 * - This event can be used to cancel the request.
 * 
 * onSendHeaders
 * - The event is triggered before the headers are sent to the network.
 * - It does not allow modifying or cancelling the request.
 * 
 * onHeaderReceived
 * - This event is intended to allow extensions to add, modify, and delete response headers, such as incoming Content-Type headers.
 * 
 * onAuthRequired
 * - This event can be handled synchronously to provide authentication credentials.
 * 
 * onBeforeRedirect
 * - A redirection can be triggered by an HTTP response code or by an extension.
 * - It does not allow you to modify or cancel the request.
 * 
 * onResponseStarted
 * - Fires when the first byte of the response body is received.
 * - status line and response headers are available.
 * - It does not allow modifying or cancelling the request.
 * 
 * onCompleted
 * - Fires when a request has been processed successfully.
 * 
 */

/**
 * If you really need to modify headers in a way to violate the CORS protocol, you need to specify 'extraHeaders' in opt_extraInfoSpec. 
 * If you need to deceive the CORS protocol, you also need to specify 'extraHeaders' for the response modifications.
 * 
 * Each request is identified by a request ID. 
 * This ID is unique within a browser session and the context of an extension. 
 */


chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed");
});

function alignDigit(digit) {
    return digit >= 10? digit : "0"+digit
}

function toTimeFormat(timeStamp) {
    const tm = new Date(timeStamp);
    const year = tm.getFullYear();
    const _month = tm.getMonth()+1;
    const month = alignDigit(_month);
    const day = alignDigit(tm.getDate());

    const hour = alignDigit(tm.getHours());
    const min = alignDigit(tm.getMinutes());
    const sec = alignDigit(tm.getSeconds());
    
    return year+"-"+month+"-"+day + " " +hour+":"+min+":"+sec;
}

chrome.webRequest.onBeforeRequest.addListener((details) => {
    if (details.type == "main_frame") {
        const timeStamp = toTimeFormat(details.timeStamp);
        const url = details.url
        console.log(timeStamp, " ", url);
    }
}, {urls: ["<all_urls>"]});
