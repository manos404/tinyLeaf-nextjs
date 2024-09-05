"use client";
import React, { useEffect, useRef, useState } from "react";
import classes from "./ReservationForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  checkSizeInput,
  checkNameInput,
  checkDateInput,
  checkTimeInput,
  checkPhonerInput,
} from "@/util/validation";
import smallIcon from "@/images/form-icons/EllipseSmall.png";
import bigIcon from "@/images/form-icons/EllipseBig.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { saveReservation } from "@/lib/insertReservation";
import { animateFormIcons } from "@/lib/animations";
import FormSubmit from "./form-submit";
import checkAvailability from "@/lib/checkAvailability";
import Modal from "./Modal";
import Image from "next/image";

export default function ReservationForm({ slots }) {
  const today = new Date();
  const smallIconRef = useRef(null);
  const bigIconRef = useRef(null);
  // console.log(slots);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    animateFormIcons(bigIconRef, smallIconRef);
  }, []);

  const [date, setDate] = useState();
  const [timeSlots, setTimeSlots] = useState(slots);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  const [enteredValues, setEnteredValues] = useState({
    date: "",
    time: "",
    size: "",
    name: "",
    number: "",
    comments: "",
    checkbox: "",
  });
  const [error, setError] = useState({
    date: "",
    time: "",
    size: "",
    name: "",
    phone: "",
    checkbox: "",
  });

  async function handleInputChange(identifier, value) {
    // console.log(typeof(value));
    if (identifier === "date") {
      // console.log(formattedDate);
      // console.log("mera"+date.getDay());//////if mera kiriaki----------------------------------------------------------------
      const slots = await checkAvailability(value);
      // console.log(slots);
      // console.log(formattedDate);
      setTimeSlots(slots);
      // console.log(Object.entries(slots));
      // const a = Object.entries(slots)
      //   .filter(([key, value]) => value > 5) // Φιλτράρουμε σύμφωνα με την τιμή
      //   .map(([key, value]) => {
      //     arr.push(key);
      //   });
      // setTimeSlots(arr);
    }

    if (identifier === "checkbox" && value === false) {
      setError((prevErrors) => ({
        ...prevErrors,
        [identifier]: `please accept the Terms`,
      }));
      return;
    }
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setError((prevErrors) => ({
      ...prevErrors,
      [identifier]: ``,
    }));
  }

  function handleInputBlur(identifier, value) {
    if (identifier === "size") {
      checkSizeInput(identifier, value, setError);
    } else if (identifier === "name") {
      checkNameInput(identifier, value, setError);
    } else if (identifier === "phone") {
      checkPhonerInput(identifier, value, setError);
    } else if (identifier === "date") {
      checkDateInput(identifier, value, setError, today);
      if (enteredValues.time) {
        const d1 = new Date(value);
        checkTimeInput("time", enteredValues.time, setError, d1.getDay());
      }
    } else if (identifier === "time") {
      if (enteredValues.date) {
        // console.log( enteredValues.date.getDay());
        checkTimeInput(
          identifier,
          value,
          setError,
          enteredValues.date.getDay()
        );
        return;
      }
      checkTimeInput(identifier, value, setError);
    }
  }

  const handleAction = async (e) => {
    const check = await saveReservation(e);
    if (check) {
      const data = {
        date: e.get("date"),
        time: e.get("time"),
        size: e.get("size"),
        name: e.get("name"),
        phone: e.get("phone"),
        comments: e.get("comments"),
      };
      setShowModal(true);
      setFormData(data);
    }
  };

  function handleSubmit(event) {
    // const data = {
    //   date: event.target.date.v,
    //   time: event.target.time,
    //   size: event.target.size,
    //   name: event.target.name,
    //   phone: event.target.phone,
    //   comments: event.target.comments,
    //   // comments: event.target.get("comments"),
    // };
    const fd = new FormData(event.target);
    let data = Object.fromEntries(fd.entries());
    data = {
      date: data.date,
      time: data.time,
      size: data.size,
      name: data.name,
      phone: data.phone,
      comments: data.comments,
    };
    // console.log(data.date);
    const updatedError = { ...error };
    for (let key in data) {
      if (data[key] === "" && key !== "comments") {
        updatedError[key] = `the ${key} is required`;
      }
    }
    setError(updatedError); // htan apo panv
    let allErrorsEmpty = Object.values(updatedError).every(
      (value) => value == ""
    );
    if (!allErrorsEmpty) {
      console.log("error");
      console.log(error);
      event.preventDefault();
      // return null;
    } else {
      console.log("submit");
      // reservationData(data);
    }
  }

  const generateTimeOptions = () => {
    const options = [];
    const start = 11; // Ώρα έναρξης
    const end = 21; // Ώρα λήξης
    for (let hour = start; hour <= end; hour++) {
      for (let minute of [0, 30]) {
        const time = `${String(hour).padStart(2, "0")}:${String(
          minute
        ).padStart(2, "0")}`;
        options.push(time);
      }
    }
    return options;
  };

  return (
    <section className={`${classes["form-wrapper"]}`}>
      <div
        className={`${classes["form-icon-1"]}`}
        classes={{ width: "80px", marginBottom: "20px" }}
      >
        <Image src={smallIcon} ref={smallIconRef} alt="" />
      </div>
      <div className={`${classes["form-wrapper-2"]}`}>
        <h3>Book a table</h3>
        <p className="p--reg">
          We take bookings for groups up to 6. We get busy on weekends so do
          book early to avoid disappointment.
        </p>

        <form action={handleAction} onSubmit={handleSubmit}>
          <div className={`${classes["form"]}`}>
            <div className={`${classes["group1"]}`}>
              <div className={`${classes["form-group"]}`}>
                <label className={`${classes["form-label"]}`} htmlFor="date">
                  Date
                </label>
                <div>
                  <DatePicker
                    className={`${classes["date"]}`}
                    selected={date}
                    id="date"
                    name="date"
                    dateFormat="dd/MM/yyyy"
                    minDate={today}
                    onChange={(date) => {
                      handleInputChange("date", date);
                      setDate(date);
                      // console.log(date);
                    }}
                    onBlur={(date) =>
                      handleInputBlur("date", date.target.value)
                    }
                  />
                  <div className={`${classes["control-error"]}`}>
                    <p className="p--sm">{error.date}</p>
                  </div>

                  {/* {startDate &&<div className="control-error">  <p>the date is required</p></div>} */}
                </div>
              </div>
              <div className={`${classes["form-group"]}`}>
                <label className={`${classes["form-label"]}`} htmlFor="time">
                  Time
                </label>

                <div>
                  <select
                    className={`${classes["time"]}`}
                    id="time"
                    name="time"
                    onChange={(event) => {
                      handleInputChange("time", event.target.value);
                    }}
                    onBlur={(event) => {
                      handleInputBlur("time", event.target.value);
                    }}
                  >
                    <option value=""></option>
                    {/* {generateTimeOptions().map((time, index) => ( */}

                    {timeSlots.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {/* <input
                    type="time"
                    className={`${classes["time"]}`}
                    id="time"
                    name="time"
                    onChange={(event) => {
                      handleInputChange("time", event.target.value);
                    }}
                    onBlur={(event) => {
                      handleInputBlur("time", event.target.value);
                    }}
                  /> */}
                  <div className={`${classes["control-error"]}`}>
                    <p className="p--sm">{error.time}</p>
                  </div>
                </div>
              </div>
              <div className={`${classes["form-group"]}`}>
                <label className={`${classes["form-label"]}`} htmlFor="size">
                  Group size
                </label>
                <div>
                  <select
                    id="size"
                    name="size"
                    className={`${classes["size"]}`}
                    onChange={(event) => {
                      handleInputChange("size", event.target.value);
                    }}
                    onBlur={(event) =>
                      handleInputBlur("size", event.target.value)
                    }
                  >
                    <option value=""></option>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  {/* <input
                    type="number"
                    className={`${classes["size"]}`}
                    id="size"
                    name="size"
                    onChange={(event) => {
                      handleInputChange("size", event.target.value);
                    }}
                    onBlur={(event) =>
                      handleInputBlur("size", event.target.value)
                    }
                  /> */}
                  <div className={`${classes["control-error"]}`}>
                    <p className="p--sm">{error.size}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${classes["group2"]}`}>
              <div className={`${classes["form-group"]}`}>
                <label className={`${classes["form-label"]}`} htmlFor="name">
                  Name
                </label>
                <div>
                  <input
                    type="text"
                    className={`${classes["name"]}`}
                    id="name"
                    name="name"
                    onChange={(event) => {
                      handleInputChange("name", event.target.value);
                    }}
                    onBlur={(event) =>
                      handleInputBlur("name", event.target.value)
                    }
                  />

                  <div className={`${classes["control-error"]}`}>
                    <p className="p--sm">{error.name}</p>
                  </div>
                </div>
              </div>
              <div className={`${classes["form-group"]}`}>
                <label className={`${classes["form-label"]}`} htmlFor="phone">
                  Contact number
                </label>
                <div>
                  <input
                    type="number"
                    className={`${classes["phone"]}`}
                    id="phone"
                    name="phone"
                    onChange={(event) => {
                      handleInputChange("phone", event.target.value);
                    }}
                    onBlur={(event) =>
                      handleInputBlur("phone", event.target.value)
                    }
                  />
                  <div className={`${classes["control-error"]}`}>
                    <p className="p--sm">{error.phone}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${classes["form-group"]}`}>
              <label className={`${classes["form-label"]}`} htmlFor="comments">
                Comments / requests
              </label>
              <textarea
                className={`${classes["comments"]}`}
                id="comments"
                name="comments"
              />
            </div>
            <div className={`${classes["terms"]}`}>
              <input
                type="checkbox"
                className={`${classes["check"]}`}
                defaultChecked
                id="checkbox"
                name="checkbox"
                onChange={(event) => {
                  handleInputChange("checkbox", event.target.checked);
                }}
              />
              <label className={`${classes["form-label"]}`} htmlFor="checkbox">
                By requesting this booking, I am accepting Tiny Leaf’s Terms and
                Conditions.
              </label>
            </div>
            <div className={`${classes["control-error"]}`}>
              <p className="p--sm">{error.checkbox}</p>
            </div>

            <FormSubmit />
          </div>
        </form>
      </div>
      <div className={`${classes["form-icon-2"]}`} classes={{ width: "250px" }}>
        <Image src={bigIcon} ref={bigIconRef} alt="" />
      </div>
      {showModal && (
        <Modal
          showModal={true}
          setShowModal={setShowModal}
          formData={formData}
        />
      )}
    </section>
  );
}
