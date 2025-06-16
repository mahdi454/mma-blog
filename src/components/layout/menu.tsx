import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export function MenuSheet() {
    return (
        <Sheet >
            <SheetTrigger asChild>
                <div className="relative flex flex-col gap-1.5 px-4 hover:gap-2 cursor-pointer transition-all duration-300 ease-in-out">
                    <div className="block bg-red-500 rounded-full w-12 h-0.5 "></div>
                    <div className="block bg-red-500 rounded-full w-12 h-0.5"></div>
                    <div className="block bg-red-500 rounded-full w-12 h-0.5"></div>

                </div>
            </SheetTrigger>
            <SheetContent side="top" className="max-w-screen-2xl mx-auto rounded-b-2xl bg-white/10 backdrop-blur-md">
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>

                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
