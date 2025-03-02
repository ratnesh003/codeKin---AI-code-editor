import Image from "next/image";
import React from "react";
import { ModeToggle } from "./mode-toggel";
import { Button } from "./ui/button";
import {
  ChevronRight,
  MessageSquareQuote,
  Terminal,
  UserPen,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const user = useSession();
  const router = useRouter();

  return (
      <nav className="sticky top-0 w-full p-2 flex items-center justify-between backdrop-blur-sm">
        <div className="flex items-center justify-center gap-8">
          <div className="w-fit flex items-center justify-center gap-1 leading-none">
            <div className="h-14 w-14 overflow-hidden rounded-full flex items-center justify-center">
              <Image
                src={"/codeKin-logo.png"}
                alt="Logo"
                width={200}
                height={200}
                quality={50}
                className="object-cover h-[80px] w-auto dark:invert"
              />
            </div>
            <span>
              <h1 className="text-3xl font-bold leading-none tracking-tighter">
                codeKin
              </h1>
              <p className="text-[6px] tracking-tighter uppercase">
                The code editor with AI auto completion
              </p>
            </span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button
              variant={"link"}
              size={"sm"}
              onClick={() => router.push("/about")}
            >
              <UserPen size={16}/>
              About
            </Button>
            <Button
              variant={"link"}
              size={"sm"}
              onClick={() => router.push("/editor")}
            >
              <Terminal size={16}/>
              Editor
            </Button>
            <Button
              variant={"link"}
              size={"sm"}
              onClick={() => router.push("/feedback")}
            >
              <MessageSquareQuote size={16}/>
              Feedback
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          {user.status == "authenticated" ? (
            <div className="h-fit gap-2 flex items-center justify-center">
              <Button
                size={"sm"}
                className="py-0 capitalize rounded-2xl"
                variant={"link"}
                onClick={() => router.push("/profile")}
              >
                dashboard <ChevronRight />
              </Button>
            </div>
          ) : (
            <div className="h-fit gap-2 flex items-center justify-center">
              <Button
                size={"sm"}
                className="py-0 capitalize rounded-2xl"
                variant={"ghost"}
                onClick={() => router.push("/sign-in")}
              >
                login
              </Button>
              <Button
                size={"sm"}
                className="py-0 capitalize rounded-2xl"
                variant={"ghost"}
                onClick={() => router.push("/sign-up")}
              >
                register
              </Button>
            </div>
          )}

          <ModeToggle />
        </div>
      </nav>
  );
};

export default Navbar;
