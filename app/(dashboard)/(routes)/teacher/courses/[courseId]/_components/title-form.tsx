"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import{
    Form,
    FormControl,
    FormField,
    FormMessage,
    FormItem
} from "@/components/ui/form"


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";


interface TitleFormProps {
    initialData: {
        title: string;
    };
    courseId: string;
}

const formSchema = z.object({
    title:z.string().min(1,{
        message: "Title is required"
    })
});


export const TitleForm = ({
    initialData,
    courseId,
}: TitleFormProps ) => {

    const [isEditing, setIsEditing] = useState(false); 

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData.title,
        },
    });

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }


    return(
        <div className="mt-6 bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Title
                <Button variant="ghost" >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit title
                </Button>
            </div>
        </div>
    )
}