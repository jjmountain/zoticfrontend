import { useWords } from "../../hooks/word-hooks";
import { ROWONE, ROWTWO, ROWTHREE } from "../../lib/words";
import { KeyboardLetter } from "./KeyboardLetter";

export const Keyboard = () => {
  const { wordState, attemptsState } = useWords();

  const usedwordState = attemptsState.filter((value, index) => value);

  const lettersToTest = usedwordState.map((value, index) => wordState[index]);

  let usedLetters = [];

  if (lettersToTest.length) {
    usedLetters = lettersToTest.reduce((previousValue, currentValue, index) =>
      previousValue.concat(currentValue)
    );
  }

  return (
    <div className="px-3">
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
        <div className="w-12 h-10 md:h-14 text-sm font-bold bg-gray-200 flex-1 flex grow items-center justify-center rounded-md m-1">
          ENTER
        </div>
        {ROWTHREE.map((letter) => (
          <KeyboardLetter
            key={letter}
            letter={letter}
            used={usedLetters.includes(letter)}
          />
        ))}
        <div className="w-12 h-10 md:h-14 text-sm font-bold bg-gray-200 flex-1 flex grow items-center justify-center rounded-md m-1">
          DEL
        </div>
      </div>
    </div>
  );
};
