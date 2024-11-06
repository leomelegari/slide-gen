"use client";

import React, { useState } from "react";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button, buttonVariants } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

import { MenuIcon } from "lucide-react";

import Link, { LinkProps } from "next/link";

import { cn } from "@/lib/utils";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

type MobileLinkProps = LinkProps & {
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  children: React.ReactNode;
};

const MobileLink = ({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) => {
  return (
    <Link
      href={href}
      onClick={() => onOpenChange?.(false)}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
};

const NavbarMobile = ({ user }: { user: KindeUser<object> }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="flex md:hidden">
        <Button variant="outline">
          <MenuIcon className="size-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetTitle>SlideGen</SheetTitle>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pr-10">
          <div className="flex flex-col space-y-3">
            <MobileLink href="/generate" onOpenChange={setOpen}>
              Generate
            </MobileLink>
            {/* <MobileLink href="/guidelines" onOpenChange={setOpen}>
              Guidelines
            </MobileLink> */}
            {user ? (
              <>
                <LogoutLink className={buttonVariants({ variant: "ghost" })}>
                  Logout
                </LogoutLink>
                <Link href="/dashboard" className={buttonVariants()}>
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <LoginLink className={buttonVariants({ variant: "ghost" })}>
                  Login
                </LoginLink>
                <RegisterLink className={buttonVariants()}>
                  Register
                </RegisterLink>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMobile;
