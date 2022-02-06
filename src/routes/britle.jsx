import { useEffect } from "react";

import { useWords } from "../hooks/word-hooks";
import { Header } from "./components/Header";
import { Keyboard } from "./components/Keyboard";

import { solution_word, VALIDLETTERS } from "../lib/words";
import { motion } from "framer-motion";
import React from "react";

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
        <motion.span className="font-bold text-3xl" animate={{ rotateX: 180 }}>
          {" "}
          {props.letter}{" "}
        </motion.span>
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
        className="h-14 w-14 border-gray-500 border font-bold text-3xl text-gray-800"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
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
          ? "h-14 w-14 flex justify-center grow shrink mx-0.5"
          : "border border-gray-300 h-14 w-14 flex justify-center grow shrink mx-0.5 "
      }`}
    >
      <motion.div
        variants={letterVariant}
        animate={letterState}
        className={`${
          letterState === "show"
            ? "h-full w-full flex border border-gray-500 justify-center items-center grow shrink relative text-xl font-semibold text-gray-900"
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
      return "#787C7E";
    }
  };

  const container = {
    hidden: { opacity: 1 },
    flip: {
      transition: {
        staggerChildren: 0.25,
        // delayChildren: 0.5,
      },
    },
  };

  const onFlipComplete = () => {};

  return (
    <motion.div
      variants={container}
      animate={props.attempted ? "flip" : "hidden"}
      className={`flex justify-between mt-0.5`}
      onAnimationComplete={(definition) => {
        console.log("animation complete", definition);
      }}
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
  const { answer, wordState, attemptsState } = useWords();

  return (
    <div className="flex flex-row justify-center grid grid-rows-5 gap-1 m-4">
      {Array.from(Array(6).keys()).map((number, index) => (
        <LetterRow
          key={number}
          index={number}
          answer={answer}
          letters={wordState[index]}
          attempted={attemptsState[index]}
        />
      ))}
    </div>
  );
}

export default function Britle() {
  const { setWordState, prevWordState, currentAttemptIndex, checkWord } =
    useWords();

  const handleKeyUp = () => {
    document.addEventListener("keyup", (e) => {
      console.log("current attempt index in britle", currentAttemptIndex());
      if (
        VALIDLETTERS.includes(e.key.toUpperCase()) &&
        prevWordState[currentAttemptIndex()].length < solution_word.length
      ) {
        const updatedWord =
          [...prevWordState][currentAttemptIndex()] + e.key.toUpperCase();
        console.log(updatedWord);
        prevWordState[currentAttemptIndex()] = updatedWord;

        setWordState([...prevWordState]);
      } else if (e.key === "Backspace") {
        const updatedWord = [...prevWordState][currentAttemptIndex()].slice(
          0,
          -1
        );
        prevWordState[currentAttemptIndex()] = updatedWord;
        setWordState([...prevWordState]);
      } else if (
        e.key === "Enter" &&
        prevWordState[currentAttemptIndex()].length === solution_word.length
      ) {
        checkWord();
      }
    });
  };

  useEffect(() => handleKeyUp(), []);

  return (
    <div
      style={{
        backgroundColor: "white",
        backgroundImage: "url(../Mod_symbol.svg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "top",
      }}
      className="max-w-3xl mx-auto h-screen flex flex-col justify-between py-4 bg-white"
    >
      <Header />
      <GameBox />
      <Keyboard />
    </div>
  );
}
