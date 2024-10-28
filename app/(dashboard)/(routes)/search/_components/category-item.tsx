"use client";

import qs from "query-string";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons/lib";
import { on } from "events";

interface CategotyItemProps {
  label: string;
  value?: string;
  icon?: IconType;
}

export const CategotyItem = ({
  label,
  value,
  icon: Icon,
}: CategotyItemProps) => {

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategory = searchParams.get("categoryId");
    const currentTitle = searchParams.get("title");

    const isSelected = currentCategory === value;

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                categoryId: isSelected ? null : value,
            },
        }, { skipNull: true, skipEmptyString: true });
        router.push(url);
    };


  return (
    <button
    onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex itmes-center gap-x-1 hover:border-sky-700/40 hover:bg-sky-500/70 hover:text-slate-100 transition",
        isSelected && "border-sky-700 bg-sky-200/50 text-sky-800"
      )}
      type="button"
    >
      {Icon && <Icon size={20} />}
      <span className="ml-2 truncate">{label}</span>
    </button>
  );
};
