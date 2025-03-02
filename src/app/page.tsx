"use client";

import Hero from "@/components/hero-page";
import Navbar from "@/components/navbar";
import React from "react";
export default function Home() {
  return (
    <div className="relative h-full w-full">
      <Navbar />
      <Hero />
    </div>
  );
}
