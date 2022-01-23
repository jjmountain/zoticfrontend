import { useState, useEffect, useRef, useContext } from "react";
import React from "react";

const ROWONE = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];

const ROWTWO = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];

const ROWTHREE = ["Z", "X", "C", "V", "B", "N", "M"];

const validLetters = [...ROWONE, ...ROWTWO, ...ROWTHREE];

const GameContext = React.createContext();

const Letter = () => {
  const letterValue = useContext(GameContext);
  console.log(letterValue);
  return (
    <div
      type="text"
      className="text-gray-50 text-3xl font-bold border-2 border-gray-300 h-14 w-14 flex grow shrink justify-center items-center"
    />
  );
};

const LetterRow = () => {
  return (
    <div className="grid grid-cols-5 gap-x-2 gap-y-4">
      {Array.from(Array(5).keys()).map((number) => (
        <Letter key={number} />
      ))}
    </div>
  );
};

function GameBox() {
  return (
    <div className="flex justify-center grid grid-rows-5 gap-1 m-4">
      {Array.from(Array(6).keys()).map((number) => (
        <LetterRow key={number} />
      ))}
    </div>
  );
}

function Header() {
  return (
    <div
      style={{
        borderBottom: "solid 1px #d3d6da",
        maxWidth: "100vw",
      }}
      className="mx-auto w-96"
    >
      <h1 className="mt-1 text-4xl text-black text-center font-bold uppercase tracking-wider">
        Word Me Up
      </h1>
    </div>
  );
}

function KeyboardLetter(props) {
  return (
    <div className="w-12 h-10 md:h-14 text-xs md:text-sm font-bold bg-gray-200 flex grow shrink items-center justify-center rounded-md m-1">
      {props.letter}
    </div>
  );
}

function KeyboardLetters() {
  return (
    <>
      <div className="w-full flex justify-center">
        {ROWONE.map((letter) => (
          <KeyboardLetter key={letter} letter={letter} />
        ))}
      </div>
      <div className="w-full flex justify-center px-4">
        {ROWTWO.map((letter) => (
          <KeyboardLetter key={letter} letter={letter} />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <div className="w-12  h-10 md:h-14 text-sm font-bold bg-gray-200 flex-1 flex grow items-center justify-center rounded-md m-1">
          ENTER
        </div>
        {ROWTHREE.map((letter) => (
          <KeyboardLetter key={letter} letter={letter} />
        ))}
        <div className="w-12  h-10 md:h-14 text-sm font-bold bg-gray-200 flex-1 flex grow items-center justify-center rounded-md m-1">
          DEL
        </div>
      </div>
    </>
  );
}

function Keyboard() {
  return (
    <div className="px-3">
      <KeyboardLetters />
    </div>
  );
}

export default function WordMeUp() {
  const [gameState, setGameState] = useState([{ answer: "hello", letter: "" }]);

  const handleKeyUp = () => {
    document.addEventListener("keyup", (e) => {
      if (validLetters.includes(e.key.toUpperCase())) {
        setGameState(e.key);
      }
    });
  };

  handleKeyUp();

  useEffect(() => {});
  return (
    <GameContext.Provider value={gameState}>
      <div className="max-w-3xl mx-auto h-screen flex flex-col justify-between py-4">
        <Header />
        <GameBox />
        <Keyboard />
      </div>
    </GameContext.Provider>
  );
}
