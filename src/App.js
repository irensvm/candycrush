import { useState, useEffect } from "react";

const width = 8;
const candyColours = ["orange", "blue", "green", "red", "yellow", "purple"];

const App = () => {
  const [currentColourArrangement, setColourArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)


  const checkColumnOf4 = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOf4 = [i, i + width, i + width * 2, i + width * 3];
      const decidedColour = currentColourArrangement[i];

      if (
        columnOf4.every(
          (square) => currentColourArrangement[square] === decidedColour
        )
      ) {
        columnOf4.forEach((square) => (currentColourArrangement[square] = ""));
        return true

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
        return true

      }
    }
  };

  const checkColumnOf3 = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOf3 = [i, i + width, i + width * 2];
      const decidedColour = currentColourArrangement[i];

      if (
        columnOf3.every(
          (square) => currentColourArrangement[square] === decidedColour
        )
      ) {
        columnOf3.forEach((square) => (currentColourArrangement[square] = ""));
        return true
      }
    }
  };


  const checkRowOf3 = () => {
    for (let i = 0; i < 64; i++) {
      const RowOf3 = [i, i + 1, i + 2];
      const decidedColour = currentColourArrangement[i];
      const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]

      if(notValid.includes(i)) continue

      if(RowOf3.every((square) => currentColourArrangement[square] === decidedColour)) {
        RowOf3.forEach((square) => (currentColourArrangement[square] = ""));
        return true

      }
    }
  };


  const moveIntoSquareBelow = () => {
    for (let i= 0; i <= 55 - width; i++) {

      const firstRow = [0,1,2,3,4,5,6,7]
      const isfirstRow = firstRow.includes(i)
      if(isfirstRow && currentColourArrangement[i] === '') {
        let randomNumber = Math.floor(Math.random() * candyColours.length)
        currentColourArrangement[i] = candyColours[randomNumber]
      }


      if((currentColourArrangement[i + width]) === '') {
        currentColourArrangement[i + width] = currentColourArrangement[i]
        currentColourArrangement[i] = ''
      }
    }
  }


  const dragStart = (e) => {
    console.log(e.target)
    console.log('dragstart')
    setSquareBeingDragged(e.target)
  }

  const dragDrop = (e) => {
    console.log(e.target)
    console.log('drag drop')
    setSquareBeingReplaced(e.target)
  }

  const dragEnd = (e) => {
    console.log('drag end')

    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id')) 
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id')) 

    currentColourArrangement[squareBeingReplacedId] = squareBeingDragged.style.backgroundColor
    currentColourArrangement[squareBeingDraggedId] = squareBeingReplaced.style.backgroundColor



    console.log('squareBeingDraggedId', squareBeingDraggedId)
    console.log('squareBeingReplacedId', squareBeingReplacedId)

    const valdidMoves = [
      squareBeingDraggedId -1,
      squareBeingDraggedId -width,
      squareBeingDraggedId +1,
      squareBeingDraggedId + width
    ]

    const validMove = valdidMoves.includes(squareBeingReplacedId)
    
    const isRowOf3 = checkRowOf3()
    const isRowOf4 = checkRowOf4()
    const isColumOf3 = checkColumnOf3()
    const isColumOf4 = checkColumnOf4()

    if(squareBeingReplacedId && validMove && ( isRowOf3 || isRowOf4  || isColumOf3 ||isColumOf4 )) {
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
    } else {
      currentColourArrangement[squareBeingReplacedId ] = squareBeingReplaced.style.backgroundColor
      currentColourArrangement[squareBeingDraggedId ] = squareBeingDragged.style.backgroundColor
      setColourArrangement([...currentColourArrangement])

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
    }, 100);
    return () => clearInterval(timer);
  }, [checkColumnOf4, checkRowOf4, checkColumnOf3, checkRowOf3,moveIntoSquareBelow, currentColourArrangement]);

  //console.log(currentColourArrangement);

  return (
    <div className="app">
      <div className="game">
        {currentColourArrangement.map((candyColours, index: number) => (
          <img
            key={index}
            style={{ backgroundColor: candyColours }}
            alt={candyColours}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e : DragEvent<HTMLImageElement>) => e.preventDefault()}
            onDragEnter={(e : DragEvent<HTMLImageElement>) => e.preventDefault()}
            onDragLeave={(e : DragEvent<HTMLImageElement>) => e.preventDefault()}
            onDrop= {dragDrop}
            onDragEnd={dragEnd}


          />
        ))}
      </div>
    </div>
  );
};

export default App;
