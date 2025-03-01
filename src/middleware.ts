import { auth as middleware } from "@/auth"
import { NextResponse } from "next/server";

export default middleware((req) => {
  const auth = req.auth

  if(!auth) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if(!auth.user._id) {
    return NextResponse.redirect(new URL("/sign-up", req.url));
  }

  return NextResponse.next();
})

export const config = {
  matcher: [
    '/collections/:path*',
    '/settings/:path*',
    '/profile/:path*',
    '/files/:path*'
  ],
  runtime: "nodejs",
  unstable_allowDynamic: [
      // allows a single file
      "/src/db/lib/db.ts",
      // use a glob to allow anything in the function-bind 3rd party module
      "/node_modules/mongoose/dist/**",
  ],
};
