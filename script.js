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
      dispatchCall("Cardiac Arrest");
      break;
  }
});

function dispatchCall(dispatchType) {
  let dispatchMessage = document.querySelector(".dispatch-message");

  switch (dispatchType) {
    case "Medical":
      // Randomize the call type
      const randomMedicalIndex = Math.floor(
        Math.random() * medicalComplaints.length,
      );

      const randomMedicalComplaint = medicalComplaints[randomMedicalIndex];

      //   generate random age
      let randomPatientAge = generateAge();

      //   randomize patient sex
      const generatedPatientSex = generateSex();

      //   Generate patient
      const generatedPatient = new Patient(
        randomMedicalComplaint,
        randomPatientAge,
        generatedPatientSex,
      );

      //   Generate Address

      const generatedAddress = generateAddress();
      // generate message
      dispatchMessage.innerHTML =
        "Medical Call Dispatched - " +
        generatedPatient.complaint +
        " - Age: " +
        generatedPatient.age +
        " - " +
        generatedPatient.sex +
        " - Address: " +
        generatedAddress;
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

// Create Medical Complaints
const medicalComplaints = [
  "Chest pain",
  "Difficulty Breathing",
  "Abdominal Pain",
  "Altered Mental Status",
];

// Patient Sex
const patientSex = ["Male", "Female"];

// Constructor for patient
function Patient(complaint, age, sex) {
  this.complaint = complaint;
  this.age = age;
  this.sex = sex;
}

// Addresses
const streetNames = [
  "Oak Street",
  "Main Street",
  "Maple Avenue",
  "Washington Street",
  "Valley Road",
];

// Generate Random Address
function generateAddressNumber() {
  let randomAddressNumber = Math.floor(Math.random() * 9999) + 1;
  return randomAddressNumber;
}
function generateStreet() {
  let randomStreet = Math.floor(Math.random() * streetNames.length);
  return streetNames[randomStreet];
}

function generateAddress() {
  let addressNumber = generateAddressNumber();
  let streetName = generateStreet();
  return addressNumber + " " + streetName;
}

// Generate Random Age
function generateAge() {
  let randomPatientAge = Math.floor(Math.random() * 100) + 1;
  return randomPatientAge;
}

// Generate Random Sex
function generateSex() {
  const randomSex = Math.floor(Math.random() * patientSex.length);
  return patientSex[randomSex];
}

console.log(generateAddress());
