import React from "react";

function Footer() {
  return (
    <footer className="relative text-center mt-auto bottom-0n">
      <div className="bg-[#AAD1A6]  w-screen flex flex-col items-center gap-y-2 p-4 mt-4">
        <p className="text-white text-4xl font-bold">Mehblog</p>
        <div className="flex gap-x-4">
          <a href="/" className="text-white font-semibold">
            Terms and Conditions
          </a>
          <a href="/" className="text-white font-semibold">
            Privacy
          </a>
        </div>
        <p className="text-white font-semibold font-mono">
          Disign and developed by Mehrab Riyan
        </p>
      </div>
    </footer>
  );
}

export default Footer;
