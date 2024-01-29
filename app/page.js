"use client";

import { useEffect, useState } from "react";
export default function Mogoi() {
  const [isSpaceClicked, setIsSpaceClicked] = useState(false);
  const [currentKey, setCurrentKey] = useState();
  const [currentpos, setCurrentPos] = useState();

  function handleSnake() {}

  useEffect(() => {
    if (document) {
      document.onkeydown = (e) => {
        if (e.key === " ") {
          setIsSpaceClicked(true);
        }
        if (e.key === "ArrowRight") {
          setCurrentKey("translateX(20px)");
        }
        if (e.key === "ArrowLeft") {
          setCurrentKey("translateX(-20px)");
        }
        if (e.key === "ArrowUp") {
          setCurrentKey("translateY(-20px)");
        }
        if (e.key === "ArrowDown") {
          setCurrentKey("translateY(20px)");
        }
      };
    }
  }, []);
  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw]">
      {isSpaceClicked ? null : <div>press space to start</div>}
      {isSpaceClicked ? (
        <div className="w-[500px] h-[500px] bg-[#2c2c2c] rounded-[20px] flex justify-center items-center">
          <div
            style={{ transform: currentKey }}
            className="h-[20px] w-[20px] bg-[red]"
          ></div>
        </div>
      ) : null}
    </div>
  );
}
