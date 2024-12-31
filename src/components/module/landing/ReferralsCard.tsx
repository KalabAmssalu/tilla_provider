"use client";

import { motion } from "framer-motion";
import {
	Activity,
	AlertCircle,
	ArrowRight,
	CheckCircle2,
	ClipboardList,
	Clock,
	FileCheck,
	FileText,
	HelpCircle,
} from "lucide-react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/navigation";

export default function ReferralCard() {
	const referralFaqs = [
		{
			question: "How long does referral approval typically take?",
			answer:
				"Standard referrals are typically processed within 3-5 business days. Urgent referrals may be processed within 24 hours.",
		},
		{
			question: "What documentation is required for referrals?",
			answer:
				"Required documentation includes patient demographics, diagnosis codes (ICD-10), service requested (CPT codes), and clinical notes supporting medical necessity.",
		},
		{
			question: "How can I check the status of a referral?",
			answer:
				"You can check referral status through the Provider Portal under 'Referral Status' or contact our Provider Services team.",
		},
	];
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

	return (
		<Card className="w-full">
			<CardHeader className="items-center">
				<CardTitle className="flex items-center gap-2 text-2xl">
					<FileText className="h-6 w-6 text-primary" />
					Simplifying the Referral Process
				</CardTitle>
			</CardHeader>
			<CardContent className="p-6">
				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="grid gap-8"
				>
					{/* What is a Referral Section */}
					<motion.div variants={item} className="space-y-4">
						<div className="flex items-center gap-2">
							<ClipboardList className="h-5 w-5 text-primary" />
							<h3 className="text-xl font-semibold">What is a Referral?</h3>
						</div>
						<div className="ml-7 space-y-3">
							<p className="text-muted-foreground">
								A referral is required for specialist visits or specific
								procedures. Common scenarios include:
							</p>
							<ul className="grid gap-2">
								{[
									"Visits to endocrinologists",
									"Physical therapy sessions",
									"Advanced imaging procedures",
								].map((item, index) => (
									<li
										key={index}
										className="flex items-center gap-2 text-muted-foreground"
									>
										<CheckCircle2 className="h-4 w-4 text-primary" />
										{item}
									</li>
								))}
							</ul>
						</div>
					</motion.div>

					{/* How to Submit Section */}
					<motion.div variants={item} className="space-y-4">
						<div className="flex items-center gap-2">
							<Activity className="h-5 w-5 text-primary" />
							<h3 className="text-xl font-semibold">
								How to Submit a Referral
							</h3>
						</div>
						<div className="ml-7 space-y-3">
							<p className="text-muted-foreground">
								Follow this step-by-step guide to submit a referral request:
							</p>
							<div className="grid gap-3">
								{[
									"Access the referral submission form via the Provider Portal",
									"Include member details, diagnosis codes, and requested services",
								].map((step, index) => (
									<div key={index} className="flex items-start gap-3">
										<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
											{index + 1}
										</div>
										<p className="text-muted-foreground">{step}</p>
									</div>
								))}
							</div>
							<p className="text-sm text-muted-foreground italic">
								Ensure all required documentation is included for referral
								approval.
							</p>
						</div>
					</motion.div>

					{/* Tracking Section */}
					<motion.div variants={item} className="space-y-4">
						<div className="flex items-center gap-2">
							<Clock className="h-5 w-5 text-primary" />
							<h3 className="text-xl font-semibold">Tracking Referrals</h3>
						</div>
						<div className="ml-7 space-y-3">
							<p className="text-muted-foreground">
								Providers can check the status of submitted referrals in
								real-time. Common reasons for referral delays include:
							</p>
							<div className="grid gap-2">
								{[
									"Incomplete documentation",
									"Missing member information",
									"Pending approvals from specialists",
								].map((reason, index) => (
									<div key={index} className="flex items-center gap-2">
										<AlertCircle className="h-4 w-4 text-destructive" />
										<p className="text-muted-foreground">{reason}</p>
									</div>
								))}
							</div>
							<div className="rounded-lg border bg-muted p-4">
								<p className="flex items-center gap-2 text-sm">
									<FileCheck className="h-4 w-4 text-primary" />
									To avoid delays, ensure that all information is accurate and
									complete.
								</p>
							</div>
						</div>
					</motion.div>

					{/* FAQs Section */}
					<motion.div variants={item} className="space-y-4">
						<div className="flex items-center gap-2">
							<HelpCircle className="h-5 w-5 text-primary" />
							<h3 className="text-xl font-semibold">Referral FAQs</h3>
						</div>
						<div className="ml-7">
							<Accordion type="single" collapsible className="w-full">
								{referralFaqs.map((faq, index) => (
									<AccordionItem key={index} value={`faq-${index}`}>
										<AccordionTrigger className="text-left">
											{faq.question}
										</AccordionTrigger>
										<AccordionContent className="text-muted-foreground">
											{faq.answer}
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
					</motion.div>

					{/* Action Button */}
					<motion.div variants={item} className="pt-4 text-center">
						<Button size="lg" className="group w-full sm:w-auto" asChild>
							<Link href="/auth/sign-in">
								Submit a Referral
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</Button>
					</motion.div>
				</motion.div>
			</CardContent>
		</Card>
	);
}
