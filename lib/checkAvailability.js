import getReservations from "./getReservations";

export default async function checkAvailability(value) {
  let timeSlots = {};

  const openingTime = "11:00";
  let closingTime = "23:00";
  let formattedDate = "";

  if (value !== "0") {
    const date = new Date(value);
    const day = date.getDate().toString().padStart(2, "0"); // Παίρνουμε την ημέρα
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Παίρνουμε τον μήνα (0-based index)
    const year = date.getFullYear(); // Παίρνουμε το έτος
    formattedDate = `${day}/${month}/${year}`;

    if (date.getDay() === 0) {
      closingTime = "22:00";
    }
  }

  const dateOp = new Date(`1970-01-01T${openingTime}`);
  const dateCl = new Date(`1970-01-01T${closingTime}`);
  let slotStart = dateOp;
  let slotEnd = new Date(dateOp.getTime() + 2 * 60 * 60 * 1000);

  //create initial timeSlots
  while (slotEnd <= dateCl) {
    let key = `${slotStart.getHours()}:${slotStart
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    timeSlots[key] = 10;
    slotEnd = new Date(slotEnd.getTime() + 0.5 * 60 * 60 * 1000);
    slotStart = new Date(slotStart.getTime() + 0.5 * 60 * 60 * 1000);
  }

  if (value === "0") {
    return Object.keys(timeSlots);
  }

  const data = await getReservations(formattedDate);
  if (data.length === 0) {
    // if there arent any reservations on this date
    return Object.keys(timeSlots);
  } else {
    data.forEach((t) => {
      let time = t.time;
      let reservedTime = new Date(`1970-01-01T${time}`);
      let reservedEndTime = new Date(
        reservedTime.getTime() + 2 * 60 * 60 * 1000
      );
      slotStart = new Date(`1970-01-01T${openingTime}`);
      // dateCl = new Date(`1970-01-01T${closingTime}`);
      slotEnd = new Date(slotStart.getTime() + 2 * 60 * 60 * 1000);

      while (slotEnd <= dateCl) {
        if (
          (reservedTime >= slotStart && reservedTime <= slotEnd) ||
          (slotStart > reservedTime && slotStart < reservedEndTime)
        ) {
          let key = `${slotStart.getHours()}:${slotStart
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
          timeSlots[key] -= 1;
        }
        slotStart = new Date(slotStart.getTime() + 0.5 * 60 * 60 * 1000);
        slotEnd = new Date(slotEnd.getTime() + 0.5 * 60 * 60 * 1000);
      }
    });
    return Object.keys(timeSlots).filter((slot) => timeSlots[slot] > 5);
  }
}
