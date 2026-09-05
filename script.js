var numberOfDispatchTypes = document.querySelectorAll(".dispatch").length;

console.log(numberOfDispatchTypes);

for (let i = 0; i < numberOfDispatchTypes; i++) {
  document
    .querySelectorAll(".dispatch")
    [i].addEventListener("click", function () {
      console.log("I just got clicked!");
      console.log(this);
      var dispatchType = this.innerHTML;
      console.log(dispatchType);
    });
}
