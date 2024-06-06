import { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
export default function Login() {
  const [active, setActive] = useState(false);
  const [activeReverse, setActiveReverse] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onsubmit(data) {
    console.log(data);
  }

  return (
    <>
      <div className=" mt-24 sm:mt-24 p-1 sm:p-0 flex flex-row  justify-center items-center">
        <div className="mt-14 h-[370px] flex dd sm:w-[850px] sm:h-[500px] bg-white rounded-3xl">
          <div className="w-[50%] one ">
            <div
              className={` one-a ${
                activeReverse === true ? `one-a-reverse` : ``
              } ${active === true ? `active-one-a` : ``} `}
            >
              <h1 className="text-3xl text-center font-semibold mt-16 ">
                Welcome Back!
              </h1>
              <h1 className="m-4 text-justify">
                Enter your Personal details tso use all of the sites features
              </h1>
              <button
                onClick={() => {
                  setActiveReverse(!activeReverse);
                  setActive(false);
                }}
                className="w-fit self-center py-1.5 px-6  text-white border-2 rounded-md"
              >
                SIGN IN
              </button>
            </div>
            <div
              className={` one-b w-[100%] flex flex-col justify-center ${
                active === true ? `active-one-b` : ``
              } ${activeReverse === true ? `active-one-b-reverse` : ``}`}
            >
              <div
                className={`relative one-b w-[100%] flex flex-col justify-center`}
              >
                <h1 className="self-center text-3xl font-thin">Sign In</h1>
                <form
                  onSubmit={() => {
                    handleSubmit(onsubmit);
                  }}
                  className="self-center flex flex-col pt-10 w-[75%]"
                >
                  <input
                    className="px-2.5 py-2  rounded-lg bg-[#eee] block mb-10 focus:outline-none"
                    type="text"
                    placeholder="Enter your Email"
                  />
                  <input
                    className="px-2.5 py-2  rounded-lg bg-[#eee] block mb-10 focus:outline-none"
                    type="text"
                    placeholder="Enter your Password"
                  />
                  <button
                    onClick={() => {}}
                    className=" w-fit self-center py-1.5 px-6 bg-[#512da8] text-white rounded-md"
                  >
                    SIGN IN
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="w-[50%] two">
            <div
              className={` two-a h-[100%] flex flex-col items-center ${
                active === true ? `active-two-a` : ``
              } ${activeReverse === true ? `active-two-a-reverse` : ``}`}
            >
              <h1 className="mt-16 font-semibold text-3xl">Hello , Friend !</h1>
              <h1 className="m-2 text-l mt-4 text-center">
                Register with your personal details with us to use all the sites
                features
              </h1>
              <button
                onClick={() => {
                  setActive(!active);
                  setActiveReverse(false);
                }}
                className="mt-3  px-6 py-1.5 text-white border-2 rounded-md "
              >
                SIGN UP
              </button>
            </div>
            <div>
              <div
                className={` two-b w-[100%] flex flex-col justify-center ${
                  active === true ? `active-two-b` : ``
                }  ${activeReverse === true ? `active-two-b-reverse` : ``}`}
              >
                <h1 className="self-center text-3xl font-thin">Sign Up</h1>
                <form
                  className="self-center flex flex-col pt-6 w-[75%]"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <input
                    className="px-2.5 py-2  rounded-lg bg-[#eee] block mb-10 focus:outline-none"
                    type="text"
                    placeholder="Enter your Username"
                  />
                  <input
                    className="px-2.5 py-2  rounded-lg bg-[#eee] block mb-10 focus:outline-none"
                    type="text"
                    placeholder="Enter your Email"
                  />
                  <input
                    className="px-2.5 py-2  rounded-lg bg-[#eee] block mb-10 focus:outline-none"
                    type="text"
                    placeholder="Enter your Password"
                  />
                  <input
                    className="px-2.5 py-2  rounded-lg bg-[#eee] block mb-10 focus:outline-none"
                    type="text"
                    placeholder="Confirm Password"
                  />
                  <button
                    onClick={() => {}}
                    className=" w-fit self-center py-1.5 px-6 bg-[#512da8] text-white rounded-md"
                  >
                    SIGN UP
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
