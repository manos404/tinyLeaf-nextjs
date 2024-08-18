export function isNotEmpty(value) {
  return value.length === 0;
  //   return value.trim() !== "";
}
export function minLength(value, minLength) {
  return value.length >= minLength;
}

export function maxSize(value, maxSize) {
  return value <= maxSize;
}

export function isPhoneNumber(value) {
  return /^\d{10}$/.test(value);
}

export function checkSizeInput(identifier, value, setError) {
  if (value === "") {
    setError((prevErrors) => ({
      ...prevErrors,
      [identifier]: `the ${identifier} is required`,
    }));
  } else if (value <= 0 || value > 6) {
    setError((prevErrors) => ({
      ...prevErrors,
      [identifier]: `the ${identifier} must be between 1- 6 `,
    }));
  } else {
    setError((prevErrors) => ({
      ...prevErrors,
      [identifier]: ``,
    }));
  }
}
export function checkNameInput(identifier, value, setError) {
  if (value === "") {
    setError((prevErrors) => ({
      ...prevErrors,
      [identifier]: `the ${identifier} is required`,
    }));
  } else if (!/^.{5,}$/.test(value)) {
    setError((prevErrors) => ({
      ...prevErrors,
      [identifier]: `the  ${identifier} is too short`,
    }));
  } else {
    setError((prevErrors) => ({
      ...prevErrors,
      [identifier]: ``,
    }));
  }
}

export function checkPhonerInput(identifier, value, setError) {
  if (value === "") {
    setError((prevErrors) => ({
      ...prevErrors,
      [identifier]: `the ${identifier} is required`,
    }));
  } else if (!/^\d{10}$/.test(value)) {
    setError((prevErrors) => ({
      ...prevErrors,
      [identifier]: `the ${identifier} must be 10 numbers`,
    }));
  } else {
    setError((prevErrors) => ({
      ...prevErrors,
      [identifier]: ``,
    }));
  }
}

export function checkDateInput(identifier, value, setError, today) {
  const d1 = new Date(value);
  const d2 = new Date(today);
  if (value === "") {
    setError((prevErrors) => ({
      ...prevErrors,
      [identifier]: `the ${identifier} is required`,
    }));
  }
}

export function checkTimeInput(identifier, value, setError, day) {
  let startTime;
  let finishTime;
  setError((prevErrors) => ({
    ...prevErrors,
    ["time"]: "",
  }));
  if (day === 0) {
    startTime = "11:00"; //Reservation hours on Sunday
    finishTime = "22:00";
  } else {
    startTime = "11:00";
    finishTime = "23:00";
  }

  if (value === "") {
    setError((prevErrors) => ({
      ...prevErrors,
      [identifier]: `the ${identifier} is required`,
    }));
  } else if (value < startTime || value > finishTime) {
    setError((prevErrors) => ({
      ...prevErrors,
      [identifier]: `Res. hours ${startTime}-${finishTime} `,
    }));
  }
}
