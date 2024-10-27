"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { on } from "events";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps {
    disabled: boolean;
    courseId: string;
    chapterId: string;
    ispublished: boolean;
}

export const ChapterActions = ({
    disabled,
    courseId,
    chapterId,
    ispublished,
}:ChapterActionsProps) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    
    const onClick = async () => {
        try{
            setIsLoading(true);

            if(ispublished){
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
                toast.success("Chapter unpublished successfully");
                // router.refresh();
                // router.push(`/teacher/courses/${courseId}`);
            }else{
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
                toast.success("Chapter published successfully");
                // router.refresh();
                // router.push(`/teacher/courses/${courseId}`);
            }
            router.refresh();
        } catch{
            toast.error("Something went wrong");
        } finally{
            setIsLoading(false);
        }
    }

    const onDelete = async () => {
        try{
            setIsLoading(true);
            
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
            
            toast.success("Chapter deleted successfully");
            router.refresh();
            router.push(`/teacher/courses/${courseId}`);
        } catch{
            toast.error("Something went wrong");
        }finally{
            setIsLoading(false);
        }
    }

    
    return (
        <div className="flex items-center gap-x-2">
            <Button 
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {ispublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
            <Button size={"sm"} disabled={isLoading} >
                <Trash className="h-4 w-4" />
            </Button>
            </ConfirmModal>
        </div>
    )
}