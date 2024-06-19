// content.js
// content.js


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
    if (request.action === "extractText") {
        text  = document.body.innerText;
        if (text.length>1000){
            text=text.substring(0,1000);
        }
        sendResponse({text: text});
    }
});