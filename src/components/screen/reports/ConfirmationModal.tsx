import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	summary: string;
}

export function ConfirmationModal({
	isOpen,
	onClose,
	onConfirm,
	summary,
}: ConfirmationModalProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Confirm Report Generation</DialogTitle>
					<DialogDescription>
						Please review the summary of your report filters:
					</DialogDescription>
				</DialogHeader>
				<div className="py-4">
					<p className="text-sm text-muted-foreground">{summary}</p>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={onConfirm}>Confirm and Search</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
