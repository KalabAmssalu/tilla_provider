import Link from "next/link";

import { ArrowRight, Bell, ClipboardCheck, Shield } from "lucide-react";

import CTA from "@/components/module/landing/CTA";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProviderOnline() {
	const features = [
		{
			icon: Shield,
			title: "Eligibility",
			description:
				"Quickly verify patient eligibility for telemedicine and other healthcare services",
			action: "Check Eligibility Now",
			href: "/eligibility",
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
			href: "/claims",
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
			href: "/updates",
			details: [
				"Receive notifications about telemedicine policy changes and new guidelines",
				"Learn about upcoming webinars, training, and provider events",
				"Access announcements on reimbursement updates or new service offerings",
			],
		},
	];

	return (
		<div className="py-12">
			<div className="space-y-16">
				{/* Hero Section */}
				<section className="text-center max-w-3xl mx-auto space-y-6">
					<h1 className="text-4xl font-bold">
						Why Should You Register for Provider Online?
					</h1>
					<p className="text-lg text-muted-foreground">
						Empowering Providers with Easy Access to Essential Tools and
						Resources
					</p>
					<div className="space-y-4">
						<p className="text-muted-foreground">
							Access real-time updates about telemedicine services and policies,
							manage patient eligibility, claims, and inquiries with ease, and
							stay informed about the latest healthcare trends.
						</p>
						<Button size="lg" asChild>
							<Link href="/register">
								Register Now
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>
				</section>

				{/* Features Grid */}
				<section className="px-4 grid md:grid-cols-3 gap-6 bg-secondary/40 py-16">
					{features.map((feature) => (
						<Card key={feature.title}>
							<CardContent className="p-6 space-y-6">
								<feature.icon className="w-12 h-12 text-primary" />
								<div className="space-y-2">
									<h3 className="text-xl font-bold">{feature.title}</h3>
									<p className="text-muted-foreground">{feature.description}</p>
								</div>
								<Button variant="outline" className="w-full" asChild>
									{feature.action}
								</Button>
							</CardContent>
						</Card>
					))}
				</section>

				{/* Detailed Features */}
				<section className="max-w-4xl mx-auto">
					<Tabs defaultValue="eligibility" className="space-y-6">
						<TabsList className="grid grid-cols-3 w-full">
							{features.map((feature) => (
								<TabsTrigger
									key={feature.title}
									value={feature.title.toLowerCase()}
								>
									{feature.title}
								</TabsTrigger>
							))}
						</TabsList>

						{features.map((feature) => (
							<TabsContent
								key={feature.title}
								value={feature.title.toLowerCase()}
							>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<feature.icon className="h-6 w-6" />
											{feature.title}
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<ul className="space-y-2">
											{feature.details.map((detail, index) => (
												<li key={index} className="flex items-start gap-2">
													<ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
													<span>{detail}</span>
												</li>
											))}
										</ul>
										<Button className="bg-primary" asChild>
											<Link href="/register">
												{feature.action}
												<ArrowRight className="ml-2 h-4 w-4" />
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
		</div>
	);
}
