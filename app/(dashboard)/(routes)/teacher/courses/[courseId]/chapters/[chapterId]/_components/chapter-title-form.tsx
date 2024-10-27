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


interface ChapterTitleFormProps {
    initialData: {
        title: string;
    };
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    title:z.string().min(1)
});


export const ChapterTitleForm = ({
    initialData,
    courseId,
    chapterId,
}: ChapterTitleFormProps ) => {

    const [isEditing, setIsEditing] = useState(false); 

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData.title,
        },
    });

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter title updated successfully");
            toggleEdit();
            router.refresh();
        } catch{
            toast.error("Something went wrong");
        }
    }


    return(
        <div className="mt-6 bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter Title
                <Button onClick={toggleEdit} variant="ghost" >
                    {
                        isEditing ?(
                            <>Cancel</>
                        ): (
                            <>
                            <Pencil className="h-4 w-4 mr-2" />
                                Edit title  
                            </>
                        )}
                    
                </Button>
            </div>
            {!isEditing && (
                <p className="text-sm mt-2">
                    {initialData.title}
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
                        name="title"
                        render={({ field }) => ( 
                            <FormItem>
                                    <FormControl>
                                        <Input
                                        disabled={isSubmitting}
                                        placeholder="e.g. 'Introduction to course..'"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        What would you like to name your course?
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