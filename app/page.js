"use client";

import { useEffect, useState } from "react";
export default function Mogoi() {
  const [isSpaceClicked, setIsSpaceClicked] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [playerDied, setPlayerDied] = useState(false);
  useEffect(() => {
    if (document) {
      document.onkeydown = (e) => {
        if (e.key === " ") {
          setIsSpaceClicked(true);
        }
        if (e.key === "ArrowRight") {
          setX(x + 1);
        }
        if (e.key === "ArrowLeft") {
          setX(x - 1);
        }
        if (e.key === "ArrowUp") {
          setY(y - 1);
        }
        if (e.key === "ArrowDown") {
          setY(y + 1);
        }
      };
    }
    if (y > 24) {
      setY(-24);
    }
    if (y < -24) {
      setY(24);
    }
    if (x > 24) {
      setX(-24);
    }
    if (x < -24) {
      setX(24);
    }
  }, [x, y]);
  console.log(x, y);
  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw]">
      {isSpaceClicked ? null : <div>press space to start</div>}
      {isSpaceClicked ? (
        <div className="w-[500px] h-[500px] bg-[#2c2c2c] rounded-[20px] flex justify-center items-center">
          <div
            style={{ position: "relative", top: y * 10, left: x * 10 }}
            className="h-[20px] w-[20px] bg-[red]"
          ></div>
        </div>
      ) : null}
    </div>
  );
}
