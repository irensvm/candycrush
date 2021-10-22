import { useState, useEffect } from "react";

const width = 8;
const candyColours = ["orange", "blue", "green", "red", "yellow", "purple"];

const App = () => {
  const [currentColourArrangement, setColourArrangement] = useState([]);
  const createBoard = () => {
    const randomColourArrangement = [];

    for (let i = 0; i < width * width; i++) {
      const randomColour =
        candyColours[Math.floor(Math.random() * candyColours.length)];
      randomColourArrangement.push(randomColour);
    }
    setColourArrangement(randomColourArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);

  console.log(currentColourArrangement);

  return (
    <div className="app">
      <div className="game">
        {currentColourArrangement.map((candyColours, index : number) => (
          <img

          key={index}
          style={{backgroundColor: candyColours}}
          alt={candyColours}
          
          />

        ))}
        
      </div>
    </div>
  );
};

export default App;
