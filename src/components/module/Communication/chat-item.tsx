import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatItemProps {
	id: number;
	name: string;
	lastMessage: string;
	timestamp: string;
	unread: number;
	selected?: boolean;
}

export function ChatItem({
	name,
	lastMessage,
	timestamp,
	unread,
	selected,
}: ChatItemProps) {
	return (
		<Button
			variant="ghost"
			className={cn(
				"w-full justify-start px-4 py-6 space-y-1 hover:bg-accent",
				selected && "bg-accent"
			)}
		>
			<div className="flex flex-col items-start gap-1">
				<div className="flex items-center gap-2">
					<span className="font-semibold">{name}</span>
					{unread > 0 && (
						<span className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
							{unread}
						</span>
					)}
				</div>
				<span className="text-sm text-muted-foreground line-clamp-1">
					{lastMessage}
				</span>
				<span className="text-xs text-muted-foreground">{timestamp}</span>
			</div>
		</Button>
	);
}
