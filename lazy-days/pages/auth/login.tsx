import EmptyLayout from "@/layouts/EmptyLayout";
import { useRef, useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

type Props = {};

const Login = (props: Props) => {
   const router = useRouter();

   const usernameRef = useRef<HTMLInputElement>(null);
   const passRef = useRef<HTMLInputElement>(null);
   const config = {
      headers: {
         "content-type": "application/json",
         "Access-Control-Allow-Origin": "*",
      },
   };
   const authFetch = axios.create({
      baseURL: "https://localhost:44335/api",
   });
   const notify = (message: any) => {
      if (message == "Success") {
         toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
         });
      } else {
         toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
         });
      }
   };
   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(usernameRef.current?.value, passRef.current?.value);

      const account_info = {
         maTaikhoan: "TK111",
         tenTaikhoan: usernameRef.current?.value,
         matkhau: passRef.current?.value,
         maNv: "NV111",
      };

      const login = authFetch.post("/Taikhoan", account_info, config);
      login.then((user) => {
         console.log(user.data);
         if (user.data == "Failed") {
            notify("Accout wrong");
            return;
         }
         if (user.data[0].MA_NV) {
            authFetch.get("/NhanViens/" + user.data[0].MA_NV).then((role) => {
               sessionStorage.setItem("Ma_NV", user.data[0].MA_NV);
               sessionStorage.setItem("CHUC_VU", role.data[0].CHUC_VU);
               if (user.data[0].MA_NV[0] == "N") {
                  notify("Success");
               }

               router.push("/");
            });
         }
      });
   };

   return (
      <EmptyLayout>
         <section className="bg-gray-50 dark:bg-gray -900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
               <a
                  href="#"
                  className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
               >
                  <img
                     className="w-8 h-8 mr-2"
                     src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                     alt="logo"
                  />
                  Flowbite
               </a>
               <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                     <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                        Sign in to your account
                     </h1>
                     <form
                        className="space-y-4 md:space-y-6"
                        action="#"
                        onSubmit={handleSubmit}
                     >
                        <div>
                           <label
                              htmlFor="text"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                              Username
                           </label>
                           <input
                              ref={usernameRef}
                              type="text"
                              name="Username"
                              id="Username"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="abc123"
                           />
                        </div>
                        <div>
                           <label
                              htmlFor="password"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                              Password
                           </label>
                           <input
                              ref={passRef}
                              type="password"
                              name="password"
                              id="password"
                              placeholder="••••••••"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           />
                        </div>

                        <button
                           type="submit"
                           className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                           style={{ backgroundColor: "#058BFD" }}
                        >
                           Sign in
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </section>
      </EmptyLayout>
   );
};

export default Login;
