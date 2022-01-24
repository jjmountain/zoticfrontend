import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Link className="no-underline" to="/">
      <motion.div
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        initial={{ opacity: 0 }}
        className=" sm:text-6xl text-5xl  mt-8 text-slate-800	font-semibold tracking-loose"
      >
        Hi. I'm James.
      </motion.div>
      <motion.div className="text-xs sm:text-sm uppercase text-center mb-8 text-gray-600	opacity-90 font-light"></motion.div>
    </Link>
  );
};
