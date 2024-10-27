"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
    disabled: boolean;
    courseId: string;
    ispublished: boolean;
}

export const Actions = ({
    disabled,
    courseId,
    ispublished,
}:ActionsProps) => {

    const router = useRouter();

    const confetti = useConfettiStore();

    const [isLoading, setIsLoading] = useState(false);
    
    const onClick = async () => {
        try{
            setIsLoading(true);

            if(ispublished){
                await axios.patch(`/api/courses/${courseId}/unpublish`);
                toast.success("Course unpublished successfully");
                // router.refresh();
                // router.push(`/teacher/courses/${courseId}`);
            }else{
                await axios.patch(`/api/courses/${courseId}/publish`);
                toast.success("Course published successfully");
                confetti.onOpen();
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
            
            await axios.delete(`/api/courses/${courseId}`);
            
            toast.success("Course deleted successfully");
            router.refresh();
            router.push(`/teacher/courses`);
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