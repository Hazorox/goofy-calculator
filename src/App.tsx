import { useCallback, useEffect, useState } from "react";
import * as math from "mathjs";
import { CgMathDivide, CgMathEqual } from "react-icons/cg";
import { FaDeleteLeft } from "react-icons/fa6";
import Background from "./Background";
function App() {
  const [found, setFound] = useState({ "67": false, "69": false });
  const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const fnButtons = ["+", "-", "x"];
  const [text, setText] = useState("");
  const clicked = (value: number) => {
    setText((txt) => txt + value);
  };

  const deleteText = () => {
    setText((txt) => txt.slice(0, -1));
      new Audio("./click.mp3").play()

  };

  const clear = () => {
    
    setText("");
    setFound((_) => {
      return { "69":false, "67": false };
    });
      new Audio("./clear.mp3").play()

  };

  const fnClicked = (fn: string) => {
    setText(text + fn);
  };
  const equals = () => {
      new Audio("./equals.mp3").play()
    setText((txt) => {
      let output;
      try {
        output = String(math.evaluate(txt.replaceAll("x", "*")));
      } catch {
        output = "Failed, press CE";
      }
      return output;
    });
  };

  // If backspace is pressed del is pressed
  const escFunction = useCallback((event:KeyboardEvent) => {
    if (event.key === "Backspace") {
      deleteText();
    } else if (event.key == "Enter") {
      equals();
    } else if (event.location == 3) {
      setText((txt) => {
        return txt + event.key;
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  useEffect(() => {


    if (text == "") {
      setFound( (_) => {
        return {"69":false, "67": false };
      });
    }
    if (text.includes("67") && found["67"] == false) {
      console.log("67!!!!!!!");
      setFound((prev) => {
        return { ...prev, "67": true };
      });

      new Audio("./67.mp3").play()
    }
    else if (text.includes("69") && found["69"] == false) {
      setFound((prev) => {
        return { ...prev, "69": true };
      });
      new Audio("./sus.mp3").play()

    }
    else if (text=="Infinity" || text == "undefined" || text == "NaN" || text=="Failed, press CE"){
            new Audio("./infinity.mp3").play()

    }
  }, [text, found]);

  return (
    <>
      <Background />
      <div className="flex justify-center items-center min-h-screen flex-col">
        <h1 className="text-5xl md:text-6xl lg:text-7xl mb-20 text-center">Cursed Calculator!</h1>
        <div className="w-[330px] md:w-xl h-144 border-4 border-gray-700 bg-gray-50  rounded-2xl calc">
          {/* Display */}
          <div className="h-22 pl-2 display bg-gray-400 rounded-t-xl mb-3 overflow-x-scroll overflow-y-hidden">
            {text}
          </div>
          {/* Buttons */}
          <div className="buttons flex min-h-124 md:min-h-124">
            {/* Numpad */}
            <div className="numpad flex-3/4 grid grid-cols-3 ml-3 mb-3">
              {buttons.map((val) => {
                return (
                  <button key={val} onClick={() => clicked(val)}>
                    {val}
                  </button>
                );
              })}

              <button className="clear" onClick={() => clear()}>
                CE
              </button>
              <button className="0" onClick={() => clicked(0)}>
                0
              </button>
              <button>
                <FaDeleteLeft
                  className="delete inline"
                  onClick={() => deleteText()}
                />
              </button>
            </div>
            {/* Modifiers  */}
            <div className="grid mb-3">
              {fnButtons.map((val) => {
                return (
                  <button
                    className="fn"
                    key={val}
                    onClick={() => fnClicked(val)}
                  >
                    {val}
                  </button>
                );
              })}
              <button className="fn">
                <CgMathDivide
                  className="divide inline"
                  onClick={() => fnClicked("/")}
                />
              </button>
              <button className="fn mb-2">
                <CgMathEqual
                  className="equal inline"
                  onClick={() => equals()}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
