import { motion } from "framer-motion";
import { useData } from "../Context.jsx";
import { useState } from "react";
import { useEffect } from "react";

function Coin() {
  const { isGuru, clickValue, tap } = useData();
  const [texts, setTexts] = useState([]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTexts((prevItems) => {
        return prevItems
          .map((item) => ({
            ...item,
            position: {
              ...item.position,
              y: item.position.y - 8,
            },
            opacity: item.opacity - 0.02,
          }))
          .filter((item) => item.opacity > 0);
      });
    }, 30);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTexts((prevTexts) => prevTexts.slice(1));
    }, 1000);
    return () => clearTimeout(timer);
  }, [texts.length > 0]);

  useEffect(() => {
    setTexts((prevTexts) => prevTexts.slice(1));
  }, [texts.length > 24]);

  return (
    <div
      className={`${
        isGuru() && "animate-gradient"
      } w-[38vh] h-[38vh] bg-green-700 rounded-full z-40 flex justify-center items-center`}
    >
      <div
        className={
          "w-[35vh] h-[35vh] relative bg-gray-300 rounded-full z-20 flex justify-center items-center " +
          "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-200 to-green-800"
        }
      >
        <motion.div className="w-full h-full flex justify-center items-center" whileFocus={{ scale: 1.1 }} whileTap={{ scale: 0.85 }}>
          <img className={"bg-transparent scale-125"} src={"./tap--img.png"} />
          <div
            id="LinkArea"
            onTouchStart={(ev) => {
              ev.preventDefault();
              for (let i = 0; i < ev.targetTouches.length; i++) {
                const tapStatus = tap();
                if (tapStatus) {
                  const { pageX, pageY } = ev.changedTouches[i];
                  const newText = {
                    value: `+${clickValue()}`,
                    position: { x: pageX, y: pageY },
                    opacity: 1,
                  };
                  setTexts((old) => [...old, newText]);
                }
              }
            }}
            className="absolute w-full h-full rounded-full bg-transparent z-20 top-0 right-0"
          />
        </motion.div>
      </div>

      {texts.map((text, index) => (
        <div
          key={index}
          style={{
            color: "#e9e2fb",
            fontSize: "8vw",
            fontWeight: "bold",
            position: "absolute",
            top: text.position.y - 30,
            left: text.position.x,
            padding: "5px",
            zIndex: 9999,
            pointerEvents: "none",
            transition: "opacity 0.5s ease", // Add a smooth fading transition
            opacity: text.opacity,
          }}
        >
          {text.value}
        </div>
      ))}
    </div>
  );
}

export default Coin;
