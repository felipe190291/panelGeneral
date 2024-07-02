"use client";
import { ChromePicker } from "react-color";
import { useEffect, useRef, useState } from "react";
const ColorPicker = () => {
  const pickerRef = useRef(null);
 
  const [color, setColor] = useState("rgba(29,33,38,1)");
  const [colorSecondary, setColorSecondary] = useState("rgba(50,75,103,0.3)");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  function useOutsideClick(ref, callback) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, callback]);
  }

  // Callback que se ejecuta al hacer clic fuera del elemento
  useOutsideClick(pickerRef, () => {
    setDisplayColorPicker(false);
  });
  useOutsideClick(pickerRef, () => {
    setDisplayColorPicker(false);
  });

  useEffect(() => {
    // Cambiar el color del tema después de 3 segundos
    let selectedChanger = document.querySelectorAll(".changerColor");
    let selectedChangerInside = document.querySelectorAll(".darki");
    if (selectedChanger) {
      selectedChanger.forEach((element) => {
        element.style.backgroundColor = color;
        element.style.color =
          color === "rgba(29,33,38,1)"
            ? `rgb(102, 178, 255)`
            : `rgba(15,18,20,0.68)`;
      });
      if (selectedChangerInside) {
        selectedChangerInside.forEach((element) => {
          element.style.backgroundColor = colorSecondary;
          element.style.color =
            color === "rgba(29,33,38,1)"
              ? `rgb(102, 178, 255)`
              : `rgba(15,18,20,0.68)`;
        });
      }
    }
   
  }, [color]);

  return (
    <>
      <button
        onClick={() => setDisplayColorPicker(!displayColorPicker)}
        className="flex items-center justify-center w-7 h-7 bg-gray-500 rounded-full"
      >
        <div
          className="w-5 h-5 rounded-full"
          style={{ backgroundColor: color }}
        ></div>
      </button>

      {displayColorPicker && (
        <div ref={pickerRef} className="absolute left-full ml-3">
          <ChromePicker
            color={color}
            onChange={(color) => {
              setColor(
                `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
              );
            }}
          />
        </div>
      )}
    </>
  );
};
export default ColorPicker;
