import { useState, useEffect, useRef, useContext } from "react";
import { usePrevious } from "../hooks/usePrevious";

import { motion } from "framer-motion";
import React from "react";

const ROWONE = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];

const ROWTWO = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];

const ROWTHREE = ["Z", "X", "C", "V", "B", "N", "M"];

const validLetters = [...ROWONE, ...ROWTWO, ...ROWTHREE];

const WordsContext = React.createContext();
const AnswerContext = React.createContext();
const AttemptsContext = React.createContext();

// const Letter = (props) => {
//   return (
//     <div className="flip-card border-2 border-gray-500 h-14 w-14 flex grow shrink justify-center items-center opacity-0">
//       <motion.div
//         animate={{ rotateX: 180 }}
//         className="flip-card-inner relative w-full h-full"
//       >
//         <div className="flip-card-front absolute">{props.letter}</div>
//         <motion.div
//           animate={{ rotateX: 180 }}
//           className="flip-card-back absolute h-full w-full bg-green-700 back-visibility-hidden"
//         >
//           {props.letter}
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

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
          className="border-2 border-gray-500 h-14 w-14 flex grow shrink justify-center items-center"
          animate={{ scale: 1 }}
          transition={{
            ease: "easeIn",
            type: "spring",
            bounce: 0.65,
          }}
          initial={{ scale: 0 }}
          style={{
            backfaceVisibility: "hidden",
            zIndex: 10,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {props.attempted ? (
            <div></div>
          ) : (
            <span className="text-3xl font-bold"> {props.letter}</span>
          )}
        </motion.div>
      )}
    </div>
  );
};

const LetterRow = (props) => {
  const container = {
    // hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-5 gap-x-2 gap-y-4"
    >
      {Array.from(Array(5).keys()).map((number, index) => (
        <Letter
          key={number}
          letter={props.letters[index]}
          answerLetter={props.answer[index]}
          attempted={props.attempted}
        />
      ))}
    </motion.div>
  );
};

function GameBox() {
  const lettersValue = useContext(WordsContext);
  const answerValue = useContext(AnswerContext);
  const attemptsValue = useContext(AttemptsContext);

  return (
    <div className="flex justify-center grid grid-rows-5 gap-1 m-4">
      {Array.from(Array(6).keys()).map((number, index) => (
        <LetterRow
          key={number}
          answer={answerValue}
          letters={lettersValue[index]}
          attempted={attemptsValue[index]}
        />
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
        Wordle But it's...
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
  const [answerState, setAnswerState] = useState("hello");

  const [wordState, setWordState] = useState(["", "", "", "", "", ""]);

  const currentWords = useRef(["", "", "", "", "", ""]);

  const [attemptsState, setAttemptsState] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const currentIndex = useRef(0);

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
      } else if (
        e.key === "Enter" &&
        currentWords.current[currentIndex.current].length === 5
      ) {
        CheckWord();
      }
    });
  };

  const prevAttempts = usePrevious(attemptsState);

  function CheckWord() {
    // make an array where up to the current index everything is true
    const wordsComplete = currentWords.current.map(
      (word, index) => index <= currentIndex.current
    );
    setAttemptsState(wordsComplete);
    // setAttemptsState(prevAttempts[currentIndex.current]);
    if (currentWords.current[currentIndex.current] === answerState) {
      console.log("Correct!");
    } else {
      console.log("Wrong!", currentWords);
    }
  }

  useEffect(() => handleKeyUp(), []);

  return (
    <AnswerContext.Provider value={answerState}>
      <WordsContext.Provider value={wordState}>
        <AttemptsContext.Provider value={attemptsState}>
          <div className="max-w-3xl mx-auto h-screen flex flex-col justify-between py-4">
            <Header />
            <GameBox />
            <Keyboard />
          </div>
        </AttemptsContext.Provider>
      </WordsContext.Provider>
    </AnswerContext.Provider>
  );
}
