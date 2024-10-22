"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Course } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";


interface ImageFormProps {
    initialData: Course;
    courseId: string;
}

const formSchema = z.object({
    imageUrl:z.string().min(1,{
        message: "Image is required"
    }).optional(),
});


export const ImageForm = ({
    initialData,
    courseId,
}: ImageFormProps ) => {

    const [isEditing, setIsEditing] = useState(false); 

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageUrl: initialData?.imageUrl || "",
        },
    });

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course image updated successfully");
            toggleEdit();
            router.refresh();
        } catch{
            toast.error("Something went wrong");
        }
    }


    return(
        <div className="mt-6 bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Image
                <Button onClick={toggleEdit} variant="ghost" >
                    {isEditing  &&(
                            <>Cancel</>
                        )}
                        {!isEditing && !initialData.imageUrl &&(
                            <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                                Add image
                            </>
                        ) }
                        {!isEditing && initialData.imageUrl &&(
                            <>
                            <Pencil className="h-4 w-4 mr-2" />
                                Edit image  
                            </>
                        )}
                    
                </Button>
            </div>
            {!isEditing && (
                !initialData.imageUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-12 w-12 text-slate-500" />
                    </div>
                ): (
                    <div className="relative aspect-video mt-2">
                        <Image
                            alt="Upload"
                            fill
                            className="object-cover rounded-md"
                            src={initialData.imageUrl ||"/placeholder.png"}
                        />
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseImage"
                        onChange={(url) =>{
                            if(url){
                                // form.setValue("ImageUrl", url);
                                onSubmit({
                                    imageUrl: url
                                })
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 aspect ration recommended
                    </div>
                </div>

            )}
            
        </div>
    )
}