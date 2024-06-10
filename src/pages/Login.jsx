import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import signUp from "../../services/signUp";
import { useDispatch, useSelector } from "react-redux";
import { logInRed } from "../userSlice";
import { logOutRed } from "../userSlice";

export default function Login({ refresh, setRefresh }) {
  useEffect(() => {});
  const Dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [active, setActive] = useState(false);
  const [activeReverse, setActiveReverse] = useState(false);
  const [emailtaken, setEmailTaken] = useState(false);
  const { register, handleSubmit, getValues, formState, reset } = useForm();
  const { errors } = formState;
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ username, email, password }) =>
      signUp({ username, email, password }),
    onSuccess: (data) => {
      Dispatch(logInRed({ _id: data.data._id, token: data.data.token }));
      localStorage.setItem(
        "auth",
        JSON.stringify({ _id: data.data._id, token: data.data.token })
      );
    },
    onError: (error) => {
      setEmailTaken(true);
    },
  });

  function onsubmission({ username, email, password }) {
    mutate({ username, email, password });
    setEmailTaken(false);
  }
  function onError(err) {}

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    getValues: getValuesLogin,
    formState: formStateLogin,
    reset: resetlogin,
  } = useForm();

  function onErrors(err) {}

  const { errors: error } = formStateLogin;

  function onSubmissionLogin(data) {}

  return (
    <>
      {!user.isLogged && (
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
                    reset();
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
                    className="self-center flex flex-col pt-6 w-[75%] gap-4"
                    onSubmit={handleSubmitLogin(onSubmissionLogin, onErrors)}
                  >
                    <input
                      className="px-2.5 py-2  rounded-lg bg-[#eee] block  focus:outline-none"
                      type="text"
                      placeholder="Enter your Email"
                      {...registerLogin(`email`, {
                        required: "This field is required",

                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Please enter a valid email",
                        },
                      })}
                    />
                    {error?.email?.message && (
                      <h1 className="text-sm px-2 ">{error.email.message}</h1>
                    )}
                    <input
                      className="px-2.5 py-2  rounded-lg bg-[#eee] block  focus:outline-none"
                      type="text"
                      placeholder="Enter your Password"
                      {...registerLogin("password", {
                        required: "This field is required",
                      })}
                    />
                    {error?.password?.message && (
                      <h1 className="text-sm px-2">{error.password.message}</h1>
                    )}
                    <button className=" w-fit self-center py-1.5 px-6 bg-[#512da8] text-white rounded-md">
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
                <h1 className="mt-16 font-semibold text-3xl">
                  Hello , Friend !
                </h1>
                <h1 className="m-2 text-l mt-4 text-center">
                  Register with your personal details with us to use all the
                  sites features
                </h1>
                <button
                  onClick={() => {
                    setActive(!active);
                    setActiveReverse(false);
                    resetlogin();
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
                    className="self-center flex flex-col pt-6 w-[75%] gap-4"
                    onSubmit={handleSubmit(onsubmission, onError)}
                  >
                    <input
                      className={`px-2.5 py-2  rounded-lg bg-[#eee] block  focus:outline-none ${
                        errors?.username?.message ? `border-form-color` : ``
                      }`}
                      type="text"
                      placeholder="Enter your Username"
                      {...register("username", {
                        required: "This field is required",
                        minLength: {
                          value: 8,
                          message: "Username must be 8 characters long",
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9]*$/,
                          message:
                            "Username cannot contain any spaces and special characters",
                        },
                        maxLength: {
                          value: 20,
                          message: "username must be less than 20 characters",
                        },
                      })}
                    />
                    {errors?.username?.message && (
                      <h1 className="text-sm px-2">
                        {errors.username.message}
                      </h1>
                    )}
                    <input
                      className={`px-2.5 py-2  rounded-lg bg-[#eee] block focus:outline-none ${
                        errors?.email?.message ? `border-form-color` : ``
                      }`}
                      type="text"
                      placeholder="Enter your Email"
                      {...register(`email`, {
                        required: "This field is required",

                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Please enter a valid email",
                        },
                      })}
                    />
                    {errors?.email?.message && (
                      <h1 className="text-sm px-2">{errors.email.message}</h1>
                    )}
                    {emailtaken && (
                      <h1 className="text-sm px-2">Email already Taken</h1>
                    )}
                    <input
                      className={`px-2.5 py-2  rounded-lg bg-[#eee] block focus:outline-none ${
                        errors?.password?.message ? `border-form-color` : ``
                      }`}
                      type="password"
                      placeholder="Enter your Password"
                      {...register(`password`, {
                        required: "This field is required",
                        minLength: {
                          value: 8,
                          messsage: "password must be atleast 8 characters",
                        },
                      })}
                    />
                    {errors?.password?.message && (
                      <h1 className="text-sm px-2">
                        {errors.password.message}
                      </h1>
                    )}
                    <input
                      className={`px-2.5 py-2  rounded-lg bg-[#eee] block  focus:outline-none ${
                        errors?.confirmPassword?.message
                          ? `border-form-color`
                          : ``
                      }`}
                      type="password"
                      placeholder="Confirm Password"
                      {...register(`confirmPassword`, {
                        required: "This field is required",
                        validate: (value) => {
                          return (
                            value === getValues().password ||
                            "Given passwords do not match"
                          );
                        },
                      })}
                    />
                    {errors?.confirmPassword?.message && (
                      <h1 className="text-sm px-2">
                        {errors.confirmPassword.message}
                      </h1>
                    )}
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
      )}
      {user.isLogged && (
        <div className="flex justify-center pt-10">
          <button
            onClick={() => {
              Dispatch(logOutRed({ _id: ``, token: `` }));
              localStorage.clear();
              setRefresh(!refresh);
            }}
            className={`btn-search-page w-[100px] h-[50px]`}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
