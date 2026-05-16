import { useState } from "react";
import * as math from "mathjs";
import { CgMathDivide, CgMathEqual } from "react-icons/cg";
import { FaDeleteLeft } from "react-icons/fa6";
function App() {
  const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const fnButtons = ["+", "-", "x"];
  const [text, setText] = useState("");
  const clicked = (value: number) => {
    setText((txt) => txt + value);
  };

  const deleteText = () => {
    setText((txt) => txt.slice(0, -1));
  };

  const clear = () => {
    setText("");
  };

  const fnClicked = (fn: string) => {
    setText(text + fn);
  };
  const equals = () => {
    setText((txt) => {
      return String(math.evaluate(txt.replaceAll("x", "*")));
    });
  };
  return (
    <div className="grid justify-center align-middle items-center justify-items-center">
      <h1 className="text-7xl align-middle text-center m-8 mb-48">
        Cursed Calculator!
      </h1>
      <div className="grid grid-rows-2 border-2 border-gray-700 rounded-2xl h-[600px] w-[600px] ">
        {/* Display */}
        <div className="display">{text}</div>
        {/* Buttons */}
        <div className="buttons w-full grid grid-rows-1 grid-cols-2 ">
          {/* Numpad */}
          <div className="numpad w-[400px] grid grid-rows-4 grid-cols-3">
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
          <button><FaDeleteLeft className="delete inline" onClick={() => deleteText()} /></button>
          </div>
          {/* Modifiers  */}
          <div className="fn w-[150px] fixed left-0  grid grid-rows-4 grid-cols-1">
            {fnButtons.map((val) => {
              return (
                <button key={val} onClick={() => fnClicked(val)}>
                  {val}
                </button>
              );
            })}
            <button><CgMathDivide className="divide inline" onClick={() => fnClicked("/")} /></button>
            <button><CgMathEqual className="equal inline" onClick={() => equals()} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
