"use client";

import * as React from "react";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface AccountSwitcherProps {
	isCollapsed: boolean;
	accounts: {
		label: string;
		email: string;
		icon: string;
	}[];
}

export function AccountSwitcher({
	isCollapsed,
	accounts,
}: AccountSwitcherProps) {
	const [open, setOpen] = React.useState(false);
	const [selectedAccount, setSelectedAccount] = React.useState(accounts[0]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					role="combobox"
					aria-expanded={open}
					aria-label="Select account"
					className={cn("w-[200px] justify-between", isCollapsed && "w-[50px]")}
				>
					<Avatar className="h-5 w-5">
						<AvatarImage
							src={`https://avatar.vercel.sh/${selectedAccount.email}.png`}
							alt={selectedAccount.email}
						/>
						<AvatarFallback>{selectedAccount.icon}</AvatarFallback>
					</Avatar>
					{!isCollapsed && (
						<>
							<span className="ml-2">{selectedAccount.email}</span>
							<CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandList>
						<CommandInput placeholder="Search account..." />
						<CommandEmpty>No account found.</CommandEmpty>
						<CommandGroup>
							{accounts.map((account) => (
								<CommandItem
									key={account.email}
									onSelect={() => {
										setSelectedAccount(account);
										setOpen(false);
									}}
								>
									<Avatar className="mr-2 h-5 w-5">
										<AvatarImage
											src={`https://avatar.vercel.sh/${account.email}.png`}
											alt={account.email}
											className="grayscale"
										/>
										<AvatarFallback>{account.icon}</AvatarFallback>
									</Avatar>
									{account.label}
									<CheckIcon
										className={cn(
											"ml-auto h-4 w-4",
											selectedAccount.email === account.email
												? "opacity-100"
												: "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
