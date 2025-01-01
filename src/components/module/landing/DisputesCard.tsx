"use client";

import { motion } from "framer-motion";
import {
	Activity,
	AlertCircle,
	ArrowRight,
	CheckCircle2,
	ClipboardList,
	Clock,
	FileCheck2,
	FileQuestion,
	Scale,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "@/navigation";

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 },
};

export default function DisputesCard() {
	const disputeSteps = [
		{
			title: "Identify Issue",
			description: "Identify the issue (e.g., underpayment, incorrect denial)",
			icon: AlertCircle,
		},
		{
			title: "Gather Documentation",
			description: "Gather documentation (e.g., claim history, correspondence)",
			icon: ClipboardList,
		},
		{
			title: "Complete Form",
			description: "Complete the dispute resolution form on the portal",
			icon: FileCheck2,
		},
		{
			title: "Submit",
			description: "Submit via secure channels with documentation",
			icon: ArrowRight,
		},
	];

	const disputeTypes = [
		{
			title: "Payment Disputes",
			description: "Issues related to claim payments or reimbursement",
			examples: ["Underpayment", "Incorrect fee schedule", "Missing modifiers"],
			icon: Scale,
			color: "bg-blue-500/10",
		},
		{
			title: "Eligibility Disputes",
			description: "Issues with member eligibility verification",
			examples: [
				"Invalid coverage",
				"Incorrect effective dates",
				"Network status",
			],
			icon: CheckCircle2,
			color: "bg-green-500/10",
		},
		{
			title: "Service Disputes",
			description: "Issues with covered services and authorization",
			examples: [
				"Service denial",
				"Authorization issues",
				"Coding discrepancies",
			],
			icon: FileQuestion,
			color: "bg-orange-500/10",
		},
	];

	return (
		<Card className="w-full">
			<CardHeader className="items-center">
				<CardTitle className="flex items-center gap-2 text-2xl">
					<Scale className="h-6 w-6 text-primary" />
					Resolving Provider Payment and Service Disputes
				</CardTitle>
			</CardHeader>
			<CardContent className="p-6">
				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="grid gap-8"
				>
					{/* What is a Dispute Section */}
					<motion.div variants={item} className="space-y-4">
						<div className="flex items-center gap-2">
							<ClipboardList className="h-5 w-5 text-primary" />
							<h3 className="text-xl font-semibold">What is a Dispute?</h3>
						</div>
						<div className="ml-7 space-y-3">
							<p className="text-muted-foreground">
								Disputes involve issues related to claim payments, member
								eligibility, or service coverage. Understanding the nature of a
								dispute is crucial for effective resolution.
							</p>
						</div>
					</motion.div>
					{/* Filing Process Section */}
					<motion.div variants={item} className="space-y-4">
						<div className="flex items-center gap-2">
							<Activity className="h-5 w-5 text-primary" />
							<h3 className="text-xl font-semibold">How to File a Dispute</h3>
						</div>
						<div className="ml-7 space-y-3">
							<p className="text-muted-foreground">
								Follow this step-by-step guide to file a Dispute:
							</p>
							<div className="ml-7">
								<div className="grid gap-4">
									{disputeSteps.map((step, index) => (
										<div key={index} className="flex items-start gap-4">
											<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
												{index + 1}
											</div>
											<div className="space-y-1">
												<div className="flex items-center gap-2">
													<step.icon className="h-4 w-4 text-primary" />
													<p className="font-medium">{step.title}</p>
												</div>
												<p className="text-sm text-muted-foreground">
													{step.description}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
							<p className="text-sm text-muted-foreground italic">
								Ensure all required documentation is included for dispute
								approval.
							</p>
						</div>
					</motion.div>

					{/* Resolution Process Section */}
					<motion.div variants={item} className="space-y-4">
						<div className="flex items-center gap-2">
							<Clock className="h-5 w-5 text-primary" />
							<h3 className="text-xl font-semibold">Resolution Process</h3>
						</div>
						<div className="ml-7 space-y-4">
							<Card className="border-primary/20">
								<CardContent className="p-4 space-y-4">
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<span className="text-sm font-medium">
												Review Process
											</span>
											<Badge>5-7 Business Days</Badge>
										</div>
										<Progress value={33} className="h-2" />
										<div className="grid grid-cols-3 text-xs text-muted-foreground">
											<span>Submitted</span>
											<span className="text-center">Under Review</span>
											<span className="text-right">Resolved</span>
										</div>
									</div>
									<p className="text-sm text-muted-foreground">
										Disputes are reviewed by the Tilla Health Provider Relations
										team. You will be notified of the resolution status within
										the specified timeframe.
									</p>
								</CardContent>
							</Card>
						</div>
					</motion.div>

					{/* Dispute Types Section */}
					<motion.div variants={item} className="space-y-4">
						<div className="flex items-center gap-2">
							<FileCheck2 className="h-5 w-5 text-primary" />
							<h3 className="text-xl font-semibold">Types of Disputes</h3>
						</div>
						<div className="ml-7">
							<div className="grid md:grid-cols-3 gap-4">
								{disputeTypes.map((type, index) => (
									<Card key={index} className="bg-secondary/40 border-none">
										<CardContent className="p-4 space-y-4">
											<div className="flex items-center gap-2">
												<type.icon className="h-5 w-5 text-primary" />
												<h4 className="font-semibold">{type.title}</h4>
											</div>
											<p className="text-sm text-muted-foreground">
												{type.description}
											</p>
											<div className="space-y-2">
												<p className="text-xs font-medium">Common Examples:</p>
												<ul className="space-y-1">
													{type.examples.map((example, i) => (
														<li
															key={i}
															className="flex items-center gap-2 text-xs text-muted-foreground"
														>
															<CheckCircle2 className="h-3 w-3 text-primary" />
															{example}
														</li>
													))}
												</ul>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</div>
					</motion.div>

					{/* Prevention Tips */}
					<motion.div variants={item} className="space-y-4">
						<div className="rounded-lg border bg-muted p-4">
							<p className="flex items-center gap-2 text-sm">
								<AlertCircle className="h-5 w-5 text-primary" />
								To reduce disputes, ensure that all claims are submitted with
								accurate information and proper documentation. Double-check
								modifiers and verify patient eligibility before service
								delivery.
							</p>
						</div>
					</motion.div>

					{/* Action Buttons */}
					<motion.div
						variants={item}
						className="flex flex-col sm:flex-row gap-4 pt-4"
					>
						<Button size="lg" className="group" asChild>
							<Link href="/auth/sign-in">
								Submit a Dispute
								<Scale className="ml-2 w-4 h-4 transition-transform group-hover:scale-110" />
							</Link>
						</Button>
						<Button size="lg" variant="outline" className="group" asChild>
							<Link href="/auth/sign-in">
								Check Dispute Status
								<Clock className="ml-2 w-4 h-4 transition-transform group-hover:scale-110" />
							</Link>
						</Button>
					</motion.div>
				</motion.div>
			</CardContent>
		</Card>
	);
}
