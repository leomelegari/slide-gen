import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export async function CreateUserIfNull() {
  try {
    const { getUser } = getKindeServerSession();
    const user: KindeUser<object> | null = await getUser();

    if (!user) {
      return { success: false };
    }

    const existingUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!existingUser && user) {
      await db.user.create({
        data: {
          id: user.id,
          name: user.given_name! + " " + user.family_name,
          email: user.email!,
        },
      });

      return { success: true };
    }
    return { success: true };
  } catch (error) {
    console.log("error ", error);
    return { success: false };
  }
}
