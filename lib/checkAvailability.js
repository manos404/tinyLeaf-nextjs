import getReservations from "./actions";

export default async function checkAvailability(value) {
  // console.log("value");
  // console.log(value);
  // console.log(typeof(value));
  let timeSlots = [];

  const openingTime = "11:00";
  let closingTime = "23:00";
  let formattedDate = "0";
  // console.log(typeof value);
  if (value !== "0") {
    const date = new Date(value);
    const day = date.getDate().toString().padStart(2, "0"); // Παίρνουμε την ημέρα
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Παίρνουμε τον μήνα (0-based index)
    const year = date.getFullYear(); // Παίρνουμε το έτος
    formattedDate = `${day}/${month}/${year}`;

    // console.log("day" +value.getDay() );
    // console.log("value" + value);
    if (date.getDay() === 0) {
      closingTime = "22:00";
    }
  }

  let dateOp = new Date(`1970-01-01T${openingTime}`);
  let dateCl = new Date(`1970-01-01T${closingTime}`);
  let dateXPlus = new Date(dateOp.getTime() + 2 * 60 * 60 * 1000);
  let dateX1 = dateOp;
  let dateXPlus1 = dateXPlus;
  let slots = [];

  const data = await getReservations(formattedDate); // Μπορεί να είναι οποιαδήποτε λειτουργία fetch
  // console.log( data);

  while (dateX1 <= dateCl && dateXPlus1 < dateCl) {
    // time.push()
    let key = `${dateX1.getHours()}:${dateX1
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    timeSlots[key] = 10;

    dateXPlus1 = new Date(dateXPlus1.getTime() + 0.5 * 60 * 60 * 1000);
    dateX1 = new Date(dateX1.getTime() + 0.5 * 60 * 60 * 1000);
  }
  //   console.log(time);
  if (value === "0") {
    Object.entries(timeSlots)
      .filter(([key, value]) => value > 5) // Φιλτράρουμε σύμφωνα με την τιμή
      .map(([key, value]) => {
        slots.push(key);
      });
    // console.log(slots);

    return slots;
  }
  if (data.length === 0) {
    Object.entries(timeSlots)
      .filter(([key, value]) => value > 5) // Φιλτράρουμε σύμφωνα με την τιμή
      .map(([key, value]) => {
        slots.push(key);
      });
    // console.log(slots);

    return slots;
  } else {
    data.map((r) => {
      let z = r.time;

      // for (let i = 0; i < arr.length; i++) {
      // let z = arr[i];
      let timeCheck = new Date(`1970-01-01T${z}`);
      let timeCheckPlus2 = new Date(timeCheck.getTime() + 2 * 60 * 60 * 1000);
      let dateTime = new Date(`1970-01-01T${openingTime}`);
      dateCl = new Date(`1970-01-01T${closingTime}`);
      let dateTimePlus2 = new Date(dateTime.getTime() + 2 * 60 * 60 * 1000);
      while (
        dateTime <= dateCl &&
        dateTimePlus2 <= dateCl &&
        dateTimePlus2 < dateCl
      ) {
        if (
          (timeCheck >= dateTime && timeCheck <= dateTimePlus2) ||
          (dateTime > timeCheck && dateTime <= timeCheckPlus2)
        ) {
          let key = `${dateTime.getHours()}:${dateTime
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
          // check if time[key]-1===0
          timeSlots[key] -= 1;
          //    newArr.push( `${dateX.getHours()}:${dateX.getMinutes().toString().padStart(2, "0")}`)
        }
        dateTime = new Date(dateTime.getTime() + 0.5 * 60 * 60 * 1000);
        dateTimePlus2 = new Date(
          dateTimePlus2.getTime() + 0.5 * 60 * 60 * 1000
        );
      }
      //   time= time.filter(item => newArr.includes(item));
    });
    //   console.log(timeSlots);
    Object.entries(timeSlots)
      .filter(([key, value]) => value > 5) // Φιλτράρουμε σύμφωνα με την τιμή
      .map(([key, value]) => {
        slots.push(key);
      });
    console.log(slots);
    return slots;
  }
}
