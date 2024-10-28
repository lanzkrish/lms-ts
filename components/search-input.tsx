"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { use, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchParams ,useRouter , usePathname} from "next/navigation";
import qs from "query-string";
import { set } from "zod";

export const SearchInput = () => {

    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value, 500);

    const seaerchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentCategoryId = seaerchParams.get("categoryId");

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                title: debouncedValue,
            },
        },{
            skipEmptyString: true,
            skipNull: true,
        });
        router.push(url);
    }, [debouncedValue, currentCategoryId, router, pathname]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return(
        <div className="relative">
            <Search
                className="h-4 w-4 absolute top-3 left-3 text-slate-600"
            />
            <Input
            onChange={(e) => setValue(e.target.value)}
            value={value}
                className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200 "
                placeholder="Search for a course"
            />
        </div>
    )
}