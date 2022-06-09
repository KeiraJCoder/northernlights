
// Retrieve the evolokresponseObject from storage
let evolokresponseObject = localStorage.getItem('evolok_authenticate');
let ev_session = localStorage.getItem('evolok:ev_session');
let ev_did = localStorage.getItem("ev_did");
let ev_sid = localStorage.getItem("ev_sid");
// Function to create the cookie to store guid 
if(ev_session){
createCookie("STYXKEY_guid", JSON.parse(ev_session).guid, "1");
createCookie("STYXKEY_ev_session", JSON.parse(ev_session).mainSession.sessionId, "1");
createCookie("STYXKEY_ev_obj", JSON.parse(evolokresponseObject).segments, "1");
createCookie("STYXKEY_ev_did", ev_did, "1");
createCookie("STYXKEY_ev_sid", ev_sid, "1");

function createCookie(name, value, days) {
    let expires;
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = escape(name) + "=" + 
        escape(value) + expires + "; path=/";
}
}
datalayer_script_vars.permutiveId = localStorage.getItem("permutive-id");
datalayer_script_vars.permutiveSegments = localStorage.getItem("_psegs");
datalayer_script_vars.EV_DID = localStorage.getItem("ev_did");
datalayer_script_vars.EV_SID = localStorage.getItem("ev_sid");
JSON.parse(evolokresponseObject).segments.forEach((el) => {
    if (el == "Subscriber") {
        datalayer_script_vars.userStatus = 'Subscriber';
    } else if (el != "Subscriber" && el == 'Authenticated') {
        datalayer_script_vars.userStatus = 'Authenticated';
    } else if (el == 'Not Authenticated') {
        datalayer_script_vars.userStatus = 'Not Authenticated';
    }
});
if(JSON.parse(evolokresponseObject).exceededMeter){
    datalayer_script_vars.freearticlesCount = JSON.parse(evolokresponseObject).exceededMeter.max;
} else if(JSON.parse(evolokresponseObject).activeMeter){
    datalayer_script_vars.freearticlesCount = JSON.parse(evolokresponseObject).activeMeter.max;

    if(datalayer_script_vars.userStatus == 'Authenticated' || datalayer_script_vars.userStatus == 'Subscriber') {
        datalayer_script_vars.freeArticlesLeftAuthenticated =  JSON.parse(evolokresponseObject).activeMeter.max - JSON.parse(evolokresponseObject).activeMeter.count;
    } else if (datalayer_script_vars.userStatus == 'Not Authenticated') {
        datalayer_script_vars.freeArticlesLeftAnonymous =  JSON.parse(evolokresponseObject).activeMeter.max - JSON.parse(evolokresponseObject).activeMeter.count;
    }
}
let newURL = location.href.split("?website_component")[0];
window.history.pushState('object', document.title, newURL);
window.dataLayer = window.dataLayer || [];
window.dataLayer.push(
    datalayer_script_vars
);


