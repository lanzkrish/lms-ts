"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Router } from "lucide-react";




const formSchema = z.object({
    title:z.string().min(1,{
        message: "Title is required"
    })
})


const CreatePage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const response = await axios.post("/api/courses", values);
            router.push(`/teacher/courses/${response.data.id}`);
            toast.success("Course created successfully");
        }catch{
            console.log("error!! Something went wrong");
            toast.error("Something went wrong");
        }
    }


    return ( 
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 ">
            <div>
                <h1 className="text-2xl">
                    Name your course
                </h1>
                <p className="text-sm text-slate-600">
                    What would you like to name your course? Don&apost worry, you can change it later.
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-8 space-y-8"
                    >
                        <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => ( 
                            <FormItem>
                                <FormLabel>Course Title</FormLabel>
                                <FormLabel>
                                    <FormControl>
                                        <Input
                                        disabled={isSubmitting}
                                        placeholder="e.g. Introduction to Web Development"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        What would you like to name your course?
                                    </FormDescription>
                                    <FormMessage />
                                </FormLabel>
                            </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/">
                                <Button
                                type="button"
                                variant="ghost"
                                >Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={!isValid || isSubmitting}>
                                Continue 
                                </Button>
                        </div>

                    </form>
                </Form>
            </div>
        </div>
     );
}
 
export default CreatePage;