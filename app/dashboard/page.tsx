import MaxWidthWrapper from "@/components/common/max-width-wrapper";
import DashboardPresentations from "@/components/dashboard-presentations";
import { Button, buttonVariants } from "@/components/ui/button";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { FileX2Icon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const Page = async (props: Props) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const presentations = await db.generatedPowerPoints.findMany({
    where: {
      ownerId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-12">
      <MaxWidthWrapper>
        <h1 className="px-4 pb-6 text-start text-4xl font-bold text-gray-800">
          Your presentations
        </h1>
        {presentations ? (
          <DashboardPresentations presentations={presentations} />
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center gap-4 text-gray-600">
            <div className="flex flex-row gap-4">
              <FileX2Icon className="size-6" />
              <p>No presentations found!</p>
            </div>
            <Link href="/generate" className={buttonVariants()}>
              Generate now!
            </Link>
          </div>
        )}
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
