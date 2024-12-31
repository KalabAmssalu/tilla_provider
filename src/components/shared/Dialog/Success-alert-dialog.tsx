import React from "react";

import { CheckCircle2 } from "lucide-react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SuccessAlertDialogProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	description: string;
}

export function SuccessAlertDialog({
	isOpen,
	onClose,
	title,
	description,
}: SuccessAlertDialogProps) {
	return (
		<AlertDialog open={isOpen} onOpenChange={onClose}>
			<AlertDialogContent className="max-w-md">
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2 text-green-600">
						<CheckCircle2 className="h-6 w-6" />
						{title}
					</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction
						onClick={onClose}
						className="bg-green-600 px-14 hover:bg-green-700"
					>
						OK
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
