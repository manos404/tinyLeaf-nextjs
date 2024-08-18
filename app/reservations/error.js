"use client";
export default function Error({ error }) {
  console.log(error);
  return (
    <div
      style={{
        textAlign: "center",
        // height: "calc(100vh - 300px)",
        minHeight: "300px",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <h2>Error</h2>
      <br></br>
      <p>Failed to do the reservation, please try again later</p>
    </div>
  );
}
