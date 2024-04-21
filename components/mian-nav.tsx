import Link from "next/link";
import React from "react";
import ToggleMode from "./toggle-mode";
import { auth, signIn, signOut } from "@/lib/auth";
import Image from "next/image";
import { Button } from "./ui/button";

const MainNav = async () => {
  const session = await auth();
  return (
    <nav className="flex justify-between sticky top-0 p-4 bg-white dark:bg-black">
      <div className="flex gap-2 items-center">
        <Link href="/">Home</Link>
      </div>
      <div className="flex gap-2 items-center">
        <ToggleMode />

        {session?.user ? (
          <>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button type="submit" variant="outline" className="felx gap-2">
                {session.user.image && session.user.name && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                Sign Out
              </Button>
            </form>
          </>
        ) : (
          <form
            key={"google"}
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button type="submit" variant="outline">
              <span>Sign in with Google</span>
            </Button>
          </form>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
