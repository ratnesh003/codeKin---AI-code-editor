"use client";

import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggel";
export default function Home() {
  return (
    <div>
      Landing Page
      <ModeToggle />
    </div>
  );
}
