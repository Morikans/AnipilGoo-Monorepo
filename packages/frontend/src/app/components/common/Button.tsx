import React, { FC } from "react";

type ButtonProps = {
  text: string;
  btnColor?: "white" | "blown";
};

export const Button: FC<ButtonProps> = ({ text, btnColor }) => {
  let color: string = "white";
  switch (btnColor) {
    case "white":
      color = "bg-white text-black";
      break;
    case "blown":
      color = "bg-secondary text-white";
      break;
  }
  return (
    <button
      className={`${color} cursor-pointer rounded-md p-2 w-full`}
      type="submit"
    >
      {text}
    </button>
  );
};
