"use client"

import { Store } from "@prisma/client";
import {Command, CommandEmpty, CommandGroup, CommandItem} from "@/components/ui/command"
import {Popover, PopoverTrigger} from "@/components/ui/popover"
import { Button } from "./ui/button";
import {Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { CommandInput, CommandList } from "./ui/command";
import { PopoverContent } from "@radix-ui/react-popover";
import { CommandSeparator } from "cmdk";

type popoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends popoverTriggerProps {
items: Store[];
}


export default function StoreSwitcher({
    className,
    items = []
}:StoreSwitcherProps) {
    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();

    const formattedItems  = items.map((item) => ({
        label: item.name,
        value: item.id
    }))

    const currentStore = formattedItems.find((item)=>item.value === params.storeId);


    const [open, setOpen] = useState(false);
    const onStoreSelect = (store: {value: string, label: string})=>{
        setOpen(false)
        router.push(`/${store.value}`)
    }
    
    return (
       <Popover open={open} onOpenChange={setOpen}>
       <PopoverTrigger asChild>
        <Button
        variant="outline"
        size="sm"
        role="combobox"
        aria-expanded={open}
        aria-label="select a store"
        className={cn("w-[200px] justify-between", className)}
        >
        <StoreIcon className = "mr-2 h-4 w-4"/>
        current store
        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
        </Button>
       </PopoverTrigger>
       <PopoverContent>
       <Command>
        <CommandList>
             <CommandInput placeholder="search store..."/>
             <CommandEmpty>No store found</CommandEmpty>
             <CommandGroup heading="Stores">
             {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4"/>
                  
                  {store.label}
                  
                  <Check 
                  className={cn(
                    "mn-auto h-4 w-4",
                    currentStore?.value === store.value
                    ? "opacity-100": "opacity-0"
                  )}
                   />
                </CommandItem>
              ))}
             </CommandGroup>
        </CommandList>
        <CommandSeparator/>
        <CommandList>
            <CommandGroup>
                <CommandItem
                onSelect={()=>{
                    setOpen(false);
                    storeModal.onOpen();
                }}>
                    <PlusCircle className="mr-2 h-5 w-5"/>
                    create store
                </CommandItem>
            </CommandGroup>
        </CommandList>
       </Command>
       </PopoverContent>
       </Popover>
    )
}
  

