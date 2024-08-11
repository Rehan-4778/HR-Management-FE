import React from "react";
import { useSelector } from "react-redux";
import { Puff } from "react-loader-spinner";
import "./Loader.css";

const Loader = () => {
  const isLoading = useSelector((state) => state.loading);

  if (!isLoading) return null;

  return (
    <div className="loader-overlay">
      <Puff
        visible={true}
        height="80"
        width="80"
        className="text-green1"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
