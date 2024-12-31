"use client";

import { useEffect, useState } from "react";

import { Info } from "lucide-react";

import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Notification = {
	title: string;
	description: string;
};

type DetailCardsProps = {
	title: string;
	description: string;
	data: Notification[];
	className?: string;
};

export function DetailCards({
	title,
	description,
	data,
	className,
	...props
}: DetailCardsProps) {
	const [isBouncing, setIsBouncing] = useState(false);

	useEffect(() => {
		const startBounce = () => setIsBouncing(true);
		const stopBounce = () => setIsBouncing(false);

		const startTimer = setTimeout(startBounce, 1000); // 60000ms = 1 minute

		const stopTimer = setTimeout(stopBounce, 60000); // 120000ms = 2 minutes

		return () => {
			clearTimeout(startTimer);
			clearTimeout(stopTimer);
		};
	}, []);
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Info
					className={`mr-2 p-2 bg-primary text-white rounded-full ${
						isBouncing ? "animate-bounce" : ""
					}`}
					size={40}
				/>
			</PopoverTrigger>
			<PopoverContent className={cn("w-96 p-4", className)} {...props}>
				<CardHeader className="p-0 pb-4">
					<div className="flex gap-4 items-center">
						<div>
							<CardTitle className="flex">{title}</CardTitle>
							<CardDescription>{description}</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="grid gap-2 p-0">
					<div>
						{data.map((item, index) => (
							<div
								key={index}
								className="mb-4 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0"
							>
								<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
								<div className="space-y-1">
									<p className="text-sm font-medium leading-none">
										{item.title}
									</p>
									<p className="text-sm text-muted-foreground">
										{item.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</PopoverContent>
		</Popover>
	);
}
