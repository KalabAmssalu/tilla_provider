"use client";

import { motion } from "framer-motion";
import {
	Activity,
	AlertCircle,
	ArrowRight,
	CheckCircle2,
	Clock,
	FileCheck2,
	FileSearch,
	FileText,
	HelpCircle,
	Phone,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function AppealsCard() {
	const appealReasons = [
		{
			icon: AlertCircle,
			text: "Denied claims due to incomplete documentation",
			color: "text-destructive",
		},
		{
			icon: AlertCircle,
			text: "Rejected prior authorizations or referrals",
			color: "text-destructive",
		},
	];

	const appealSteps = [
		{
			title: "Review Denial",
			description:
				"Review the denial letter for the reason and required next steps",
			icon: FileText,
		},
		{
			title: "Access Form",
			description: "Access the appeals form through the Provider Portal",
			icon: FileCheck2,
		},
		{
			title: "Attach Documents",
			description:
				"Attach supporting documents (e.g., medical records, referral approvals)",
			icon: CheckCircle2,
		},
		{
			title: "Submit",
			description: "Submit the appeal via email, fax, or the online portal",
			icon: ArrowRight,
		},
	];

	return (
		<Card className="w-full">
			<CardHeader className="items-center">
				<CardTitle className="flex items-center gap-2 text-2xl">
					<FileSearch className="h-6 w-6 text-primary" />
					Appealing a Denied Claim or Service
				</CardTitle>
			</CardHeader>
			<CardContent className="p-6">
				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="grid gap-8"
				>
					{/* When to File Section */}
					<motion.div variants={item} className="space-y-4">
						<div className="flex items-center gap-2">
							<AlertCircle className="h-5 w-5 text-primary" />
							<h3 className="text-xl font-semibold">When to File an Appeal</h3>
						</div>
						<div className="ml-7 grid gap-3">
							{appealReasons.map((reason, index) => (
								<div
									key={index}
									className="flex items-start gap-3 rounded-lg border p-4 bg-destructive/5"
								>
									<reason.icon className={`w-5 h-5 mt-0.5 ${reason.color}`} />
									<span className="text-muted-foreground">{reason.text}</span>
								</div>
							))}
						</div>
					</motion.div>

					{/* Appeal Process Section */}
					<motion.div variants={item} className="space-y-4">
						<div className="flex items-center gap-2">
							<Activity className="h-5 w-5 text-primary" />
							<h3 className="text-xl font-semibold">How to Submit an Appeal</h3>
						</div>
						<div className="ml-7 space-y-3">
							<p className="text-muted-foreground">
								Follow this step-by-step guide to submit an Appeal:
							</p>
							<div className="ml-7">
								<div className="grid gap-4">
									{appealSteps.map((step, index) => (
										<div key={index} className="flex items-start gap-4">
											<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
												{index + 1}
											</div>
											<div className="space-y-1">
												<p className="font-medium">{step.title}</p>
												<p className="text-sm text-muted-foreground">
													{step.description}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
							<p className="text-sm text-muted-foreground italic">
								Ensure all required documentation is included for appeal
								approval.
							</p>
						</div>
					</motion.div>
					{/* Timelines Section */}
					<motion.div variants={item} className="space-y-4">
						<div className="flex items-center gap-2">
							<Clock className="h-5 w-5 text-primary" />
							<h3 className="text-xl font-semibold">Appeal Timelines</h3>
						</div>
						<div className="ml-7 rounded-lg border p-4 bg-muted">
							<div className="space-y-3">
								<div className="flex items-center gap-2">
									<Badge variant="default">30 Days</Badge>
									<span className="text-sm text-muted-foreground">
										Deadline for submitting appeals after denial notice
									</span>
								</div>
								<p className="text-sm text-muted-foreground">
									Response times from Tilla Health vary based on appeal
									complexity
								</p>
							</div>
						</div>
					</motion.div>

					{/* Support Section */}
					<motion.div variants={item} className="space-y-4">
						<div className="flex items-center gap-2">
							<Phone className="h-5 w-5 text-primary" />
							<h3 className="text-xl font-semibold">Support for Providers</h3>
						</div>
						<div className="ml-7">
							<Card className="bg-primary/5">
								<CardContent className="p-4 space-y-3">
									<p className="text-sm text-muted-foreground">
										For appeal-related queries, contact our support team:
									</p>
									<div className="space-y-2">
										<p className="text-sm font-medium">Appeals Support Line:</p>
										<p className="text-sm text-muted-foreground">
											1-800-555-0123
										</p>
										<p className="text-sm font-medium">Email:</p>
										<p className="text-sm text-muted-foreground">
											appeals@tillahealth.com
										</p>
									</div>
								</CardContent>
							</Card>
						</div>
					</motion.div>

					{/* Action Buttons */}
					<motion.div
						variants={item}
						className="flex flex-col sm:flex-row gap-4 pt-4"
					>
						<Button size="lg" className="group" asChild>
							<Link href="/auth/sign-in">
								File an Appeal
								<FileText className="ml-2 w-4 h-4 transition-transform group-hover:scale-110" />
							</Link>
						</Button>
						<Button size="lg" variant="outline" className="group" asChild>
							<Link href="/appeals/guide">
								View Appeal Guide
								<HelpCircle className="ml-2 w-4 h-4 transition-transform group-hover:scale-110" />
							</Link>
						</Button>
					</motion.div>
				</motion.div>
			</CardContent>
		</Card>
	);
}
