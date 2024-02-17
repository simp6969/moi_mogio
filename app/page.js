"use client";

import { useEffect, useState } from "react";
export default function Mogoi() {
  const [isSpaceClicked, setIsSpaceClicked] = useState(false);
  const [x, setX] = useState(24);
  const [y, setY] = useState(24);
  const [direction, setDirection] = useState();
  const [applePos, setApplePos] = useState({
    right: Math.floor(Math.random() * 48),
    top: Math.floor(Math.random() * 48),
  });
  const [suicide, setSuicide] = useState(false);
  const [snake, setSnakeTail] = useState([]);

  useEffect(() => {
    if (document) {
      document.onkeydown = (e) => {
        if (e.key === " ") {
          setIsSpaceClicked(true);
          setDirection("x");
        }
        if (e.key === "ArrowRight") {
          setDirection("x");
        }
        if (e.key === "ArrowLeft") {
          setDirection("-x");
        }
        if (e.key === "ArrowUp") {
          setDirection("y");
        }
        if (e.key === "ArrowDown") {
          setDirection("-y");
        }
      };
    }
  }, []);
  useEffect(() => {
    const intervalValue = setInterval(() => {
      if (!isSpaceClicked) return;

      if (direction === "-y") {
        setY((y) => {
          if (y + 1 > 48) return 0;
          return y + 1;
        });
      }
      if (direction === "y") {
        setY((y) => {
          if (y - 1 < 0) return 48;
          return y - 1;
        });
      }
      if (direction === "-x") {
        setX((x) => {
          if (x - 1 < 0) return 48;
          return x - 1;
        });
      }
      if (direction === "x") {
        setX((x) => {
          if (x + 1 > 48) return 0;
          return x + 1;
        });
      }

      setSnakeTail((prev) => {
        return prev.map((_, index) =>
          index === 0
            ? { x, y }
            : { x: prev[index - 1].x, y: prev[index - 1].y }
        );
      });
    }, 100);

    return () => {
      clearInterval(intervalValue);
    };
  }, [isSpaceClicked, direction, x, y, snake]);

  useEffect(() => {
    if (applePos.right === x && applePos.top === y) {
      setApplePos({
        right: Math.floor(Math.random() * 48),
        top: Math.floor(Math.random() * 48),
      });
      setSnakeTail((prev) => [...prev, { x, y }]);
    }
  }, [x, y]);
  if (suicide) {
    return <div>Game Over score: score</div>;
  }

  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw] ">
      {isSpaceClicked ? null : <div>press space to start</div>}
      {isSpaceClicked ? (
        <div className="w-[500px] h-[500px] bg-[#2c2c2c] relative border-2 border-[white]">
          <div
            style={{ position: "absolute", top: y * 10, left: x * 10 }}
            className="h-[10px] w-[10px] bg-[green]"
          ></div>

          {snake.map((e, index) => {
            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  top: e.y * 10,
                  left: e.x * 10,
                }}
                className="h-[10px] w-[10px] bg-[green]"
              ></div>
            );
          })}

          <div
            className="h-[10px] w-[10px] bg-[red]"
            style={{
              position: "absolute",
              top: applePos.top * 10,
              left: applePos.right * 10,
            }}
          ></div>
        </div>
      ) : null}
    </div>
  );
}
