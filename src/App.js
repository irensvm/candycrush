import { useState, useEffect } from "react";

const width = 8;
const candyColours = ["orange", "blue", "green", "red", "yellow", "purple"];

const App = () => {
  const [currentColourArrangement, setColourArrangement] = useState([]);

  const checkColumnOf4 = () => {
    for (let i = 0; i < 39; i++ ) {
      const columnOf4 = [i, i + width, i + width * 2, i + width * 3]
      const decidedColour = currentColourArrangement[i]

      if ( columnOf4.every(square => currentColourArrangement[square] === decidedColour)) {
        columnOf4.forEach(square => currentColourArrangement[square] = '')

      }


    }

  }

  const checkColumnOf3 = () => {
    for (let i = 0; i < 47; i++ ) {
      const columnOf3 = [i, i + width, i + width * 2]
      const decidedColour = currentColourArrangement[i]

      if ( columnOf3.every(square => currentColourArrangement[square] === decidedColour)) {
        columnOf3.forEach(square => currentColourArrangement[square] = '')

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
      checkColumnOf4()
      checkColumnOf3()
      setColourArrangement([...currentColourArrangement])

    }, 100)
    return () => clearInterval(timer)

    
  }, [checkColumnOf4, checkColumnOf3, currentColourArrangement])

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
