import React from "react";

import { redirect } from "next/navigation";

import { CreateUserIfNull } from "./actions";

type Props = {};

const Page = async (props: Props) => {
  const { success } = await CreateUserIfNull();
  if (!success) {
    return <div>Something went wrong, try again!</div>;
  }

  redirect("/");
};

export default Page;
