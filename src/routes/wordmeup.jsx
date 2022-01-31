import { useState, useEffect, useRef, useContext, createContext } from "react";
import { usePrevious } from "../hooks/usePrevious";
import wordData from "../data/english_words.json";
import flag from "../ukflag.svg";

import { solution_definition, solution_word } from "../lib/words";

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
        duration: 0.4,
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
        duration: 0.4,
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
        duration: 0.4,
      },
    },
  };
  return (
    <div
      className={`${
        props.letter
          ? "h-14 w-14 flex justify-center grow shrink mx-1"
          : "border border-gray-300 h-14 w-14 flex justify-center grow shrink mx-1"
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
      return "#5F8D41";
    } else if (props.answer.includes(letter)) {
      return "#C4A240";
    } else {
      return "gray";
    }
  };

  const container = {
    hidden: { opacity: 1 },
    flip: {
      transition: {
        staggerChildren: 0.4,
        // delayChildren: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      animate={props.attempted ? "flip" : "hidden"}
      className={`flex justify-between mt-1`}
    >
      {Array.from(Array(solution_word.length).keys()).map((number, index) => (
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
    <div className="flex flex-row justify-center grid grid-rows-5 gap-1 m-4">
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
        borderBottom: "solid 1px #CA0529",
        maxWidth: "100vw",
      }}
      className="mx-auto w-96"
    >
      <h1 className="[color:#002379] mt-1 text-4xl text-center font-black uppercase tracking-wider">
        Britle
      </h1>
    </div>
  );
}

function KeyboardLetter(props) {
  const answerValue = useContext(AnswerContext);

  const determineColor = (letter) => {
    if (answerValue.includes(props.letter)) {
      return "#5F8D41";
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
  const createBlankArray = (length) => [...Array(length)].map((element) => "");

  const [answerState] = useState(solution_word);

  const [wordState, setWordState] = useState(
    createBlankArray(solution_word.length)
  );

  const [attemptsState, setAttemptsState] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [currentAttempt, setCurrentAttempt] = useState(0);

  const prevWordStateRef = useRef(createBlankArray(solution_word.length));

  let prevWordState = prevWordStateRef.current;

  const currentAttemptIndexRef = useRef(0);

  let currentAttemptIndex = currentAttemptIndexRef.current;

  const handleKeyUp = () => {
    document.addEventListener("keyup", (e) => {
      if (
        validLetters.includes(e.key.toUpperCase()) &&
        prevWordState[currentAttemptIndex].length < solution_word.length
      ) {
        const updatedWord =
          [...prevWordState][currentAttemptIndex] + e.key.toUpperCase();
        prevWordState[currentAttemptIndex] = updatedWord;
        setWordState([...prevWordState]);
      } else if (e.key === "Backspace") {
        const updatedWord = [...prevWordState][currentAttemptIndex].slice(
          0,
          -1
        );
        prevWordState[currentAttemptIndex] = updatedWord;
        setWordState([...prevWordState]);
      } else if (
        e.key === "Enter" &&
        prevWordState[currentAttemptIndex].length === solution_word.length
      ) {
        CheckWord();
      }
    });
  };

  function CheckWord() {
    // make an array where up to the current index everything is true
    const wordsComplete = prevWordState.map(
      (word, index) => index <= currentAttemptIndex
    );
    setAttemptsState(wordsComplete);
    // setAttemptsState(prevAttempts[currentAttemptIndex]);
    if (prevWordState[currentAttemptIndex] === answerState) {
      console.log("Correct!");
    } else {
      console.log("Wrong!");
    }
    if (currentAttemptIndex < 5) {
      // update the attempts index instance variable
      currentAttemptIndex += 1;

      const newAttemptsState = attemptsState.map(
        (attempt, index) => index < currentAttemptIndex
      );

      setAttemptsState(newAttemptsState);
    }
  }

  useEffect(() => handleKeyUp(), []);

  // const WordsContext = createContext();

  // function WordsProvider({ children }) {}

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
