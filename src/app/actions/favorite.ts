"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function toggleFavoriteAction(resourceId: string, isFavorite: boolean) {
  try {
    await prisma.resource.update({
      where: { id: resourceId },
      data: { isFavorite },
    });
    
    // Revalidate the main layout or specific paths so that lists update
    revalidatePath("/", "layout");
    
    return { success: true };
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return { success: false, error: "Failed to toggle favorite" };
  }
}
