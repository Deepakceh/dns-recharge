// components/common/AppDialog.tsx
import { Sheet, SheetContent, SheetHeader, SheetTitle, } from "@/components/ui/sheet"

type SearchSheetProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    children: React.ReactNode
    onCancel?: () => void
}

export function SearchSheet({ open, onOpenChange, title, children }: SearchSheetProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="!w-[600px] !max-w-none bg-white shadow-xl p-4">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                </SheetHeader>
                <div>{children}</div>
            </SheetContent>
        </Sheet>
    )
}
