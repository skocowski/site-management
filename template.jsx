"use client";
import React, { useEffect, useState } from "react";
import "@fontsource-variable/inter";











const InfyNft = () => {
  const [toggle, setToggle] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleClass = () => {
    setIsNavOpen(!isNavOpen);
    const closeAfterClick = document.querySelector("#nav-icon4");
    closeAfterClick?.classList?.toggle("open");
  };
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="bg-[#050C24] font-interfont">
      <div className="relative mx-auto pt-6 flex flex-col items-center justify-center text-[#D2DADF] bg-[url('./assets/nft/infynft/gradient.svg')] bg-cover">
        <div className="absolute top-0 opacity-10 w-full">
          <img
            src="./assets/nft/infynft/back.png"
            alt="backimg"
            className="mx-auto"
          />
        </div>
   


        <div className="flex w-full md:max-w-[1120px] flex-col gap-10 md:gap-20 px-5 xl:px-0">


        </div>
 

      </div>
    </div>
  );
};

export default InfyNft;


