"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import{
    Form,
    FormControl,
    FormField,
    FormMessage,
    FormItem,
    FormDescription
} from "@/components/ui/form"


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";


interface DescriptionFormProps {
    initialData: Course;
    courseId: string;
}

const formSchema = z.object({
    description:z.string().min(1,{
        message: "Description is required"
    })
});


export const DescriptionForm = ({
    initialData,
    courseId,
}: DescriptionFormProps ) => {

    const [isEditing, setIsEditing] = useState(false); 

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || "",
        },
    });

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course description updated successfully");
            toggleEdit();
            router.refresh();
        } catch{
            toast.error("Something went wrong");
        }
    }


    return(
        <div className="mt-6 bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Description
                <Button onClick={toggleEdit} variant="ghost" >
                    {
                        isEditing ?(
                            <>Cancel</>
                        ): (
                            <>
                            <Pencil className="h-4 w-4 mr-2" />
                                Edit description  
                            </>
                        )}
                    
                </Button>
            </div>
            {!isEditing && (
                <p className={cn("text-sm mt-2", 
                    !initialData.description && "text-slate-500 italic"
                )}>
                    {initialData.description || "No description added"}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-4 space-y-4"
                    >
                        <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => ( 
                            <FormItem>
                                    <FormControl>
                                        <Textarea
                                        disabled={isSubmitting}
                                        placeholder="e.g. 'This couse is about web development ....'"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Add some description to your course so that students will know what this video is about.
                                    </FormDescription>
                                    <FormMessage />
                            </FormItem>
                        )} 
                        />
                        <div className="flex items-center gap-x-2">
                            <Button 
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                    
                </Form>
            )}
        </div>
    )
}