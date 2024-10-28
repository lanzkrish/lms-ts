import { category, Course } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
    category: category | null;
    chapters: { id: string}[];
    progress: number | null;
};

type GetCourses = {
    userId: string;
    title?: string;
    categoryId?: string;
};


export const getCourses = async ({
    userId,
    title,
    categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
    try{
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                title:{
                    contains: title,
                },
                categoryId,
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        ispublished: true,
                    },
                    select: {
                        id: true,
                    },
                },
                purchasess: {
                    where: {
                        userId,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const coursesWithProgress : CourseWithProgressWithCategory[] = await Promise.all(courses.map(async (course) => {
            if (course.purchasess.length === 0) {
                return{
                    ...course,
                    progress: null
                }
            }

            const progressPercentage = await getProgress(userId, course.id);

            return {
                ...course,
                progress: progressPercentage,
            };
        }));

        return coursesWithProgress;

    }catch(error){
        console.log("GET_COURSES", error);
        return [];
    }
};