"use client";
import { useFormStatus } from "react-dom";
import React from "react";

export default function FormSubmit() {
  const style = {
    width: "180px",
    height: " 60px",
    margin: "auto",
    backgroundColor: "var(--colour-sage)",
    color: "white",
    border: "none",
    marginTop: "30px",
    fontSize: "large",
  };

  const { pending } = useFormStatus();

  return (
    <button style={style} disabled={pending}>
      {pending ? "Submitting...." : "Reserve"}
    </button>
  );
}
