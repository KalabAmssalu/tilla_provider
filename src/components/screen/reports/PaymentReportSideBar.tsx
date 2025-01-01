import { useState } from "react";

import { Check } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarProvider,
} from "@/components/ui/sidebar";

interface SidebarProps {
	onToggleSection: (section: string, isVisible: boolean) => void;
}

export function ReportSidebar({ onToggleSection }: SidebarProps) {
	const [visibleSections, setVisibleSections] = useState({
		dateRange: true,
		claimStatus: true,
		payment: true,
		provider: true,
		member: true,
		geographical: true,
	});

	const handleToggle = (section: string) => {
		setVisibleSections((prev) => {
			const newState = {
				...prev,
				[section]: !prev[section as keyof typeof prev],
			};
			onToggleSection(section, newState[section as keyof typeof newState]);
			return newState;
		});
	};

	return (
		<Sidebar className="w-64 h-[400px] mt-40 ml-24 bg-white shadow-md rounded-lg overflow-hidden">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="text-lg font-semibold text-gray-700 px-4 py-3 bg-gray-100 border-b">
						Filter Sections
					</SidebarGroupLabel>
					<SidebarGroupContent className="p-4 space-y-4">
						{Object.entries(visibleSections).map(([key, value]) => (
							<div
								key={key}
								className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-lg p-2 transition duration-200"
							>
								<div className="flex items-center space-x-3">
									<Checkbox
										id={key}
										checked={value}
										onCheckedChange={() => handleToggle(key)}
										className="text-primary-500"
									/>
									<Label
										htmlFor={key}
										className="capitalize text-sm font-medium text-gray-800"
									>
										{key.replace(/([A-Z])/g, " $1").trim()}
									</Label>
								</div>
								{value && <Check className="text-green-500" size={16} />}
							</div>
						))}
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
