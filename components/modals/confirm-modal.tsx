"useClient"

import { 
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
 } from "../ui/alert-dialog";

 interface ConfirmModalProps {
    children: React.ReactNode;
    onConfirm: () => void;
 }

 export const ConfirmModal = ({
    children,
    onConfirm,
 }: ConfirmModalProps) => {
    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this chapter?</AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-red-700">
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
 }
