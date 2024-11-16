import SigninForm from "@/components/ui-components/signin";
import React from "react";

export default function SigninPage() {
  return (
    <div className=" ">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className=" w-full flex justify-center mt-20">
          <SigninForm />
        </div>
        <div className="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-100 sm:px-6 lg:px-8">
          <div>
            <img
              className="w-full mx-auto"
              src="/images/auth/signin.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
