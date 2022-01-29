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

const LetterBack = (props) => {
  const letterState = () => {
    if (props.letter && props.attempted) {
      return "flip";
    } else if (props.letter) {
      return "show";
    } else {
      return "hidden";
    }
  };

  const itemCounterSpinVariants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 0,
    },
    flip: {
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <>
      <motion.div
        className={`h-14 w-14`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          rotateX: 180,
          backgroundColor: props.color,
          color: "white",
          backfaceVisibility: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        variants={itemCounterSpinVariants}
        animate={letterState}
      >
        <motion.span animate={{ rotateX: 180 }}> {props.letter} </motion.span>
      </motion.div>
    </>
  );
};

const LetterFront = (props) => {
  const letterState = () => {
    if (props.letter && props.attempted) {
      return "flip";
    } else if (props.letter) {
      return "show";
    } else {
      return "hidden";
    }
  };

  const itemSpinVariants = {
    hidden: {
      rotateX: 0,
      scale: 0,
    },
    show: {
      rotateX: 0,
      scale: 1,
    },
    flip: {
      rotateX: 180,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <>
      <motion.div
        className="h-14 w-14 border-gray-500 border"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          color: "black",
          backfaceVisibility: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        variants={itemSpinVariants}
        animate={letterState}
      >
        {props.letter}
      </motion.div>
    </>
  );
};

const Letter = (props) => {
  const letterState = () => {
    if (props.letter && props.attempted) {
      return "flip";
    } else if (props.letter) {
      return "show";
    } else {
      return "hidden";
    }
  };

  const letterVariant = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.7,
        duration: 0.5,
      },
    },
    flip: {
      rotateX: 180,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };
  return (
    <div
      className={`${
        props.letter
          ? "h-14 w-14 flex justify-center grow shrink"
          : "border border-gray-300 h-14 w-14 flex justify-center grow shrink"
      }`}
    >
      <motion.div
        variants={letterVariant}
        animate={letterState}
        className={`${
          letterState === "show"
            ? "h-full w-full flex border border-gray-500 justify-center items-center grow shrink relative text-xl"
            : "h-full w-full flex justify-center items-center grow shrink relative text-xl"
        }`}
      >
        <LetterFront letter={props.letter} attempted={props.attempted} />
        <LetterBack
          letter={props.letter}
          attempted={props.attempted}
          color={props.color}
        />
      </motion.div>
    </div>
  );
};

const LetterRow = (props) => {
  // create a function that takes in the letter as an argument and returns the color if attempted, otherwise return empty string

  const determineColor = (letter, index) => {
    if (letter === props.answer[index]) {
      return "green";
    } else if (props.answer.includes(letter)) {
      return "orange";
    } else {
      return "gray";
    }
  };

  const container = {
    hidden: { opacity: 1 },
    flip: {
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      animate={props.attempted ? "flip" : "hidden"}
      className="grid grid-cols-5 gap-x-2 gap-y-4"
    >
      {Array.from(Array(5).keys()).map((number, index) => (
        <Letter
          key={number}
          index={number}
          letter={props.letters[index]}
          answerLetter={props.answer[index]}
          attempted={props.attempted}
          color={props.attempted && determineColor(props.letters[index], index)}
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
          index={number}
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
        Wordle
      </h1>
    </div>
  );
}

function KeyboardLetter(props) {
  const answerValue = useContext(AnswerContext);

  const determineColor = (letter) => {
    if (answerValue.includes(props.letter)) {
      return "green";
    } else {
      return "gray";
    }
  };

  return (
    <div
      onClick={() =>
        document.dispatchEvent(
          new KeyboardEvent("keyup", { key: props.letter.toLowerCase() })
        )
      }
      className={`cursor-pointer w-12 h-10 md:h-14 text-xs md:text-sm font-bold bg-gray-200 flex grow shrink items-center justify-center rounded-md m-1`}
      style={{
        backgroundColor: props.used && determineColor(props.letter),
      }}
    >
      {props.letter}
    </div>
  );
}

function KeyboardLetters() {
  const answerValue = useContext(AnswerContext);
  const lettersValue = useContext(WordsContext);
  const attemptsValue = useContext(AttemptsContext);
  // get arrays from letters value where corresponding indexes in attempts value are true
  const usedLetters = lettersValue.reduce(
    (previousValue, currentValue, index) => previousValue.concat(currentValue)
  );

  // // make a new set with the array
  // const uniqueUsedLettersSet = new Set(usedLetters.split(""));

  // // convert set into an arary with spread operator
  // const uniqueUsedLetters = [...uniqueUsedLettersSet].join("");
  // // console.log(uniqueUsedLetters);
  // // join array into new string
  // console.log(uniqueUsedLetters.includes("H"));

  return (
    <>
      <div className="w-full flex justify-center">
        {ROWONE.map((letter) => (
          <KeyboardLetter
            key={letter}
            letter={letter}
            used={usedLetters.includes(letter)}
          />
        ))}
      </div>
      <div className="w-full flex justify-center px-4">
        {ROWTWO.map((letter) => (
          <KeyboardLetter
            key={letter}
            letter={letter}
            used={usedLetters.includes(letter)}
          />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <div className="w-12  h-10 md:h-14 text-sm font-bold bg-gray-200 flex-1 flex grow items-center justify-center rounded-md m-1">
          ENTER
        </div>
        {ROWTHREE.map((letter) => (
          <KeyboardLetter
            key={letter}
            letter={letter}
            used={usedLetters.includes(letter)}
          />
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
  const [answerState, setAnswerState] = useState("HELLO");

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
      console.log(e);
      if (
        validLetters.includes(e.key.toUpperCase()) &&
        currentWords.current[currentIndex.current].length < 5
      ) {
        currentWords.current[currentIndex.current] += e.key;
        setWordState(
          [...currentWords.current].map((word) => word.toUpperCase())
        );
      } else if (e.key === "Backspace") {
        const updatedWord = currentWords.current[currentIndex.current].slice(
          0,
          -1
        );
        currentWords.current[currentIndex.current] = updatedWord.toUpperCase();
        setWordState([...currentWords.current]);
      } else if (
        e.key === "Enter" &&
        currentWords.current[currentIndex.current].length === 5
      ) {
        CheckWord();
      }
    });
  };

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
