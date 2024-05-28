'use client'
import React, { useState } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { navItems } from "@/app/datas/index";
import { useSearchProvider } from "@/app/contexts/searchContext";
import { useRouter } from "next/navigation"; 

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [providedInput, setProvidedInput] = useState("");
  const { updateSearchedKey } = useSearchProvider();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSearch = () => {
    updateSearchedKey(providedInput);
    router.push("/search");
  };

  return (
    <>
      <div className="w-full flex items-center justify-between space-x-5 p-5 bg-black">
        <Link href="/">
            <h4 className="uppercase font-AtypDisplayBold text-green-500">
              MovieEBG
            </h4>
        </Link>
        <div className="justify-between w-full space-x-5 hidden lg:flex">
          <ul className="flex items-center justify-center space-x-5">
            {navItems.map((singleNavItem) => (
              <li key={singleNavItem.providedLink}>
                <Link href={singleNavItem.providedLink}>
                  {singleNavItem.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex bg-gray-800 overflow-hidden rounded-md">
            <input
              type="text"
              className="px-8 py-3 border-none outline-none bg-transparent"
              placeholder="Search any movie..."
              onChange={(e) => {
                setProvidedInput(e.target.value);
              }}
            />
            <button
              className="bg-green-500 px-5 text-gray-900"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </div>
        </div>
        <div
          className="text-2xl flex items-center justify-center p-2 lg:hidden cursor-pointer select-none"
          onClick={toggleMenu}
        >
          <GiHamburgerMenu />
        </div>
      </div>
      {isOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 h-full bg-black/90 w-full -z-10 py-20 px-5 flex">
          <ul className="flex flex-col justify-center">
            {navItems.map((singleNavItem) => (
              <li key={singleNavItem.providedLink} className="custom-minor-title py-4">
                <Link href={singleNavItem.providedLink}>
                  {singleNavItem.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
