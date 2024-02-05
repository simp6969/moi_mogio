"use client";

import { useEffect, useState } from "react";
export default function Mogoi() {
  const [mainPipe, setMainPipe] = useState({
    x: 24,
    y: 24,
    applePos: {
      right: Math.floor(Math.random() * 48),
      top: Math.floor(Math.random() * 48),
    },
    isSpaceClicked: false,
    snake: [],
  });
  const [x, setX] = useState(24);
  const [y, setY] = useState(24);
  const [direction, setDirection] = useState();
  const [snake, setSnakeTail] = useState([]);

  useEffect(() => {
    if (document) {
      document.onkeydown = (e) => {
        if (e.key === " ") {
          setMainPipe({ ...mainPipe, isSpaceClicked: true });
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
        if (e.key === "d") {
          setDirection("x");
        }
        if (e.key === "a") {
          setDirection("-x");
        }
        if (e.key === "w") {
          setDirection("y");
        }
        if (e.key === "s") {
          setDirection("-y");
        }
      };
    }
  }, []);
  useEffect(() => {
    const intervalValue = setInterval(() => {
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
  }, [mainPipe.isSpaceClicked, direction, x, y]);

  useEffect(() => {
    if (mainPipe.applePos.right === x && mainPipe.applePos.top === y) {
      setMainPipe({
        ...mainPipe,
        applePos: {
          right: Math.floor(Math.random() * 48),
          top: Math.floor(Math.random() * 48),
        },
      });
      setSnakeTail((prev) => [...prev, { x, y }]);
    }
  }, [x, y]);
  const check = (ex, ey) => {
    if (x == ex && y == ey) {
      console.log("no");
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw]">
      {mainPipe.isSpaceClicked ? null : <div>press space to start</div>}
      {mainPipe.isSpaceClicked ? (
        <div className="w-[500px] h-[500px] bg-[#2c2c2c] relative">
          <div
            style={{ position: "absolute", top: y * 10, left: x * 10 }}
            className="h-[10px] w-[10px] bg-[green]"
          ></div>

          {snake.map((e, index) => {
            return (
              <div
                onChange={check(e.x, e.y)}
                key={index}
                style={{ position: "absolute", top: e.y * 10, left: e.x * 10 }}
                className="h-[10px] w-[10px] bg-[orange]"
              ></div>
            );
          })}

          <div
            className="h-[10px] w-[10px] bg-[red]"
            style={{
              position: "absolute",
              top: mainPipe.applePos.top * 10,
              left: mainPipe.applePos.right * 10,
            }}
          ></div>
          <div
            style={{ position: "absolute", top: y * 10, left: x * 10 }}
            className="h-[10px] w-[10px] bg-[pink]"
          ></div>

          {snake.map((e, index) => {
            return (
              <div
                onChange={check(e.x, e.y)}
                key={index}
                style={{ position: "absolute", top: e.y * 10, left: e.x * 10 }}
                className="h-[10px] w-[10px] bg-[pink]"
              ></div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
