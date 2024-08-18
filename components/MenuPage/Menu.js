"use client";
import React, { useEffect, useRef } from "react";
import classes from "./Menu.module.css";
import { animateMenu } from "@/lib/animations";

 
export default function Menu({ menu, specialMenu }) {
  const specialMenuRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    animateMenu(menuRef, specialMenuRef);
  }, []);

  return (
    <section className="container">
      <h2 className={classes["menu-title"]}>Loose leaf teas</h2>
      <div ref={menuRef}>
        {menu.map((item) => {
          return (
            <div key={item.name}>
              <h5 className={classes["menu-name"]}>{item.name}</h5>
              <div className={classes["menu-item"]}>
                <p className={`${classes["menu-description"]} p--lg`}>
                  {item.description}
                </p>
                <h5>£{item.price}</h5>
              </div>
            </div>
          );
        })}
      </div>
      <div ref={specialMenuRef}>
        <div className={classes["special-menu"]}>
          <h2>Special this week...</h2>
        </div>
        <div className={classes["special-menu-items"]}>
          {specialMenu.map((item) => {
            return (
              <div key={item.name}>
                <h5 className={classes["menu-name"]}>{item.name}</h5>
                <div className={classes["menu-item"]}>
                  <p className={`${classes["menu-description"]} p--lg`}>
                    {item.description}
                  </p>
                  <h5>£{item.price}</h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
