var numberOfDispatchTypes = document.querySelectorAll(".dispatch").length;

console.log(numberOfDispatchTypes);

for (let i = 0; i < numberOfDispatchTypes; i++) {
  document
    .querySelectorAll(".dispatch")
    [i].addEventListener("click", function () {
      var dispatchType = this.innerHTML;
      dispatchCall(dispatchType);
    });
}

// Get key press
document.addEventListener("keypress", function (event) {
  switch (event.key) {
    case "m":
      dispatchCall("Medical");
      break;

    case "f":
      dispatchCall("Fire");
      break;

    case "v":
      dispatchCall("MVC");
      break;

    case "c":
      "Cardiac Arrest";
      break;
  }
});

function dispatchCall(dispatchType) {
  let dispatchMessage = document.querySelector(".dispatch-message");

  switch (dispatchType) {
    case "Medical":
      dispatchMessage.innerHTML = "Medical Call Dispatched";
      break;
    case "Fire":
      dispatchMessage.innerHTML = "Fire Assignment Dispatched";
      break;
    case "MVC":
      dispatchMessage.innerHTML = "MVC Assignment Dispatched";
      break;
    case "Cardiac Arrest":
      dispatchMessage.innerHTML = "Cardiac Arrest Assignment Dispatched";
      break;
    default:
      console.log("Unknown dispatch type: " + dispatchType);
  }

  let alertScreen = document.querySelector(".screen");
  alertScreen.classList.add("screen-alert");

  setTimeout(function () {
    alertScreen.classList.remove("screen-alert");
  }, 300);
}
