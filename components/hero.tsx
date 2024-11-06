import React from "react";
import MaxWidthWrapper from "./common/max-width-wrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Card } from "./ui/card";
import Image from "next/image";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

type Props = {};

const Hero = (props: Props) => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100">
      <MaxWidthWrapper>
        <div className="grid items-center lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <h1 className="mb-6 text-4xl font-black leading-tight text-gray-900 lg:text-6xl">
              Generate educational{" "}
              <span className="text-yellow-600">PowerPoints</span> from YouTube
              videos.
            </h1>
            <p className="mb-9 text-lg text-gray-600">
              An online tool for teachers that allows you to convert educational
              YouTube videos into engaging presentations.
            </p>
            <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 lg:justify-start">
              <RegisterLink
                className={buttonVariants({
                  className: "w-full sm:w-auto",
                })}
              >
                Get started
              </RegisterLink>
              <LoginLink
                className={buttonVariants({
                  variant: "link",
                  className: "w-full sm:w-auto",
                })}
              >
                Generate PowerPoint
              </LoginLink>
            </div>
          </div>
          <div>
            <Card className="overflow-hidden shadow-2xl">
              <Image
                src="/lecture-1.png"
                alt="hero image"
                width={600}
                height={600}
                className="h-auto w-full object-cover"
              />
            </Card>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Hero;
