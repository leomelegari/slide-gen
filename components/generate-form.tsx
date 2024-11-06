"use client";

import React, { useState } from "react";
import { Loader2Icon, VideoIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import MaxWidthWrapper from "./common/max-width-wrapper";
import { Card } from "./ui/card";
import { CreatePowerPoint } from "@/app/generate/actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type Props = {};

const GenerateForm = (props: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const [url, setUrl] = useState<string>("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateYoutubeUrl = (url: string) => {
    const pattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return pattern.test(url);
  };

  const getVideoId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );

    return match ? match[1] : null;
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;

    if (!newUrl) {
      setError(null);
      setIsValid(false);
      setUrl("");
      return;
    }

    setUrl(newUrl);

    const videoId = getVideoId(newUrl);
    if (validateYoutubeUrl(newUrl) && videoId) {
      setError(null);
      setIsValid(true);
    } else {
      setError("Invalid YouTube URL");
      setIsValid(false);
    }
  };

  const handleGenerate = async () => {
    if (!url) {
      setError("Please, enter a valid YouTube URL");
      return;
    }
    if (!isValid) {
      setError("Invalid YouTube URL");
      return;
    }

    setError(null);

    const videoId = getVideoId(url);
    if (!videoId) {
      setError("Invalid YouTube URL");
      return;
    }

    setIsLoading(true);
    console.log("LOADING.........");

    try {
      const result = await CreatePowerPoint(videoId);
      if (!result.success) {
        toast({
          title: "Something went wrong!",
          description: "Please, try again.",
          variant: "destructive",
        });
      }

      router.push(`/dashboard`);

      // toast({
      //   title: "Success"
      // })
    } catch (error) {
      console.log("error ", error);
      toast({
        title: "Something went wrong!",
        description: "Please, try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-12">
      <MaxWidthWrapper>
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
            Create beautiful presentations{" "}
            <span className="mt-2 block text-lg font-normal text-gray-600">
              Transform any YouTube video into a professional PowerPoint
            </span>
          </h1>
          <Card className="border-0 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
            {isValid ? (
              <div className="mb-8 aspect-video overflow-hidden rounded-xl shadow-lg">
                <iframe
                  src={`https://youtube.com/embed/${getVideoId(url)}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube video player"
                  className="h-full w-full"
                ></iframe>
              </div>
            ) : (
              <div className="mb-8 flex aspect-video flex-col items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 text-slate-500 shadow-inner">
                <VideoIcon className="mb-4 size-16 text-slate-400" />
                <p className="">Enter a YouTube URL to get started!</p>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="url"
                placeholder="Paste YouTube URL here"
                value={url || ""}
                onChange={handleUrlChange}
                className="flex-1 rounded-xl border-slate-200 px-4 py-4 focus:border-yellow-500 focus:ring-yellow-500 sm:py-6"
                disabled={isLoading}
                aria-label="YouTube URL"
              />
              <Button
                disabled={!isValid || isLoading}
                className="px-6 py-6"
                onClick={handleGenerate}
              >
                {isLoading ? (
                  <div>
                    <Loader2Icon className="size-6 animate-spin" />
                  </div>
                ) : (
                  "Create Presentation"
                )}
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-slate-500">
              Supported formats: YouTube video URLs (ex:
              https://youtube.com/watch?v=videoId)
            </p>
          </Card>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default GenerateForm;
