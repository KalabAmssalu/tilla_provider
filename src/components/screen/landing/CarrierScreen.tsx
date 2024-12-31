import Image from "next/image";

import { FileCheck, HelpCircle, Shield } from "lucide-react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Carriers() {
	const carriers = [
		{
			name: "Blue Cross Blue Shield",
			logo: "/placeholder.svg?height=60&width=120",
			plans: ["PPO", "HMO", "Medicare Advantage"],
		},
		{
			name: "Aetna",
			logo: "/placeholder.svg?height=60&width=120",
			plans: ["PPO", "HMO", "Medicare"],
		},
		{
			name: "UnitedHealthcare",
			logo: "/placeholder.svg?height=60&width=120",
			plans: ["Choice Plus", "Options PPO", "Medicare Solutions"],
		},
		{
			name: "Cigna",
			logo: "/placeholder.svg?height=60&width=120",
			plans: ["Open Access Plus", "LocalPlus", "Medicare Advantage"],
		},
	];

	const faqs = [
		{
			question: "How do I verify my insurance coverage?",
			answer:
				"You can verify your insurance coverage by contacting our billing department or using our online Provider Portal. We'll help determine your eligibility and benefits for specific services.",
		},
		{
			question: "What if my insurance carrier isn't listed?",
			answer:
				"If you don't see your insurance carrier listed, please contact our billing department. We regularly add new insurance partners and may be able to work with your carrier.",
		},
		{
			question: "Do you accept Medicare and Medicaid?",
			answer:
				"Yes, we accept both Medicare and Medicaid. Please contact our billing department for specific details about coverage and benefits.",
		},
	];

	return (
		<div className="py-12">
			<div className="container px-4 space-y-16">
				<section className="text-center max-w-3xl mx-auto space-y-4">
					<h1 className="text-4xl font-bold">Insurance Carriers & Coverage</h1>
					<p className="text-lg text-muted-foreground">
						We work with major insurance carriers to provide you with
						comprehensive healthcare coverage
					</p>
				</section>

				<section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{carriers.map((carrier) => (
						<Card key={carrier.name}>
							<CardContent className="p-6 space-y-4">
								<Image
									src={carrier.logo}
									alt={carrier.name}
									width={120}
									height={60}
									className="mx-auto"
								/>
								<h2 className="text-lg font-bold text-center">
									{carrier.name}
								</h2>
								<div className="space-y-2">
									<h3 className="text-sm font-semibold">Accepted Plans:</h3>
									<ul className="text-sm space-y-1">
										{carrier.plans.map((plan) => (
											<li key={plan}>{plan}</li>
										))}
									</ul>
								</div>
							</CardContent>
						</Card>
					))}
				</section>

				<section className="grid md:grid-cols-3 gap-6">
					<Card>
						<CardContent className="p-6 space-y-4">
							<Shield className="w-8 h-8 text-primary" />
							<h2 className="text-lg font-bold">Coverage Verification</h2>
							<p className="text-sm text-muted-foreground">
								Quick and easy insurance verification for all accepted carriers
							</p>
							<Button variant="outline" className="w-full">
								Verify Coverage
							</Button>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-6 space-y-4">
							<FileCheck className="w-8 h-8 text-primary" />
							<h2 className="text-lg font-bold">Benefits Check</h2>
							<p className="text-sm text-muted-foreground">
								Understand your benefits and coverage details
							</p>
							<Button variant="outline" className="w-full">
								Check Benefits
							</Button>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-6 space-y-4">
							<HelpCircle className="w-8 h-8 text-primary" />
							<h2 className="text-lg font-bold">Insurance Support</h2>
							<p className="text-sm text-muted-foreground">
								Get help with insurance-related questions
							</p>
							<Button variant="outline" className="w-full">
								Contact Support
							</Button>
						</CardContent>
					</Card>
				</section>

				<section className="max-w-3xl mx-auto">
					<h2 className="text-2xl font-bold mb-6">
						Frequently Asked Questions
					</h2>
					<Accordion type="single" collapsible className="w-full">
						{faqs.map((faq, index) => (
							<AccordionItem key={index} value={`item-${index}`}>
								<AccordionTrigger>{faq.question}</AccordionTrigger>
								<AccordionContent>{faq.answer}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</section>

				<section className="text-center space-y-6 bg-muted rounded-lg p-8">
					<h2 className="text-2xl font-bold">Need Help with Insurance?</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						Our billing specialists are here to help you understand your
						coverage and benefits.
					</p>
					<div className="flex gap-4 justify-center">
						<Button size="lg">Contact Billing</Button>
						<Button size="lg" variant="outline">
							Download Insurance Forms
						</Button>
					</div>
				</section>
			</div>
		</div>
	);
}
