import { useCallback, useEffect, useState } from "react";
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

 // If backspace is pressed del is pressed
  const escFunction = useCallback((event) => {
    if (event.key === "Backspace") {
      deleteText()
    }else if(event.key=="Enter"){
      equals()
    }
    else if(event.location == 3){
      setText(txt=>{return txt+event.key})
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);


  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-7xl my-8">
        Cursed Calculator!
      </h1>
      <div className="w-xl h-144 border-2 border-gray-700 rounded-2xl ">
        {/* Display */}
        <div className="min-h-20 display bg-gray-400 rounded-t-xl mb-3 overflow-x-scroll">{text}</div>
        {/* Buttons */}
        <div className="buttons flex min-h-124">
          {/* Numpad */}
          <div className="numpad flex-3/4 grid grid-cols-3 ml-3 mb-1">
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
          <div className="grid">
            {fnButtons.map((val) => {
              return (
                <button className="fn" key={val} onClick={() => fnClicked(val)}>
                  {val}
                </button>
              );
            })}
            <button className="fn"><CgMathDivide className="divide inline" onClick={() => fnClicked("/")} /></button>
            <button className="fn mb-2"><CgMathEqual className="equal inline" onClick={() => equals()} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
