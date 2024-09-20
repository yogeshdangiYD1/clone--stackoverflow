import { useState } from "react";

function Navbar() {
  const [selected, setSelected] = useState("POST");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item) => {
    setSelected(item);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="2xl:container 2xl:mx-auto">
      <div className="bg-white-800 shadow-inner py-5 px-7">
        <nav className="flex justify-between bg-white-800">
          <div className="flex items-center space-x-3 lg:pr-16 pr-6">
            <img
              className="cursor-pointer"
              width="34"
              height="34"
              src="https://cdn.sstatic.net/Sites/stackoverflow/Img/icon-48.png?v=b7e36f88ff92"
              alt=""
            />
            <h2 className="font-bold text-3xl  leading-6 text-black-800">
              Stack Overflow
            </h2>
          </div>

          <ul className="hidden md:flex justify-center flex-auto space-x-2">
            {["Home", "Your Post", "Create Post", "Profile"].map(
              (item) => (
                <li
                  key={item}
                  onClick={() => handleSelect(item)}
                  className={`focus:outline-none focus:ring-2 shadow-xl focus:ring-offset-2
                    focus:ring-gray-800 ${
                   selected === item
                     ? "bg-indigo-600 text-white"
                     : "text-black border-zinc-50 border-5  border-none"
                 } cursor-pointer px-3 py-2.5 leading-3  shadow-zinc-500 shadow-xl hover:shadow-inner
                  hover:shadow-zinc-500
                   rounded-xl text-lg `}
               >
                  {item}
                </li>
              )
            )}
          </ul>
         
        </nav>

        {/* Mobile Menu */}
        <div className="block md:hidden w-full mt-5">
          <div
            onClick={toggleMenu}
            className="cursor-pointer px-4 py-3 text-white bg-indigo-600 rounded flex justify-between items-center w-full"
          >
            <div className="flex space-x-2">
              <span
                className={`font-semibold text-sm leading-3 ${
                  selected === "POST" ? "block" : "hidden"
                }`}
              >
                Selected:{" "}
              </span>
              <p
                id="textClicked"
                className="font-normal text-sm leading-3 cursor-pointer"
              >
                {selected}
              </p>
            </div>
           
          </div>
          <div className={`relative ${isOpen ? "block" : "hidden"}`}>
            <ul className="font-normal text-base leading-4 absolute top-2 w-full rounded shadow-md">
              {["Home", "Your Post", "Create Post", "Profile"].map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    handleSelect(item);
                    toggleMenu();
                  }}
                  className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-800 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
