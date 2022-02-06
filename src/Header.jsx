import React from "react";
import parrot from "./icons8-parrot-96.png";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Link className="no-underline" to="/">
      <div className="flex items-center pt-20">
        <img src={parrot} className="inline w-14" alt="parrot" />
        <div className="ml-4 sm:text-6xl text-5xl text-slate-800 inline font-semibold tracking-loose">
          Hi. I'm James.
        </div>
        <motion.div className="text-xs sm:text-sm uppercase text-center mb-8 text-gray-600	opacity-90 font-light"></motion.div>
      </div>
    </Link>
  );
};
