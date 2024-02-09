"use client"

import type { Announcement } from "@prisma/client"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime";
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import React, { useState } from "react"
import { Button } from "@/_components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu"

import { Checkbox } from "@/_components/ui/checkbox"

/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable react-hooks/rules-of-hooks */

function useContentTruncation(initialContent: string, maxLength: number) {
  const [showFullContent, setShowFullContent] = useState(false);
  const truncatedContent = initialContent.length > maxLength ? `${initialContent.substring(0, maxLength)}...` : initialContent;

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  return { showFullContent, toggleContent, truncatedContent };
}

dayjs.extend(relativeTime);

function useDayJs(currentTime: string) {
  return dayjs(currentTime).fromNow();
}

const columns: ColumnDef<Announcement>[] = [

    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "content",
        header: () => <div className="text-center">Content</div>,
        cell: ({ row }) => {
          const content = (row.getValue("content")) as string;
          const maxLength = 60;
          const { showFullContent, toggleContent, truncatedContent } = useContentTruncation(content, maxLength);
    
          return (
            <div className="text-left font-medium">
              {showFullContent ? content : truncatedContent}
              {content.length > maxLength && (
                <Button className="text-sm bg-transparent underline text-black hover:bg-transparent hover:text-blue-500 focus:outline-none shadow-none" onClick={toggleContent}>
                  {showFullContent ? "Less details" : "More details"}
                </Button>
              )}
            </div>
          );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (     
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Created At 
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        cell: ({ row }) => {
          const currentTime = row.getValue("createdAt") as string;
          const formattedDate = useDayJs(currentTime);
          return (
            <div>{formattedDate}</div>          
          )
        }
    },
    {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: ({ row }) => {
          const currentTime = row.getValue("updatedAt") as string;
          const formattedDate = useDayJs(currentTime);
          return (
            <div>{formattedDate}</div>
          )
        }
    }
]

export default columns;


// for id, either this or checkbox
// {
//     id: "actions",
//     cell: ({ row }) => {
//       const announcement = row.original
 
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(announcement.id)}
//             >
//               Copy announcement ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             {/* <DropdownMenuItem>View customer</DropdownMenuItem>
//             <DropdownMenuItem>View payment details</DropdownMenuItem> */}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },