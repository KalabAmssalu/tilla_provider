"use client";

import { motion } from "framer-motion";
import {
	CheckCircle,
	Clock,
	FileSearch,
	FileText,
	Scale,
	Star,
} from "lucide-react";

import AppealsCard from "@/components/module/landing/AppealsCard";
import DisputesCard from "@/components/module/landing/DisputesCard";
import ReferralCard from "@/components/module/landing/ReferralsCard";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function ReferralScreen() {
	const features = [
		{
			icon: CheckCircle,
			title: "Simplified Administrative Processes",
			description:
				"Reduces the complexity of administrative tasks, allowing providers to focus on patient care.",
		},
		{
			icon: Star,
			title: "Enhanced Provider Experience",
			description:
				"Improves provider experience with clear and transparent processes.",
		},
		{
			icon: Clock,
			title: "Faster Issue Resolution",
			description:
				"Speeds up resolution times for issues affecting member care and payments.",
		},
	];

	return (
		<div className="min-h-screen bg-background">
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center max-w-3xl mx-auto container px-4 py-12 space-y-6"
			>
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
					Navigating Referrals, Appeals, and Disputes
				</h1>
				<p className="text-xl text-muted-foreground">
					Streamlined processes for managing healthcare administrative tasks
				</p>
			</motion.section>
			{/* Features Section */}
			<section id="features" className="py-16 px-4 bg-muted">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-12">
						How It Adds Value to Providers
					</h2>
					<div className="grid md:grid-cols-3 gap-6">
						{features.map((feature) => (
							<Card
								key={feature.title}
								className="animate-fade-in bg-secondary/30"
							>
								<CardContent className="p-6 space-y-4">
									<feature.icon className="w-12 h-12 text-primary" />
									<h3 className="text-xl font-bold">{feature.title}</h3>
									<p className="text-muted-foreground">{feature.description}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
			<section className="container px-4 py-12 space-y-16">
				<Tabs defaultValue="referrals" className="space-y-8">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="referrals" className="text-lg">
							<FileText className="w-4 h-4 mr-2" />
							Referrals
						</TabsTrigger>
						<TabsTrigger value="appeals" className="text-lg">
							<FileSearch className="w-4 h-4 mr-2" />
							Appeals
						</TabsTrigger>
						<TabsTrigger value="disputes" className="text-lg">
							<Scale className="w-4 h-4 mr-2" />
							Disputes
						</TabsTrigger>
					</TabsList>
					<TabsContent value="referrals" className="space-y-8">
						<ReferralCard />
					</TabsContent>
					<TabsContent value="appeals" className="space-y-8">
						<AppealsCard />
					</TabsContent>
					<TabsContent value="disputes" className="space-y-8">
						<DisputesCard />
					</TabsContent>
				</Tabs>
			</section>
		</div>
	);
}
