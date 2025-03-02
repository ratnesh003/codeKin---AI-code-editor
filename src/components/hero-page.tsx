import React from "react";
import { SpinningText } from "./ui/spinning-text";
import Laptop from "./laptop";
import { Button } from "@/components/ui/button";
import { BoxReveal } from "@/components/ui/box-reveal";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative h-full w-full flex flex-col md:flex-row items-center justify-center">
      <div className="lg:w-[50vw] w-full h-96 flex items-center justify-center">
        <div className="relative size-fit max-w-lg items-center justify-center pl-12">
          <SpinningText className="absolute top-3 left-12 z-40">
            learn more • code more • grow more •
          </SpinningText>
          <BoxReveal duration={0.5}>
            <p className="text-[3.5rem] font-semibold">
              Code Kin<span className="text-primary">.</span>
            </p>
          </BoxReveal>

          <BoxReveal duration={0.5}>
            <h2 className="mt-[.5rem] text-[1rem]">
              The Code Editor with{" "}
              <span className="text-primary">AI Auto Completion</span>
            </h2>
          </BoxReveal>

          <BoxReveal duration={0.5}>
            <div className="mt-6">
              <p>
                &#8594; 40+ Languages can be compiled like{" "}
                <span className="font-semibold text-primary">C++</span>,
                <span className="font-semibold text-primary">{" "}Java</span>,
                <span className="font-semibold text-primary">{" "}Python</span>
                , and
                <span className="font-semibold text-primary">{" "}JavaScript</span>
                {" "}and saved at the same time.<br />
                &#8594; 100% secured with Auth.Js and Best Practices. <br />
              </p>
            </div>
          </BoxReveal>

          <BoxReveal duration={0.5}>
            <Link href="/editor">
            <Button className="mt-[1.6rem] bg-primary">Explore <ChevronRight/></Button>
            </Link>
          </BoxReveal>
        </div>
      </div>
      <div className="relative lg:w-[50vw] w-full h-screen flex items-center justify-center">
        <Laptop />
      </div>
    </div>
  );
};

export default Hero;
