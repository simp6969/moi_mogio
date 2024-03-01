"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
export default function Mogoi() {
  const [mainPipe, setMainPipe] = useState({
    isSpaceClicked: false,
  });
  const [x, setX] = useState(24);
  const [y, setY] = useState(25);
  const [direction, setDirection] = useState();
  const [snake, setSnakeTail] = useState([]);
  const [suicide, setSuicide] = useState(false);

  //player 2
  const [mainPipeP2, setMainPipeP2] = useState({
    isSpaceClicked: false,
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
        if (e.yP2 === yP2 && e.xP2 === xP2) {
          setSuicideP2(true);
        }
      });
      if (yP2 === y && xP2 === x) {
        setSuicide(true);
      }
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
        <h1>{suicide ? "player 2 wins" : "player 1 wins"}</h1>
        <button
          className="flex justify-center items-center p-[30px] h-[50px] w-[100px] rounded-[10px] border-2 border-black"
          onClick={() => {
            setSuicide(false);
            setSnakeTail([]);
            setSuicideP2(false);
            setSnakeTailP2([]);
          }}
        >
          play
        </button>
      </div>
    );
  }
  return (
    <div className="flex overflow-hidden justify-center items-center h-[100vh] w-[100vw] text-center flex-col max-sm:justify-start">
      {mainPipe.isSpaceClicked ? (
        <div className="flex justify-center gap-[10px] flex-col">
          <p>
            player 1 score:
            {snake.length}
          </p>
          <p>player 2 score: {snakeP2.length}</p>
        </div>
      ) : null}
      {mainPipe.isSpaceClicked ? null : (
        <div className="flex gap-[10px] flex-col justify-center items-center">
          <img draggable="false" src="/title.png"></img>
          <h1>Press Space To Start</h1>

          <button
            className="button-86"
            onClick={() => {
              setMainPipe({ ...mainPipe, isSpaceClicked: true });
              setMainPipeP2({ ...mainPipeP2, isSpaceClicked: true });
              setDirection("y");
              setDirectionP2("x");
            }}
          >
            Start!
          </button>
        </div>
      )}
      {mainPipe.isSpaceClicked ? (
        <div className="w-[500px] h-[500px] opacity-80 bg-[#2c2c2c] relative">
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
      <div className="relative w-[80vw] h-[20vh] flex justify-center ">
        <div className="flex justify-center">
          <svg
            className="rotate-90"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 448 512"
            height={50}
            width={50}
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </div>
        <div className="flex h-[100%] items-center">
          <svg
            className="rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 448 512"
            height={50}
            width={50}
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 448 512"
            height={50}
            width={50}
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </div>
        <div>
          <svg
            className="rotate-[270deg]"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 448 512"
            height={50}
            width={50}
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </div>
      </div>
      <div className="relative w-[80vw] h-[20vh] flex justify-center items-center">
        <svg
          className="rotate-90"
          xmlns="http://www.w3.org/2000/svg"
          fill="gray"
          viewBox="0 0 448 512"
          height={50}
          width={50}
        >
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
        </svg>
        <svg
          className="rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="gray"
          viewBox="0 0 448 512"
          height={50}
          width={50}
        >
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
        </svg>
        <svg
          className="rotate-[270deg]"
          xmlns="http://www.w3.org/2000/svg"
          fill="gray"
          viewBox="0 0 448 512"
          height={50}
          width={50}
        >
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="gray"
          viewBox="0 0 448 512"
          height={50}
          width={50}
        >
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
        </svg>
      </div>
    </div>
  );
}
