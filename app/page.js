"use client";

import Image from "next/image";
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
  const [suicide, setSuicide] = useState(false);

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
      snake.map((e) => {
        if (e.y === y && e.x === x) {
          setSuicide(true);
        }
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
  if (suicide) {
    return (
      <div className="flex flex-col justify-center items-center h-[100vh] w-[100vw]">
        <h1>Game Over</h1>
        <button
          onClick={() => {
            setSuicide(false);
            setSnakeTail([]);
          }}
        >
          play again
        </button>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw] text-center flex-col">
      {mainPipe.isSpaceClicked ? (
        <div>
          your score:
          {snake.length}
        </div>
      ) : null}
      {mainPipe.isSpaceClicked ? null : (
        <div className="flex gap-[10px] flex-col">
          <h1>Press Space To Start</h1>
        </div>
      )}
      {mainPipe.isSpaceClicked ? (
        <div className="w-[500px] h-[500px] bg-[#2c2c2c] relative">
          <div
            style={{ position: "absolute", top: y * 10, left: x * 10 }}
            className="h-[10px] w-[10px] bg-[green]"
          ></div>

          {snake.map((e, index) => {
            return (
              <div
                key={index}
                style={{ position: "absolute", top: e.y * 10, left: e.x * 10 }}
                className="h-[10px] w-[10px] bg-[green]"
              ></div>
            );
          })}

          <Image
            style={{
              position: "absolute",
              top: mainPipe.applePos.top * 10,
              left: mainPipe.applePos.right * 10,
              scale: 3,
            }}
            width={10}
            height={10}
            src="/apple.png"
            alt="apple"
            priority="true"
          ></Image>
        </div>
      ) : null}
    </div>
  );
}
