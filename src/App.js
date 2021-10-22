import { useState, useEffect } from "react";

const width = 8;
const candyColours = ["orange", "blue", "green", "red", "yellow", "purple"];

const App = () => {
  const [currentColourArrangement, setColourArrangement] = useState([]);

  const checkColumnOf4 = () => {
    for (let i = 0; i < 39; i++) {
      const columnOf4 = [i, i + width, i + width * 2, i + width * 3];
      const decidedColour = currentColourArrangement[i];

      if (
        columnOf4.every(
          (square) => currentColourArrangement[square] === decidedColour
        )
      ) {
        columnOf4.forEach((square) => (currentColourArrangement[square] = ""));
      }
    }
  };
  const checkRowOf4 = () => {
    for (let i = 0; i < 64; i++) {
      const RowOf4 = [i, i + 1, i + 2, i + 3];
      const decidedColour = currentColourArrangement[i];
      const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]

      if(notValid.includes(i)) continue

      if (
        RowOf4.every(
          (square) => currentColourArrangement[square] === decidedColour
        )
      ) {
        RowOf4.forEach((square) => (currentColourArrangement[square] = ""));
      }
    }
  };

  const checkColumnOf3 = () => {
    for (let i = 0; i < 47; i++) {
      const columnOf3 = [i, i + width, i + width * 2];
      const decidedColour = currentColourArrangement[i];

      if (
        columnOf3.every(
          (square) => currentColourArrangement[square] === decidedColour
        )
      ) {
        columnOf3.forEach((square) => (currentColourArrangement[square] = ""));
      }
    }
  };


  const checkRowOf3 = () => {
    for (let i = 0; i < 64; i++) {
      const RowOf3 = [i, i + 1, i + 2];
      const decidedColour = currentColourArrangement[i];
      const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]

      if(notValid.includes(i)) continue

      if (
        RowOf3.every(
          (square) => currentColourArrangement[square] === decidedColour
        )
      ) {
        RowOf3.forEach((square) => (currentColourArrangement[square] = ""));
      }
    }
  };


  const moveIntoSquareBelow = () => {
    for (let i= 0; i < 64 - width; i++) {
      if((currentColourArrangement[i + width]) === '') {
        currentColourArrangement[i + width] = currentColourArrangement[i]
        currentColourArrangement[i] = ''
      }
    }



  }


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

  useEffect(() => {
    const timer = setInterval(() => {
      checkColumnOf4();
      checkRowOf4();
      checkColumnOf3();
      checkRowOf3();
      moveIntoSquareBelow()
      setColourArrangement([...currentColourArrangement]);
    }, 1000);
    return () => clearInterval(timer);
  }, [checkColumnOf4, checkRowOf4, checkColumnOf3, checkRowOf3,moveIntoSquareBelow, currentColourArrangement]);

  console.log(currentColourArrangement);

  return (
    <div className="app">
      <div className="game">
        {currentColourArrangement.map((candyColours, index: number) => (
          <img
            key={index}
            style={{ backgroundColor: candyColours }}
            alt={candyColours}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
