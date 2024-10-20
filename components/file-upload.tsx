"use client"

import toast from "react-hot-toast";

import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter  } from "@/app/api/uploadthing/core";



interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof  OurFileRouter ; 
};
// type UploadResponse = { url: string | undefined }[];
export const FileUpload = ({
    onChange,
    endpoint,
}: FileUploadProps) => {


    return(
        <UploadDropzone<OurFileRouter , typeof endpoint>
            endpoint={endpoint}
            onClientUploadComplete={(res: { url: string | undefined; }[]) => {
            onChange(res?.[0].url);
        }}
        onUploadError={(error: Error)=> {
            toast.error(`${error?.message}`);
        }}
        />
        
    )
}