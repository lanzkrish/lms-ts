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
import { Combobox } from "@/components/ui/combobox";


interface CategoryFormProps {
    initialData: Course;
    courseId: string;
    options: {label: string; value:string;}[];
}

const formSchema = z.object({
    categoryId:z.string().min(1),
});


export const CategoryForm = ({
    initialData,
    courseId,
    options,
}: CategoryFormProps ) => {

    const [isEditing, setIsEditing] = useState(false); 

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: initialData?.categoryId || "",
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

    const selectedOption = options.find((option) => option.value ===initialData.categoryId)

    return(
        <div className="mt-6 bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Categoty
                <Button onClick={toggleEdit} variant="ghost" >
                    {
                        isEditing ?(
                            <>Cancel</>
                        ): (
                            <>
                            <Pencil className="h-4 w-4 mr-2" />
                                Edit Categoty  
                            </>
                        )}
                    
                </Button>
            </div>
            {!isEditing && (
                <p className={cn("text-sm mt-2", 
                    !initialData.categoryId && "text-slate-500 italic"
                )}>
                    {selectedOption?.label  || "No category added"}
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
                        name="categoryId"
                        render={({ field }) => ( 
                            <FormItem>
                                    <FormControl>
                                        <Combobox
                                        options={options}
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