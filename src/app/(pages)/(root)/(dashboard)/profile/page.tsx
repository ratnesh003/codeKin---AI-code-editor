"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import React from "react";

const ProfilePage = () => {
  return (
    <div>
      <h1>ProfilePage</h1>
      <Button onClick={async () => await signOut({ redirectTo: "/" })}>SIgn out</Button>
    </div>
  );
};

export default ProfilePage;
