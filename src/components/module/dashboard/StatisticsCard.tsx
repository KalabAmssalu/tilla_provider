// components/StatisticsCard.tsx
import { ArrowRightCircle, DollarSign, FileText, Users } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

const StatisticsCard = () => {
	return (
		<div>
			<div className="grid grid-cols-2 gap-4 p-6">
				<Card className="space-y-2">
					<CardHeader>
						<Users className="h-8 w-8 text-primary" />
						<p className="text-sm font-medium">Active members</p>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">5</p>
					</CardContent>
				</Card>
				<Card className="space-y-2">
					<CardHeader>
						<FileText className="h-8 w-8 text-primary" />
						<p className="text-sm font-medium">
							Total claims Submitted{" "}
							<span className="text-xs">(this month)</span>{" "}
						</p>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">10</p>
					</CardContent>
				</Card>
				<Card className="space-y-2">
					<CardHeader>
						<ArrowRightCircle className="h-8 w-8 text-primary" />
						<p className="text-sm font-medium">Referrals in Progress</p>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">10</p>
					</CardContent>
				</Card>
				<Card className="space-y-2">
					<CardHeader>
						<DollarSign className="h-8 w-8 text-primary" />
						<p className="text-sm font-medium">Pending payments</p>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">10</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default StatisticsCard;
