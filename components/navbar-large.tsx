import React from "react";

import Link from "next/link";

import { Button, buttonVariants } from "./ui/button";
import MaxWidthWrapper from "./common/max-width-wrapper";
import NavbarMobile from "./navbar-mobile";

import { LayoutDashboardIcon, PresentationIcon } from "lucide-react";

import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

type Props = {};

const NavbarLarge = async (props: Props) => {
  const { getUser } = getKindeServerSession();
  const user: KindeUser<object> | null = await getUser();

  return (
    <MaxWidthWrapper className="flex w-full items-center justify-between border-b border-gray-300 px-8 py-4 text-gray-900">
      <div className="flex w-full items-center justify-between space-x-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold"
        >
          <PresentationIcon className="size-6 shrink-0" />
          <span>SlideGen</span>
        </Link>
        <div className="hidden space-x-8 text-sm md:flex">
          <Link href="/generate">Generate</Link>
          {/* <Link href="/guidelines">Guidelines</Link>
          <Link href="/pricing">Pricing</Link> */}
        </div>
      </div>
      <NavbarMobile user={user} />
      <div className="ml-4 hidden items-center space-x-4 md:flex">
        {user ? (
          <>
            <LogoutLink className={buttonVariants({ variant: "secondary" })}>
              Logout
            </LogoutLink>
            <Link href="/dashboard" className={buttonVariants()}>
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <LoginLink className={buttonVariants({ variant: "secondary" })}>
              Login
            </LoginLink>
            <RegisterLink className={buttonVariants()}>Register</RegisterLink>
          </>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default NavbarLarge;
