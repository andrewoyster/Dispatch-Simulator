// Dispatch Simulator v1

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

      //   Generate Call
      const generatedCall = new Call("Medical", generatedAddress, [
        generatedPatient,
      ]);
      // generate message
      dispatchMessage.innerHTML = `
        > Medical Call Dispatched
        <br>
        > Address: ${generatedCall.address}
        <br>
        > Chief Complaint: ${generatedCall.patients[0].complaint}
        <br>
        > Age: ${generatedCall.patients[0].age}
        <br>
        > Sex: ${generatedCall.patients[0].sex}
        <br>
        `;
      break;
    case "Fire":
      // randomize fire calls
      const randomFireIndex = Math.floor(Math.random() * fireCallTypes.length);

      const randomFireCall = fireCallTypes[randomFireIndex];

      // Randomize Occupancy
      const randomOccupancyIndex = Math.floor(
        Math.random() * occupancyType.length,
      );

      const randomOccupancy = occupancyType[randomOccupancyIndex];

      const fireAddress = generateAddress();

      dispatchMessage.innerHTML = `
      > Fire Assignment Dispatched
      <br>
      > Incident Type: ${randomFireCall}
      <br>
      > Address: ${fireAddress}
      <br>
      > Occupancy: ${randomOccupancy}`;
      break;
    case "MVC":
      // Generate random amount of patients
      const numberOfPatients = Math.floor(Math.random() * 4) + 1;
      // Generate random numnber of vehicles
      const numberOfVehicles = Math.floor(Math.random() * 4) + 1;

      // Entrapment values
      const entrapment = Math.random() < 0.5;

      // Create MVCDetails object
      const generatedMVCDetails = new MVCDetails(numberOfVehicles, entrapment);

      // Generate MVC address
      const mvcAddress = generateAddress();

      // Create patient array
      const mvcPatients = [];

      for (let i = 0; i < numberOfPatients; i++) {
        const MVCPatientAge = generateAge();
        const MVCPatientSex = generateSex();

        // Create patient
        const mvcPatient = new Patient("MVC", MVCPatientAge, MVCPatientSex);

        // Push new patient into array
        mvcPatients.push(mvcPatient);
      }

      // Generate MVC Call
      const generatedMVCCall = new Call(
        "MVC",
        mvcAddress,
        mvcPatients,
        generatedMVCDetails,
      );

      // Change Patient or Patients / vehicle or vehicles
      let patientLabel;

      if (generatedMVCCall.patients.length === 1) {
        patientLabel = "Patient";
      } else {
        patientLabel = "Patients";
      }

      let vehicleLabel;

      if (generatedMVCCall.details.vehicles === 1) {
        vehicleLabel = "Vehicle";
      } else {
        vehicleLabel = "Vehicles";
      }

      // Entrapment
      let entrapmentMessage;

      if (generatedMVCCall.details.entrapment) {
        entrapmentMessage = "Possible Entrapment";
      } else {
        entrapmentMessage = "No Reported Entrapment";
      }

      dispatchMessage.innerHTML = `
        > MVC Assignment Dispatched
        <br>
        > Address: ${generatedMVCCall.address}
        <br>
        > Patients: ${generatedMVCCall.patients.length} ${patientLabel}
        <br>
        > Vehicles Involved: ${generatedMVCCall.details.vehicles} ${vehicleLabel}
        <br>
        > Entrapment: ${entrapmentMessage}`;
      break;
    case "Cardiac Arrest":
      // patient age and sex
      const arrestPatientAge = generateAge();
      const arrestPatientSex = generateSex();

      // Create new patient
      const arrestPatient = new Patient(
        "Cardiac Arrest",
        arrestPatientAge,
        arrestPatientSex,
      );

      const arrestAddress = generateAddress();
      // Generate call
      const generatedArrestCall = new Call("Cardiac Arrest", arrestAddress, [
        arrestPatient,
      ]);
      // Generate arrest message
      dispatchMessage.innerHTML = `> Cardiac Arrest Assignment Dispatched 
      <br>
      > Address: ${generatedArrestCall.address}
      <br>
      > Age:  ${generatedArrestCall.patients[0].age}
      <br>
      > Sex: ${generatedArrestCall.patients[0].sex}
      
      `;
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

// Create Fire Call Types
const fireCallTypes = [
  "Structure Fire",
  "Vehicle Fire",
  "Brush Fire",
  "Automatic Fire Alarm",
  "Smoke Investigation",
];

// Create Occuupancy Type
const occupancyType = ["Residential", "Commercial", "Industrial"];

// Patient Sex
const patientSex = ["Male", "Female"];

// Call Constructor
function Call(type, address, patients, details) {
  this.type = type;
  this.address = address;
  this.patients = patients;
  this.details = details;
}

// Constructor for patient
function Patient(complaint, age, sex) {
  this.complaint = complaint;
  this.age = age;
  this.sex = sex;
}

// Create MVC Constructor
function MVCDetails(vehicles, entrapment) {
  this.vehicles = vehicles;
  this.entrapment = entrapment;
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
