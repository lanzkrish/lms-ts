import { db } from "@/lib/db";

export const getProgress = async (
    userId: string,
    courseId: string
): Promise<number> => {
    try{
        const publishedChapters = await db.chapter.findMany({
            where: {
                courseId: courseId,
                ispublished: true,
            },
            select: {
                id: true,
            }
        });

        const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

        const validCompletedChapters = await db.userProgress.findMany({
            where: {
                userId: userId,
                chapterId: {
                    in: publishedChapterIds,
                },
                isCompleted: true,
            },
        });

        const progressPercentage = (validCompletedChapters.length / publishedChapters.length) * 100;

        return progressPercentage;

    }catch(error){
        console.log("GET_PROGRESS", error);
        return 0;
    }
};