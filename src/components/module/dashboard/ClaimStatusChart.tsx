// components/ClaimsStatusChart.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { BarChart } from "../../ui/bar-chart";

const ClaimsStatusChart = () => {
	return (
		<Card className="mt-6">
			<CardHeader>
				<CardTitle>Claim Status</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="h-[300px]">
					<BarChart
						data={[
							{ name: "Jan 2024", Approved: 40, Denied: 24 },
							{ name: "Feb 2024", Approved: 30, Denied: 28 },
							{ name: "Mar 2024", Approved: 35, Denied: 26 },
							{ name: "Apr 2024", Approved: 25, Denied: 30 },
							{ name: "May 2024", Approved: 32, Denied: 22 },
							{ name: "Jun 2024", Approved: 28, Denied: 20 },
						]}
					/>
				</div>
			</CardContent>
		</Card>
	);
};

export default ClaimsStatusChart;
