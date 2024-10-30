"use client";

import { Preview } from "@/components/preview";

interface PreviewDescriptionProps {
    value: string;
}

export const PreviewDescription = ({
    value,
}: PreviewDescriptionProps) => {
    return (
        <Preview value={value} />
    );
};