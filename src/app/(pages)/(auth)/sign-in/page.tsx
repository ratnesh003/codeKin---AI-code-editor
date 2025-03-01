"use client";

import { LoginForm } from "@/components/login-form";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const SignInPage = () => {
  const auth = useSession();

  if (auth.status == "authenticated") {
    return redirect("/profile");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};

export default SignInPage;
