import wordData from "../data/english_words.json";

const WORDS = JSON.parse(JSON.stringify(wordData));

const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date("January 30, 2022 00:00:00").valueOf();
  const now = Date.now();
  const msInDay = 86400000;
  const index = Math.floor((now - epochMs) / msInDay);
  const nextday = (index + 1) * msInDay + epochMs;
  console.log(index);
  return {
    solution_word: WORDS[index % WORDS.length].word.toUpperCase(),
    solution_definition: WORDS[index % WORDS.length].definition,
    solutionIndex: index,
    tomorrow: nextday,
  };
};

export const { solution_word, solution_definition, solutionIndex, tomorrow } =
  getWordOfDay();
