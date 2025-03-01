"use client";

import { RegisterForm } from "@/components/register-form";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const SignUpPage = () => {
  const auth = useSession();

  if (auth.status == "authenticated") {
    return redirect("/profile");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
};

export default SignUpPage;
