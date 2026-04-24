"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidateProjects() {
  revalidateTag("projects", "max");
  revalidatePath("/");
  revalidatePath("/project/[id]", "page");

  return {
    ok: true,
    tag: "projects",
    timestamp: Date.now(),
  };
}
