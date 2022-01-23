import { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import React from "react";

const ROWONE = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];

const ROWTWO = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];

const ROWTHREE = ["Z", "X", "C", "V", "B", "N", "M"];

const validLetters = [...ROWONE, ...ROWTWO, ...ROWTHREE];

const WordsContext = React.createContext();

const Letter = (props) => {
  return (
    <div
      className={`${
        props.letter
          ? "h-14 w-14 flex grow shrink"
          : "border border-gray-300 h-14 w-14 flex grow shrink"
      }`}
    >
      {props.letter && (
        <motion.div
          className="text-3xl border-2 border-gray-500 font-bold h-14 w-14 flex grow shrink justify-center items-center"
          animate={{ scale: 1 }}
          transition={{
            ease: "easeIn",
            type: "spring",
            bounce: 0.65,
          }}
          initial={{ scale: 0 }}
        >
          {props.letter}
        </motion.div>
      )}
    </div>
  );
};

const LetterRow = (props) => {
  return (
    <div className="grid grid-cols-5 gap-x-2 gap-y-4">
      {Array.from(Array(5).keys()).map((number, index) => (
        <Letter key={number} letter={props.letters[index]} />
      ))}
    </div>
  );
};

function GameBox() {
  const lettersValue = useContext(WordsContext);
  return (
    <div className="flex justify-center grid grid-rows-5 gap-1 m-4">
      {Array.from(Array(6).keys()).map((number, index) => (
        <LetterRow key={number} letters={lettersValue[index]} />
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
        Wordle
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
  const [gameState, setGameState] = useState({
    answer: "hello",
    words: ["", "", "", "", "", ""],
  });

  const [wordState, setWordState] = useState(["", "", "", "", "", ""]);

  const currentWords = useRef(["", "", "", "", "", ""]);

  const currentIndex = useRef(0);

  ///

  const handleKeyUp = () => {
    document.addEventListener("keyup", (e) => {
      if (
        validLetters.includes(e.key.toUpperCase()) &&
        currentWords.current[currentIndex.current].length < 5
      ) {
        currentWords.current[currentIndex.current] += e.key;
        setWordState([...currentWords.current]);
      } else if (e.key === "Backspace") {
        const updatedWord = currentWords.current[currentIndex.current].slice(
          0,
          -1
        );
        currentWords.current[currentIndex.current] = updatedWord;
        setWordState([...currentWords.current]);
      }
    });
  };

  useEffect(() => handleKeyUp(), []);

  return (
    <WordsContext.Provider value={wordState}>
      <div className="max-w-3xl mx-auto h-screen flex flex-col justify-between py-4">
        <Header />
        <GameBox />
        <Keyboard />
      </div>
    </WordsContext.Provider>
  );
}
