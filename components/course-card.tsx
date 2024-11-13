import Link from "next/link";
import Image from "next/image";
import { IconBadge } from "./icon-badge";
import { Book, BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";

interface CourseCardProps {
    id: string;
    title: string;
    imgUrl: string;
    chaptersLength: number;
    price: number;
    progress: number;
    category: string;
}

export const CourseCard = ({
    id,
    title,
    imgUrl,
    chaptersLength,
    price,
    progress,    
    category,
}: CourseCardProps) => {
    return (
        <Link href={`/courses/${id}`}>
        <div className=" group hover:shadow-sm transition overflow-hidden border hover:border-sky-700/30 rounded-lg p-3 h-full">
            <div className="relative w-full aspect-video rounded-md overflow-hidden hover:shadow-sm">
                <Image
                    fill
                    className="object-cover"
                    src={imgUrl}
                    alt={title}
                />
            </div>
            <div className="flex flex-col pt-2">
                <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                    {title}
                </div>
                <p className="text-xs text-muted-foreground">
                    {category}
                </p>
                <div className="my-3 flex items-center gap-x-2 TEXT-SM MD:TEXT-XS">
                    <div className="flex items-center gap-x-2 text-slate-500">
                        <IconBadge
                            size="sm"
                            icon={BookOpen}
                        />
                        <span>
                            {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
                        </span>
                    </div>
                </div>
                {progress !== null ? (
                        <CourseProgress
                        variant={progress === 100 ? "success" : "default"}
                        size="sm"
                        value={progress}
                        
                    />
                    ): (
                        <p className="text-md md:text-sm font-medium">
                            {formatPrice(price)}
                        </p>
                    )
                }
            </div>
        </div>
        </Link>
    )
}