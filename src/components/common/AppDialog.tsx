// components/common/AppDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";

type AppDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  children: React.ReactNode
  onCancel?: () => void
  width?: string
}

export function AppDialog({ open, onOpenChange, title, children, width }: AppDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`bg-white rounded-2xl ${width || "max-w-lg"}`}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
          <Separator className="my-0 bg-gray-200" />
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
