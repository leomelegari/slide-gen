"use server";

import { db } from "@/db";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});

export async function DeleteGeneratedPowerPoint(presentationId: string) {
  try {
    const presentation = await db.generatedPowerPoints.findFirst({
      where: {
        id: presentationId,
      },
    });

    if (!presentation) {
      return {
        success: false,
        message: "Presentation not found on our database!",
      };
    }

    await db.generatedPowerPoints.delete({
      where: {
        id: presentationId,
      },
    });

    await utapi.deleteFiles([presentation.id]);

    return { success: true, message: "Presentation deleted successfully!" };
  } catch (error) {
    console.log("error ", error);
    return {
      success: false,
      message: "Something went wrong on our database! Please, try again.",
    };
  }
}
