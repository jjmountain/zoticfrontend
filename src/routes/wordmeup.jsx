import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";

const Letter = () => {
  return (
    <input
      type="text"
      className="text-gray-50 text-3xl font-bold border-2 border-gray-300 h-16 w-16 flex justify-center items-center"
    />
  );
};

const LetterRow = () => {
  return (
    <div className="grid grid-cols-5 gap-1 flex-none">
      {Array.from(Array(5).keys()).map((number) => (
        <Letter key={number} />
      ))}
    </div>
  );
};

function GameBox() {
  return (
    <div className="flex justify-center grid grid-rows-5 gap-1">
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
    <div className="w-12 h-16 text-sm font-bold bg-gray-200 flex items-center justify-center rounded-md m-1">
      {props.letter}
    </div>
  );
}

function KeyboardLetters() {
  const keyboardLettersRowOne = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
  ];

  const keyboardLettersRowTwo = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];

  const keyboardLettersRowThree = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <>
      <div className="w-full flex justify-center">
        {keyboardLettersRowOne.map((letter) => (
          <KeyboardLetter key={letter} letter={letter} />
        ))}
      </div>
      <div className="w-full flex justify-center">
        {keyboardLettersRowTwo.map((letter) => (
          <KeyboardLetter key={letter} letter={letter} />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <div className="w-12 h-16 text-sm font-bold bg-gray-200 flex-1 flex items-center justify-center rounded-md m-1">
          ENTER
        </div>
        {keyboardLettersRowThree.map((letter) => (
          <KeyboardLetter key={letter} letter={letter} />
        ))}
        <div className="w-12 h-16 text-sm font-bold bg-gray-200 flex-1 flex items-center justify-center rounded-md m-1">
          DEL
        </div>
      </div>
    </>
  );
}

function Keyboard() {
  return (
    <div className="mx-auto">
      <KeyboardLetters />
    </div>
  );
}

export default function WordMeUp() {
  const [state, setState] = useState([{ answer: "hello" }]);
  useEffect(() => {});

  return (
    <div className="w-full mx-auto">
      <div className="h-screen flex flex-col justify-between py-4">
        <Header />
        <GameBox />
        <Keyboard />
      </div>
    </div>
  );
}
