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
                <div className="relative flex flex-col gap-2 px-4">
                    <div className="block bg-white w-12 h-1"></div>
                    <div className="block bg-white w-12 h-1"></div>

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
