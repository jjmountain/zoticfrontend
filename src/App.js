import React from "react";
import { Header } from "./Header";
import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function App() {
  return (
    <>
      <div className="h-screen max-w-3xl mx-auto">
        <Header />
        <div className="text-2xl mt-8 text-slate-900	tracking-loose font-light">
          I'm a{" "}
          <a href="https://github.com/jjmountain" target="_blank">
            software engineer{" "}
          </a>
          who loves language and learning.
        </div>
        <div className="text-xl mt-4 text-slate-900	tracking-loose font-light">
          私は言語と学習が大好きな
          <a href="https://github.com/jjmountain" target="_blank">
            ソフトウェアエンジニア
          </a>
          です。
        </div>
        <div className="text-xl mt-4 text-slate-900	tracking-loose font-light">
          저는 언어와 학습을 사랑하는{" "}
          <a href="https://github.com/jjmountain" target="_blank">
            소프트웨어 엔지니어
          </a>
          입니다.
        </div>

        <h1 className="text-slate-900 mt-12">Some projects I've worked on</h1>
        <ul className="list-disc pl-6">
          <li className="text-lg my-2">
            I built{" "}
            <a href="https://www.finnly.io/" target="_blank">
              this landing page
            </a>{" "}
            for a crytpo-trading startup
          </li>
          <li className="text-lg">
            I made my own version of <Link to="/word-me-up">Wordle</Link> 🤔
          </li>
        </ul>

        <h1 className="text-slate-900">Some other stuff</h1>
        <ul className="list-disc pl-6">
          <li className="text-lg my-2">A list of my favourite Korean films.</li>
          <li className="text-lg">
            <a target="_blank" href="https://icons8.com/icon/36840/parrot">
              Parrot
            </a>{" "}
            icon by{" "}
            <a target="_blank" href="https://icons8.com">
              Icons8
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
