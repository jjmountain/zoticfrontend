import React, { createContext, useState } from "react";
import { useContext, useRef } from "react/cjs/react.development";
import { solution_word, createArray } from "../lib/words";

const DataContext = createContext();

export const useWords = () => useContext(DataContext);

export default function DataProvider({ children }) {
  const prevWordStateRef = useRef(createArray(solution_word.length, ""));

  let prevWordState = prevWordStateRef.current;

  const currentAttemptIndexRef = useRef(0);

  let currentAttemptIndex = currentAttemptIndexRef.current;

  const [answer] = useState(solution_word);

  const [wordState, setWordState] = useState(
    createArray(solution_word.length, "")
  );

  const checkWord = () => {
    // make an array where up to the current index everything is true
    const wordsComplete = prevWordState.map(
      (word, index) => index <= currentAttemptIndex
    );
    setAttemptsState(wordsComplete);
    // setAttemptsState(prevAttempts[currentAttemptIndex]);
    if (prevWordState[currentAttemptIndex] === answer) {
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
  };

  const [attemptsState, setAttemptsState] = useState(createArray(5));

  const [rowAnimationState, setRowAnimationState] = useState(createArray(5));

  return (
    <DataContext.Provider
      value={{
        answer,
        wordState,
        attemptsState,
        rowAnimationState,
        prevWordState,
        currentAttemptIndex,
        checkWord,
        setWordState,
        setAttemptsState,
        setRowAnimationState,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
