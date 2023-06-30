import React from "react";
import loader from "../media/loader.gif";

export default function Spinner() {
  return (
    <div className="text-center my-5">
      <img className="my-5" src={loader} alt="buffering" />
    </div>
  );
}
