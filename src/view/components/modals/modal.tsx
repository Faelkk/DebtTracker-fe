import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/app/utils/cn";

interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  rightAction?: React.ReactNode;
  description?: string;
  onClose?: () => void;
  hideTitle?: boolean; // Optional prop to hide title visually
}

const Modal = ({
  children,
  title,
  open,
  rightAction,
  onClose,
  description,
  hideTitle = false,
}: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 bg-black/80 backdrop-blur-sm z-50",
            "data-[state=open]:animate-overlayShow"
          )}
        />
        <Dialog.Content
          className={cn(
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl z-[51] shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-full max-w-[400px] outline-none",
            "data-[state=open]:animate-contentShow"
          )}
        >
          <header className="h-12 flex items-center justify-between text-gray-800">
            <button
              className="w-12 h-12 flex items-center justify-center outline-none"
              onClick={onClose}
            >
              <X className="w-6 h-6" />
            </button>

            {hideTitle ? (
              <Dialog.DialogTitle>
                <VisuallyHidden>{title}</VisuallyHidden>
              </Dialog.DialogTitle>
            ) : (
              <Dialog.DialogTitle className="text-lg tracking-[-1px] font-bold">
                {title}
              </Dialog.DialogTitle>
            )}

            <div className="w-12 h-12 flex items-center justify-center">{rightAction}</div>
          </header>

          {description && (
            <Dialog.Description>
              <VisuallyHidden>{description}</VisuallyHidden>
            </Dialog.Description>
          )}

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
