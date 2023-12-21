import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog"


interface modalProps {
    title: string,
    description: string,
    isOpen: boolean,
    onClose: () => void,
    children?: React.ReactNode
}
export const Modal: React.FC<modalProps> = ({ title, description, isOpen, onClose, children }) => {

    const onChange = () => {
        if (!open) {
            onClose()
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}



