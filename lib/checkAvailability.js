import getReservations from "./actions";

export default async function checkAvailability(value) {
  let timeSlots = [];

  const openingTime = "11:00";
  let closingTime = "23:00";
  let formattedDate = "0";

  if (value !== "0") {
    const date = new Date(value);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    formattedDate = `${day}/${month}/${year}`;

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

  const data = await getReservations(formattedDate);
  while (dateX1 <= dateCl && dateXPlus1 < dateCl) {
    let key = `${dateX1.getHours()}:${dateX1
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    timeSlots[key] = 10;

    dateXPlus1 = new Date(dateXPlus1.getTime() + 0.5 * 60 * 60 * 1000);
    dateX1 = new Date(dateX1.getTime() + 0.5 * 60 * 60 * 1000);
  }

  if (value === "0") {
    Object.entries(timeSlots)
      .filter(([key, value]) => value > 0)
      .map(([key, value]) => {
        slots.push(key);
      });

    return slots;
  }
  if (data.length === 0) {
    Object.entries(timeSlots)
      .filter(([key, value]) => value > 5)
      .map(([key, value]) => {
        slots.push(key);
      });

    return slots;
  } else {
    data.map((r) => {
      let z = r.time;

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

          timeSlots[key] -= 1;
        }
        dateTime = new Date(dateTime.getTime() + 0.5 * 60 * 60 * 1000);
        dateTimePlus2 = new Date(
          dateTimePlus2.getTime() + 0.5 * 60 * 60 * 1000
        );
      }
    });

    Object.entries(timeSlots)
      .filter(([key, value]) => value > 0)
      .map(([key, value]) => {
        slots.push(key);
      });
    console.log(slots);
    return slots;
  }
}
