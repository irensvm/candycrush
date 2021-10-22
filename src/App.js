const width = 8;
const candyColours = ["orange", "blue", "green", "red", "yellow", "purple"];

const App = () => {
  const createBoard = () => {
    const randomColourArrangement = [];

    for (let i = 0; i < width * width; i++) {
      const randomColour =
        candyColours[Math.floor(Math.random() * candyColours.length)];
      randomColourArrangement.push(randomColour);
    }
    console.log(randomColourArrangement);
  };
  createBoard();

  return <div></div>;
};

export default App;
