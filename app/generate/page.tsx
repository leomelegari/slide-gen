import React from "react";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { redirect } from "next/navigation";
import GenerateForm from "@/components/generate-form";

type Props = {};

const Page = async (props: Props) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/auth-callback");
  }
  return <GenerateForm />;
};

export default Page;
