"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { motion } from "framer-motion";
import gsap from "gsap";
import {
	ArrowRight,
	BookOpen,
	BarChartIcon as ChartBar,
	Clock,
	Cog,
	Shield,
	Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

import CTA from "@/components/module/landing/CTA";
import IntroductionSection from "@/components/module/landing/Introduction";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeroHighlight } from "@/components/ui/custom/hero-highlight";

interface WhyChoose {
	title: string;
	description: string[];
}
interface Feature {
	icon: React.ComponentType;
	title: string;
	description: string;
}

interface Step {
	title: string;
	description: string;
}

interface Specialty {
	title: string;
	description: string;
}

interface Benefit {
	icon: React.ComponentType;
	title: string;
	description: string;
}
export default function TeleMedicineScreen() {
	const mainRef = useRef(null);
	const t = useTranslations();

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".animate-fade-in", {
				opacity: 0,
				y: 50,
				duration: 1,
				stagger: 0.2,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ".animate-fade-in",
					start: "top 80%",
				},
			});
		}, mainRef);

		return () => ctx.revert();
	}, []);

	const features = [
		{
			icon: Shield,
			title: "Secure and HIPAA-Compliant",
			description: "Ensures patient confidentiality and data protection",
		},
		{
			icon: Users,
			title: "Specialized Support",
			description: "Dedicated resources for telemedicine claims and billing",
		},
		{
			icon: Cog,
			title: "Seamless Integration",
			description:
				"Compatible with your existing systems for efficient care delivery",
		},
	];
	const whychoose: WhyChoose[] = [
		{
			title: "Real-Time Telemedicine",
			description: [
				"Live video consultations for urgent and routine care",
				"Specialties supported include psychiatry, endocrinology, telecardiology, and wound care",
			],
		},
		{
			title: "Asynchronous Telemedicine",
			description: [
				"Store-and-forward technology for reviewing lab results, radiology images, and dermatology cases",
				"Response time within 48 hours for most cases",
			],
		},
		{
			title: "Reimbursement Assistance",
			description: [
				"Detailed guidelines for CPT/HCPCS codes and modifiers (e.g., GT, 95)",
				"Simplified billing workflows to ensure prompt payments",
			],
		},
	];

	const steps = [
		{
			title: "Secure Login",
			description: "Access our HIPAA-compliant platform",
		},
		{
			title: "Start a Session",
			description: "Choose real-time or asynchronous telemedicine",
		},
		{
			title: "Submit Claims",
			description:
				"Use our integrated tools to process telemedicine-specific reimbursements",
		},
		{
			title: "Track Performance",
			description: "Monitor patient outcomes and session summaries",
		},
	];
	const specialties = [
		{
			title: "Endocrinology",
			description: "Manage chronic conditions like diabetes remotely",
		},
		{
			title: "Psychiatry",
			description: "Provide mental health care and therapy sessions online",
		},
		{
			title: "Telecardiology",
			description: "Monitor and manage heart health with remote consultations",
		},
		{
			title: "Telestroke",
			description: "Rapid response for stroke symptoms in critical situations",
		},
		{
			title: "Wound Care",
			description: "Support for wound assessments and treatment plans",
		},
		{
			title: "Teledermatology",
			description:
				"Diagnosing and managing skin conditions via virtual consultations",
		},
	];

	const benefits = [
		{
			icon: Clock,
			title: "Reduced Wait Times",
			description: "Faster diagnoses and improved access to care",
		},
		{
			icon: Users,
			title: "Enhanced Access",
			description: "Reach patients in remote or underserved areas",
		},
		{
			icon: ChartBar,
			title: "Cost Savings",
			description: "Efficient care delivery for providers and patients",
		},
		{
			icon: BookOpen,
			title: "Comprehensive Support",
			description: "Access to training materials and provider resources",
		},
	];

	return (
		<div className="flex flex-col min-h-screen">
			<main ref={mainRef} className="min-h-screen bg-background">
				{/* Hero Section */}
				<div className="bg-primary">
					<HeroHighlight className="flex flex-col md:flex-row items-center justify-center h-[30rem]">
						<div className="relative z-10 text-center space-y-6 px-4 max-w-4xl mx-auto text-white">
							<h1 className="text-4xl md:text-5xl font-bold animate-fade-in">
								Your Partner in Virtual Healthcare: Secure, Reliable, and
								Accessible Telemedicine
							</h1>
							<p className="text-xl animate-fade-in">
								Revolutionizing Remote Healthcare Delivery for Providers and
								Members
							</p>
							<motion.h1
								initial={{
									opacity: 0,
									y: 20,
								}}
								animate={{
									opacity: 1,
									y: [20, -5, 0],
								}}
								transition={{
									duration: 0.5,
									ease: [0.4, 0.0, 0.2, 1],
								}}
								className="text-lg px-4 md:text-4xl lg:text-5xl font-bold text-white dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
							>
								<div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fade-in">
									<Button
										size="lg"
										variant="outline"
										className="bg-primary/10"
										asChild
									>
										<Link href="/features">
											Explore Telemedicine Features
											<ArrowRight className="ml-2 w-4 h-4" />
										</Link>
									</Button>
									<Button
										size="lg"
										variant="outline"
										className="bg-secondary/40"
										asChild
									>
										<Link href="/contact-us">Contact Our Team</Link>
									</Button>
								</div>
							</motion.h1>
						</div>
					</HeroHighlight>
				</div>
				{/* Introduction Section */}
				<IntroductionSection
					title="What is Telemedicine?"
					description="Telemedicine is the use of secure, digital technology to deliver
							healthcare services remotely, enabling providers to connect with
							patients regardless of location. With Tilla Health, telemedicine
							supports real-time consultations, store-and-forward services, and
							innovative healthcare delivery solutions."
				/>

				{/* Features Section */}
				<section id="features" className="py-16 px-4 bg-muted">
					<div className="max-w-6xl mx-auto">
						<h2 className="text-3xl font-bold text-center mb-12">
							What Sets Us Apart?
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
										<p className="text-muted-foreground">
											{feature.description}
										</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>
				{/* Why Choose Section */}
				<section className="py-16 px-4">
					<div className="max-w-6xl mx-auto space-y-12">
						<div className="text-center max-w-3xl mx-auto space-y-4">
							<div className="text-center max-w-3xl mx-auto space-y-4">
								<h2 className="text-3xl font-bold animate-fade-in">
									Empowering Providers Through Virtual Care
								</h2>
								<p className="text-lg text-muted-foreground animate-fade-in">
									Comprehensive telemedicine solutions designed for modern
									healthcare delivery
								</p>
							</div>
							{whychoose.map((item) => (
								<Card key={item.title} className="animate-fade-in">
									<CardContent className="p-6 space-y-4">
										<h3 className="font-bold">{item.title}</h3>
										<ul className="space-y-2">
											{item.description.map((descItem, index) => (
												<li
													key={index}
													className="text-sm text-muted-foreground"
												>
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

				{/* Benefits Section */}
				<section className="py-16 px-4 bg-muted">
					<div className="max-w-6xl mx-auto space-y-12">
						<div className="text-center max-w-3xl mx-auto">
							<h2 className="text-3xl font-bold mb-6 animate-fade-in">
								Why Telemedicine is the Future of Healthcare
							</h2>
						</div>
						<div className="grid md:grid-cols-4 gap-6">
							{benefits.map((benefit) => (
								<Card key={benefit.title} className="animate-fade-in">
									<CardContent className="p-6 space-y-4">
										<benefit.icon className="w-8 h-8 text-primary" />
										<h3 className="font-bold">{benefit.title}</h3>
										<p className="text-sm text-muted-foreground">
											{benefit.description}
										</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* Specialties Section */}
				<section className="py-16 px-4">
					<div className="max-w-6xl mx-auto space-y-12">
						<div className="text-center max-w-3xl mx-auto space-y-4">
							<h2 className="text-3xl font-bold animate-fade-in">
								Telemedicine Specialties We Support
							</h2>
							<p className="text-lg text-muted-foreground animate-fade-in">
								Comprehensive coverage across multiple medical specialties
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-6">
							{specialties.map((specialty) => (
								<Card key={specialty.title} className="animate-fade-in">
									<CardContent className="p-6 space-y-2">
										<h3 className="font-bold">{specialty.title}</h3>
										<p className="text-sm text-muted-foreground">
											{specialty.description}
										</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>
				{/* How It Works Section */}
				<section className="py-16 px-4 bg-muted">
					<div className="max-w-6xl mx-auto space-y-12">
						<div className="text-center max-w-3xl mx-auto space-y-4">
							<h2 className="text-3xl font-bold animate-fade-in">
								Simple Steps to Deliver Virtual Care
							</h2>
							<p className="text-lg text-muted-foreground animate-fade-in">
								Get started with telemedicine in four easy steps
							</p>
						</div>
						<div className="grid md:grid-cols-4 gap-6">
							{steps.map((step, index) => (
								<Card key={step.title} className="animate-fade-in relative">
									<CardContent className="p-6 space-y-4">
										<div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
											{index + 1}
										</div>
										<h3 className="font-bold">{step.title}</h3>
										<p className="text-sm text-muted-foreground">
											{step.description}
										</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* Billing and Resources Section */}
				<section className="py-16 px-4">
					<div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
						<div className="space-y-6 animate-fade-in">
							<h2 className="text-3xl font-bold">Streamlined Reimbursement</h2>
							<div className="space-y-4">
								<Card>
									<CardContent className="p-6 space-y-4">
										<h3 className="text-xl font-semibold">Eligible Codes</h3>
										<p className="text-muted-foreground">
											CPT and HCPCS codes specific to telemedicine, including
											modifiers (GT, 95)
										</p>
										<h3 className="text-xl font-semibold">Billing Tips</h3>
										<ul className="list-disc pl-6 space-y-2 text-muted-foreground">
											<li>
												Include HCPCS Code Q3014 for originating site billing
											</li>
											<li>Use GT or GQ modifiers for distant site claims</li>
										</ul>
										<Button variant="default" asChild>
											<Link href="/resources">Access Reimbursement Guides</Link>
										</Button>
									</CardContent>
								</Card>
							</div>
						</div>
						<div className="space-y-6 animate-fade-in">
							<h2 className="text-3xl font-bold">Training & Resources</h2>
							<div className="space-y-4">
								<Card>
									<CardContent className="p-6">
										<h3 className="font-bold mb-2">Training Webinars</h3>
										<p className="text-sm text-muted-foreground">
											Live and recorded sessions for telemedicine best practices
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardContent className="p-6">
										<h3 className="font-bold mb-2">Provider Manuals</h3>
										<p className="text-sm text-muted-foreground">
											Comprehensive guides for setup and implementation
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardContent className="p-6">
										<h3 className="font-bold mb-2">FAQs and Knowledge Base</h3>
										<p className="text-sm text-muted-foreground">
											Common questions and quick solutions for telemedicine
										</p>
									</CardContent>
								</Card>
							</div>
						</div>
					</div>
				</section>

				{/* Success Stories Section */}
				<section className="py-16 px-4 bg-muted">
					<div className="max-w-6xl mx-auto space-y-12">
						<div className="text-center max-w-3xl mx-auto space-y-4">
							<h2 className="text-3xl font-bold animate-fade-in">
								See Telemedicine in Action
							</h2>
							<p className="text-lg text-muted-foreground animate-fade-in">
								Real success stories from healthcare providers using our
								platform
							</p>
						</div>
						<div className="grid md:grid-cols-2 gap-8">
							<Card className="animate-fade-in">
								<CardContent className="p-6">
									<blockquote className="space-y-2">
										<p className="text-lg italic">
											&quot;As a psychiatrist, I increased my patient reach by
											30% through telemedicine. The platform &apos; s ease of
											use and reliability have made it an essential part of my
											practice.&quot;
										</p>
										<footer className="text-sm text-muted-foreground">
											- Dr. Jane Smith
										</footer>
									</blockquote>
								</CardContent>
							</Card>
							<Card className="animate-fade-in">
								<CardContent className="p-6 space-y-4">
									<h3 className="font-bold">Key Outcomes</h3>
									<ul className="space-y-2 text-sm text-muted-foreground">
										<li>30% increase in patient reach</li>
										<li>95% patient satisfaction rate</li>
										<li>Reduced no-show rates by 60%</li>
										<li>Improved work-life balance for providers</li>
									</ul>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>
				{/* CTA Section */}
				<CTA
					text="Ready to Transform Your Practice?"
					link="/home"
					description={[
						"Join thousands of healthcare providers who trust Tilla Health for their telemedicine needs.",
					]}
					btnText="Schedule a Demo"
					btn2Text="Contact Us"
					registerLink="/member"
					slug="contact-us"
				/>
			</main>
		</div>
	);
}
