"use client";

import ActionButtons from "@/components/module/dashboard/ActionButtons";
import AnnouncementsCard from "@/components/module/dashboard/AnouncementsCard";
import ClaimsStatusChart from "@/components/module/dashboard/ClaimStatusChart";
import ClaimsTable from "@/components/module/dashboard/ClaimsTable";
import StatisticsCard from "@/components/module/dashboard/StatisticsCard";

const DashboardScreen = () => {
	return (
		<div className="min-h-screen bg-secondary/5 p-4">
			{/* Main Content */}
			<main className="max-w-7xl mx-auto p-6">
				<div className="mb-8">
					<h1 className="text-2xl font-semibold mb-6">
						Welcome to Tilia Health Insurance Provider Portal
					</h1>

					{/* Action Buttons */}
					<ActionButtons />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Announcements Card */}
					<AnnouncementsCard />
					{/* Statistics Card */}
					<StatisticsCard />
				</div>

				{/* Claims Table */}
				<ClaimsTable />
				{/* Claims Status Chart */}
				<ClaimsStatusChart />
			</main>
		</div>
	);
};

export default DashboardScreen;
