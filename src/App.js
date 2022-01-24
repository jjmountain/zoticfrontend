import React, { useContext } from "react";
import { Header } from "./components/Header";
import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function App() {
  return (
    <>
      <div className="h-screen max-w-3xl mx-auto">
        <Header />
        <motion.span
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          initial={{ opacity: 0 }}
          className="text-2xl mt-8 text-slate-900	tracking-loose"
        >
          I'm a developer who loves language. In a previous lifetime I was an
          English language teacher.
        </motion.span>

        <ul>
          <li className="">
            I made this in my free time <Link to="/word-me-up">Wordle</Link>{" "}
            clone in my free time.
          </li>
        </ul>
      </div>
    </>
  );
}
