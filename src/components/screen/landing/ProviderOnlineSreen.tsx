"use client";

import { useEffect } from "react";

import { motion } from "framer-motion";
import { ArrowRight, Bell, ClipboardCheck, Shield } from "lucide-react";

import CTA from "@/components/module/landing/CTA";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.3,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 },
};
interface WhyOnline {
	title: string;
	description: string[];
}
export default function ProviderOnline() {
	const whyonline: WhyOnline[] = [
		{
			title: "Real-Time Telemedicine Updates",
			description: [
				"Access the latest information on telemedicine services and policies, ensuring your practice stays compliant and informed. ",
				"Stay ahead of changes that impact patient care and service delivery.",
			],
		},
		{
			title: "Effortless Patient Management",
			description: [
				"Manage patient eligibility, claims, and inquiries with ease. ",
				"Streamline your workflows and enhance patient satisfaction by providing quick and efficient service without the hassle.",
			],
		},
		{
			title: "Stay Ahead in Healthcare Trends",
			description: [
				"Keep yourself informed about the latest trends in healthcare.",
				" Leverage insights to improve your telemedicine practice, adapt to new technologies, and meet the evolving needs of your patients.",
			],
		},
	];
	const features = [
		{
			icon: Shield,
			title: "Eligibility",
			description:
				"Quickly verify patient eligibility for telemedicine and other healthcare services",
			action: "Check Eligibility Now",
			href: "/auth/sign-in",
			details: [
				"Verify member eligibility in real time",
				"Access detailed benefit information and service coverage",
				"Save time by reducing manual verifications",
			],
		},
		{
			icon: ClipboardCheck,
			title: "Claim Inquiry",
			description:
				"Submit, track, and manage claims efficiently through our secure platform",
			action: "Submit a Claim",
			href: "/auth/sign-in",
			details: [
				"View claim statuses and resolve issues faster",
				"Access claim history and detailed reports",
				"Submit new claims with telemedicine-specific CPT/HCPCS codes",
			],
		},
		{
			icon: Bell,
			title: "Provider Updates",
			description:
				"Stay informed about important updates, new policies, and program changes",
			action: "Subscribe to Updates",
			href: "/auth/sign-in",
			details: [
				"Receive notifications about telemedicine policy changes and new guidelines",
				"Learn about upcoming webinars, training, and provider events",
				"Access announcements on reimbursement updates or new service offerings",
			],
		},
	];

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center py-16 px-4 bg-secondary/10"
			>
				<div className="space-y-6">
					<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
						Empowering Providers with Easy Access to Essential Tools and
						Resources
					</h1>
					<Button size="lg" className="group" asChild>
						<Link href="/register">
							Register Now
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</Button>
				</div>
			</motion.section>
			{/* Why Choose Section */}
			<section className="py-16 px-4">
				<div className="max-w-6xl mx-auto space-y-12">
					<div className="text-center max-w-3xl mx-auto space-y-4">
						<div className="text-center max-w-3xl mx-auto space-y-4">
							<h2 className="text-3xl font-bold animate-fade-in">
								Why Should You Register for Provider Online?
							</h2>
						</div>
						{whyonline.map((item) => (
							<Card key={item.title} className="animate-fade-in">
								<CardContent className="p-6 space-y-4">
									<h3 className="font-bold">{item.title}</h3>
									<ul className="space-y-2">
										{item.description.map((descItem, index) => (
											<li key={index} className="text-sm text-muted-foreground">
												{descItem}
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
			{/* Features Grid */}
			<motion.section
				variants={container}
				initial="hidden"
				animate="show"
				className="grid md:grid-cols-3 gap-6 py-16 px-4 bg-muted"
			>
				{features.map((feature) => (
					<motion.div key={feature.title} variants={item}>
						<Card className="h-full transition-colors hover:bg-muted">
							<CardContent className="p-6 space-y-6">
								<feature.icon className="w-12 h-12 text-primary" />
								<div className="space-y-2">
									<h3 className="text-xl font-bold">{feature.title}</h3>
									<p className="text-muted-foreground">{feature.description}</p>
								</div>
								<Button variant="secondary" className="w-full group" asChild>
									<Link href={feature.href}>
										{feature.action}
										<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</motion.section>

			{/* Detailed Features */}
			<section className="max-w-4xl mx-auto w-full px-4 py-16">
				<Tabs defaultValue="eligibility" className="space-y-8">
					<TabsList className="grid grid-cols-3 w-full">
						{features.map((feature) => (
							<TabsTrigger
								key={feature.title}
								value={feature.title.toLowerCase()}
								className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
							>
								<span className="flex items-center gap-2">
									<feature.icon className="h-4 w-4" />
									{feature.title}
								</span>
							</TabsTrigger>
						))}
					</TabsList>

					{features.map((feature) => (
						<TabsContent
							key={feature.title}
							value={feature.title.toLowerCase()}
							className="space-y-4"
						>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-2xl">
										<feature.icon className="h-6 w-6 text-primary" />
										{feature.title}
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-6">
									<ul className="space-y-4">
										{feature.details.map((detail, index) => (
											<li
												key={index}
												className="flex items-start gap-3 text-muted-foreground"
											>
												<ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
												<span className="text-lg">{detail}</span>
											</li>
										))}
									</ul>
									<Button size="lg" className="group" asChild>
										<Link href={feature.href}>
											{feature.action}
											<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
										</Link>
									</Button>
								</CardContent>
							</Card>
						</TabsContent>
					))}
				</Tabs>
			</section>

			{/* CTA Section */}
			<CTA
				text="Ready to Get Started?"
				link="/member"
				description={[
					"Join thousands of healthcare providers who trust Tilla Health for their telemedicine needs.",
				]}
				btnText="Register for Provider Online"
				btn2Text="Read More"
				registerLink="/member"
				slug="member-portal"
			/>
		</div>
	);
}
