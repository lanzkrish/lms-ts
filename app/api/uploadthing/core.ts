import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { isTeacher } from "@/lib/teacher";

const f = createUploadthing();

const handleAuth = () => {
    const { userId } = auth();
    const isAuthorized = isTeacher(userId);
    if (!userId || !isTeacher) throw new Error("Unauthorized");
    {
        return { userId };
    }
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { 
            console.log("Uploaded course image:");
        }),
    courseAttachment: f(["text", "image", "video", "audio", "pdf"])
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
    chapterVideo: f({ video: { maxFileSize: "512GB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
