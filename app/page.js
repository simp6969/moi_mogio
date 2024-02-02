"use client";

import { useEffect, useState } from "react";
export default function Mogoi() {
  const [isSpaceClicked, setIsSpaceClicked] = useState(false);
  const [x, setX] = useState(12);
  const [y, setY] = useState(12);
  const [direction, setDirection] = useState();
  const [applePos, setApplePos] = useState({
    right: Math.floor(Math.random() * 48),
    top: Math.floor(Math.random() * 48),
  });
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
  }, [isSpaceClicked, direction, x, y]);

  useEffect(() => {
    console.log(applePos);
    console.log(x, y);
    if (x * 10 - 10 === applePos.right && applePos.top === y * 10) {
      setApplePos({
        right: Math.floor(Math.random() * 48),
        top: Math.floor(Math.random() * 48),
      });

      setSnakeTail((prev) => [...prev, { x, y }]);
    }
  }, [x, y]);

  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw]">
      {isSpaceClicked ? null : <div>press space to start</div>}
      {isSpaceClicked ? (
        <div className="w-[500px] h-[500px] bg-[#2c2c2c] relative">
          <div
            style={{ position: "absolute", top: y * 10, left: x * 10 }}
            className="h-[10px] w-[10px] bg-[green]"
          ></div>

          {snake.map((e) => {
            return (
              <div
                style={{ position: "absolute", top: e.y * 10, left: e.x * 10 }}
                className="h-[10px] w-[10px] bg-[orange]"
              ></div>
            );
          })}

          <div
            className="h-[10px] w-[10px] bg-[red]"
            style={{
              position: "absolute",
              // top: applePos.top,
              // left: applePos.right,
            }}
          ></div>
        </div>
      ) : null}
    </div>
  );
}
