"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
export default function Mogoi() {
  const [mainPipe, setMainPipe] = useState({
    x: 24,
    y: 24,

    isSpaceClicked: false,
    snake: [],
  });
  const [x, setX] = useState(24);
  const [y, setY] = useState(25);
  const [direction, setDirection] = useState();
  const [snake, setSnakeTail] = useState([]);
  const [suicide, setSuicide] = useState(false);

  //player 2
  const [mainPipeP2, setMainPipeP2] = useState({
    x: 24,
    y: 24,

    isSpaceClicked: false,
    snake: [],
  });
  const [xP2, setXP2] = useState(24);
  const [yP2, setYP2] = useState(24);
  const [directionP2, setDirectionP2] = useState();
  const [snakeP2, setSnakeTailP2] = useState([]);
  const [suicideP2, setSuicideP2] = useState(false);
  //global vars

  const [applePos, setApplePos] = useState({
    right: Math.floor(Math.random() * 48),
    top: Math.floor(Math.random() * 48),
  });

  useEffect(() => {
    if (document) {
      document.onkeydown = (e) => {
        if (e.key === " ") {
          setMainPipe({ ...mainPipe, isSpaceClicked: true });
          setMainPipeP2({ ...mainPipeP2, isSpaceClicked: true });
          setDirection("y");
          setDirectionP2("x");
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
          setDirectionP2("x");
        }
        if (e.key === "a") {
          setDirectionP2("-x");
        }
        if (e.key === "w") {
          setDirectionP2("y");
        }
        if (e.key === "s") {
          setDirectionP2("-y");
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
    const intervalValueP2 = setInterval(() => {
      if (directionP2 === "-y") {
        setYP2((y) => {
          if (y + 1 > 48) return 0;
          return y + 1;
        });
      }
      if (directionP2 === "y") {
        setYP2((y) => {
          if (y - 1 < 0) return 48;
          return y - 1;
        });
      }
      if (directionP2 === "-x") {
        setXP2((x) => {
          if (x - 1 < 0) return 48;
          return x - 1;
        });
      }
      if (directionP2 === "x") {
        setXP2((x) => {
          if (x + 1 > 48) return 0;
          return x + 1;
        });
      }

      setSnakeTailP2((prev) => {
        return prev.map((_, index) =>
          index === 0
            ? { xP2, yP2 }
            : { xP2: prev[index - 1].xP2, yP2: prev[index - 1].yP2 }
        );
      });
      snakeP2.map((e) => {
        if (e.yP2 === y && e.x === xP2) {
          setSuicideP2(true);
        }
      });
    }, 100);

    return () => {
      clearInterval(intervalValue);
      clearInterval(intervalValueP2);
    };
  }, [
    mainPipe.isSpaceClicked,
    direction,
    x,
    y,
    mainPipeP2.isSpaceClicked,
    directionP2,
    xP2,
    yP2,
  ]);
  useEffect(() => {
    if (xP2 == applePos.right && yP2 === applePos.top) {
      console.log("ok");
      setApplePos({
        right: Math.floor(Math.random() * 48),
        top: Math.floor(Math.random() * 48),
      });
      setSnakeTailP2((prev) => [...prev, { xP2, yP2 }]);
    }
  }, [xP2, yP2]);
  useEffect(() => {
    if (applePos.right === x && applePos.top === y) {
      setApplePos({
        right: Math.floor(Math.random() * 48),
        top: Math.floor(Math.random() * 48),
      });
      setSnakeTail((prev) => [...prev, { x, y }]);
    }
  }, [x, y]);

  if (suicide || suicideP2) {
    return (
      <div className="flex flex-col justify-center items-center h-[100vh] w-[100vw] gap-5">
        <h1>Game Over</h1>
        <button
          className="flex justify-center items-center h-[80px] w-[100px] p-[10px] rounded-[10px] border-2 border-black"
          onClick={() => {
            setSuicide(false);
            setSnakeTail([]);
            setSuicideP2(false);
            setSnakeTailP2([]);
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
              top: applePos.top * 10,
              left: applePos.right * 10,
              scale: 3,
            }}
            width={10}
            height={10}
            src="/apple.png"
            alt="apple"
            priority="true"
          ></Image>
          {/* secondth snake */}

          <div
            style={{ position: "absolute", top: yP2 * 10, left: xP2 * 10 }}
            className="h-[10px] w-[10px] bg-[pink]"
          ></div>

          {snakeP2.map((e, index) => {
            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  top: e.yP2 * 10,
                  left: e.xP2 * 10,
                }}
                className="h-[10px] w-[10px] bg-[pink]"
              ></div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
