import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";

import { auth } from "@clerk/nextjs/server";
import { File, Video } from "lucide-react";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import dynamic from "next/dynamic";

// const Preview = dynamic(() => import("@/components/preview"), { ssr: false });

const ChapterIdPage = async({
    params,
}: {params:{
    courseId: string;
    chapterId: string;
    }
}) => {
    const {userId} = auth();

    if (!userId) {
        return redirect("/");
    }

    const { 
        chapter,
        course,
        muxData,
        attachments,
        nextChapter,
        userProgress,
        purchase,
    } = await getChapter({
        userId,
        courseId : params.courseId,
        chapterId: params.chapterId,
    });

    if(!chapter || !course ){
        return redirect("/");
    }

    const isLocked = !chapter.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;

    return ( 
        <div>
            {userProgress?.isCompleted &&(
                <Banner
                    label="You have completed this chapter"
                    variant={"success"}
                />
            )}
            {isLocked && (
                <Banner
                    label="You need to purchase this course to access this chapter"
                    variant={"warning"}
                />
            )}
            <div className="flex flex-col max-w-4xl mx-auto pb-20">
                <div className="p-4">
                    <VideoPlayer
                        chapterId={params.chapterId}
                        title={chapter.title}
                        courseId={params.courseId}
                        nextChapterId={nextChapter?.id}
                        playbackId={muxData?.playbackID!}
                        isLocked={isLocked}
                        completeOnEnd={completeOnEnd}
                    />
                </div>
                <div>
                    <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                        <h2 className="text-2xl font-semibold mb-2">
                            {chapter.title}
                        </h2>
                        {purchase?(
                            <div>
                                {/* Add Progress Bar */}
                            </div>
                            // TODO: Add Couurse Progress Button
                        ):(
                            <CourseEnrollButton
                                courseId={params.courseId}
                                price={course.price!}
                            />
                        )}
                    </div>
                    <Separator/>
                    <div>
                        {
                            <div> Hello
                                </div>
                        }
                        {/* <Preview value={chapter.description!}/> */}
                    </div>
                    {!!attachments.length && (
                        <>
                            <Separator/>
                            <div className="p-4">
                                {attachments.map((attachment) => (
                                    <a 
                                    href={attachment.url}
                                    target="_blank"
                                    key={attachment.id}
                                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                                    >
                                        <File/>
                                        <p className="line-clamp-1"
                                        >{attachment.name}</p>
                                    </a>
                                ))} …
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default ChapterIdPage ;