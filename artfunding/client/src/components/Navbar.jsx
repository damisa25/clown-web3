import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { search, menu, clown, logo } from "../assets";
import CustomButton from "./CustomButton";
import { navlinks } from "../constants";
import { useStateContext } from "../context";
const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#312c51] rounded-[100px]">
        <input
          type={"text"}
          placeholder="Search for artworks"
          className="flex w-full font-poppins font-normal text-[14px] placeholder:text-[#f1aa9b] text-white bg-transparent outline-none"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#f0c38e] flex justify-center items-center cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={address ? "Create artwork" : "Connect wallet"}
          styles={address ? "bg-[#f0c38e]" : "bg-[#f1aa9b]"}
          handleClick={() => {
            if (address) navigate("create-event");
            else connect();
          }}
        />

        <Link to={"profile"}>
          <div className="w-[52px] h-[52px] rounded-full bg-[#312c51] flex justify-center items-center cursor-pointer">
            <img
              src={clown}
              alt="profile-clown"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#f0c38e] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="profile-clown-xs"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34x] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#48426d] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "-translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-5">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[#312c51]"
                } items-center`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.path);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[10%] h-[10%] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-4 font-poppins font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#f0c38b]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? "Create artwork" : "Connect wallet"}
              styles={address ? "bg-[#f0c38e]" : "bg-[#f1aa9b]"}
              handleClick={() => {
                if (address) navigate("create-campaign");
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
