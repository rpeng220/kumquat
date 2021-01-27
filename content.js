var isWorkdayload = false;
var taleoflag = false;


function createPopup(system) {
  let overlayDiv = document.createElement('DIV');
  overlayDiv.id = "kumquatOverlay";
  document.body.insertBefore(overlayDiv, document.body.firstChild);
  let kumquatTree = document.createElement('IMG');
  kumquatTree.id = "kumquatTree";
  kumquatTree.src = chrome.extension.getURL("kumquat_tree.png");
  let popupCTA = document.createElement('DIV');
  popupCTA.id = "popupText";
  popupCTA.innerHTML = "Autofill Compatible!"
  let buttonText = document.createElement('BUTTON');
  buttonText.id = "kumquatButton";
  buttonText.innerHTML = 'Autofill Application'
  let popupClose = document.createElement('DIV');
  popupClose.id = "popupClose";
  popupClose.innerHTML = "Try Later"
  overlayDiv.appendChild(kumquatTree);
  overlayDiv.appendChild(popupCTA);
  overlayDiv.appendChild(buttonText);
  overlayDiv.appendChild(popupClose);
  popupClose.onclick = function() { overlayDiv.remove(); };
  buttonText.onclick = function() {
    overlayDiv.remove();
    switch(system) {
      case "workday":
        return workday();
        break;
      case "taleo":
        return taleo();
        break;
      case "greenhouse":
        return greenhouse();
        break;
      case "lever":
        return lever();
        break;
    } 
  }
}

window.addEventListener('load', function() {
  console.log(document.readyState);
  isWorkdayload = false;
  var currenturl = window.location.toString();
  if (existsquery("input[id='first_name']")) {
    console.log("success2");
    createPopup("greenhouse")
    // greenhouse();
  }
  if (window.location.toString().includes("myworkdayjobs")) {
    console.log("workday detected");
    createPopup("workday");
    // setTimeout(function() {workday()}, 15000);
  }
  if (window.location.toString().includes("taleo") && taleoflag == false) {
    console.log("taleo detected");
    createPopup("taleo");
    // setTimeout(function() {taleo()}, 8000);
  }
  if (currenturl.includes('lever.co') && currenturl.includes('/apply')) {
    console.log("lever detected")
    createPopup("lever");
    // setTimeout(function() {lever()}, 5000);
  }
});


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === 'TabUpdated') {
      console.log(document.location.href);
    }
  })