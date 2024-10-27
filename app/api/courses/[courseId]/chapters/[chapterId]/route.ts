import Mux from "@mux/mux-node";
// import MuxUploader from '@mux/mux-uploader-react';
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// const mux = new Mux({
//     tokenId: process.env.MUX_TOKEN_ID,
//     tokenSecret: process.env.MUX_TOKEN_SECRET
//   });

const { video } = new Mux({
    tokenId: process.env.MUX_TOKEN_ID!,
    tokenSecret: process.env.MUX_TOKEN_SECRET!,
  });

export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string, chapterId: string } }
){
    try{
        const { userId } = auth();

        if(!userId){
            return new NextResponse("Unauthorized",{ status: 401 });
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId,
            },
        });

        if(!ownCourse){
            return new NextResponse("Unauthorized",{ status: 401 });
        }

        const chapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
        });

        if(!chapter){
            return new NextResponse("Chapter not found",{ status: 404 });
        }

        if(chapter.videoUrl){
            const existtMuxData = await db.muxData.findFirst({
                where: {
                    chapterId: params.chapterId,
                },
            });
            if(existtMuxData){
                await video.assets.delete(existtMuxData.assetID);
                await db.muxData.delete({
                    where: {
                        id: existtMuxData.id,
                    },
                });
            }
        }
        
        const deletedChapter = await db.chapter.delete({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
        });

        const publishedChaaptersInCourse = await db.chapter.findMany({
            where: {
                courseId: params.courseId,
                ispublished: true,
            },
        });

        if(!publishedChaaptersInCourse.length){
            await db.course.update({
                where: {
                    id: params.courseId,
                },
                data: {
                    isPublished: false,
                },
            });
        }

        return NextResponse.json(deletedChapter);

    } catch(error){
        console.log("[CHAPTER_ID_DELETE]",error);
        return new NextResponse("Internal Error",{ status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string, chapterId: string } }
){
    try{
        const { userId } = auth();
        const { isPublished, ...values } = await req.json();

        if(!userId){
            return new NextResponse("Unauthorized",{ status: 401 });
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId,
            },
        });

        if(!ownCourse){
            return new NextResponse("Unauthorized",{ status: 401 });
        }

        const chapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
            data: {
                ...values
            },
        });

        if (values.videoUrl) {
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    chapterId: params.chapterId,
                },
            });
            if (existingMuxData) {
                await video.assets.delete(existingMuxData.assetID);
                await db.muxData.delete({
                    where: {
                        id: existingMuxData.id,
                    },
                });
            }
            const asset = await video.assets.create({
                input: values.videoUrl,
                playback_policy:[ "public"],
                test: false,
            });
            await db.muxData.create({
                data: {
                    chapterId: params.chapterId,
                    assetID: asset.id,
                    playbackID: asset.playback_ids?.[0]?.id,
                },
            });
        }

        return NextResponse.json(chapter);

    } catch(error){
        console.log("[COURSES_CHAPTER_ID]",error);
        return new NextResponse("Internal Error",{ status: 500 });
        
    }
}