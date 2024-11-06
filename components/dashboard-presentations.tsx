"use client";

import React, { useEffect, useTransition } from "react";

import { GeneratedPowerPoints } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { DownloadCloudIcon, ExternalLinkIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { db } from "@/db";
import { useToast } from "@/hooks/use-toast";
import { DeleteGeneratedPowerPoint } from "@/app/dashboard/actions";
import { redirect, useRouter } from "next/navigation";

type Props = {
  presentations: GeneratedPowerPoints[];
};

const DashboardPresentations = ({ presentations }: Props) => {
  const { toast } = useToast();
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  function handleDeletePresentation(presentationId: string) {
    startTransition(async () => {
      const { success, message } =
        await DeleteGeneratedPowerPoint(presentationId);

      if (!success) {
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success!",
        description: message,
        variant: "default",
      });

      router.refresh()
    });
  }

  useEffect(() => {}, [presentations]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {presentations.map((presentation) => (
        <Card
          key={presentation.id}
          className="bg-white/80 backdrop-blur-sm transition-shadow hover:shadow-lg"
        >
          <CardHeader>
            <CardTitle className="line-clamp-2 leading-5">
              {presentation.title || "Untitled presentation"}
            </CardTitle>
            <CardDescription>
              Created at{" "}
              {formatDistanceToNow(new Date(presentation.createdAt), {
                addSuffix: true,
                locale: ptBR,
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 line-clamp-2 text-sm text-gray-500">
              {presentation.description || "No description provided"}
            </p>
            <div className="flex items-center justify-between">
              <Link
                href={presentation.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-blue-600 hover:text-blue-600"
              >
                <DownloadCloudIcon className="mr-1 size-4" />
                Download presentation
              </Link>
              <Button
                disabled={loading}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-800"
                onClick={() => {
                  handleDeletePresentation(presentation.id);
                }}
              >
                <Trash2Icon className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardPresentations;
