"use client";

import {
	Bar,
	Legend,
	BarChart as RechartsBarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface BarChartProps {
	data: Array<{
		name: string;
		Approved: number;
		Denied: number;
	}>;
}

export function BarChart({ data }: BarChartProps) {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<RechartsBarChart data={data}>
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="Approved" fill="#002664" />
				<Bar dataKey="Denied" fill="#59D3FC" />
			</RechartsBarChart>
		</ResponsiveContainer>
	);
}
