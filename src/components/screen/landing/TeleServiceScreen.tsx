"use client";

import Image from "next/image";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeroHighlight } from "@/components/ui/custom/hero-highlight";

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
								<div className="flex gap-4 justify-center animate-fade-in">
									<Button
										size="lg"
										variant="outline"
										className="bg-primary/10"
										asChild
									>
										<Link href="#features">
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
										<Link href="/contact">Contact Our Team</Link>
									</Button>
								</div>
							</motion.h1>
						</div>
					</HeroHighlight>
				</div>
				{/* Introduction Section */}
				<section className="py-16 px-4">
					<div className="max-w-3xl mx-auto text-center space-y-6">
						<h2 className="text-3xl font-bold animate-fade-in">
							What is Telemedicine?
						</h2>
						<p className="text-lg text-muted-foreground animate-fade-in">
							Telemedicine is the use of secure, digital technology to deliver
							healthcare services remotely, enabling providers to connect with
							patients regardless of location. With Tilla Health, telemedicine
							supports real-time consultations, store-and-forward services, and
							innovative healthcare delivery solutions.
						</p>
					</div>
				</section>

				{/* Features Section */}
				<section id="features" className="py-16 px-4 bg-gray-50">
					<div className="max-w-6xl mx-auto">
						<h2 className="text-3xl font-bold text-center mb-12">
							What Sets Us Apart?
						</h2>
						<div className="grid md:grid-cols-3 gap-6">
							{features.map((feature) => (
								<Card key={feature.title} className="animate-fade-in">
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

				{/* Benefits Section */}
				<section className="py-16 px-4 bg-gray-50">
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

				{/* CTA Section */}
				<CTA
					text="Ready to Transform Your Practice?"
					link="/member"
					description={[
						"Join thousands of healthcare providers who trust Tilla Health for their telemedicine needs.",
					]}
					btnText="Schedule a Demo"
					btn2Text="Contact Us"
					registerLink="/member"
					slug="member-portal"
				/>
			</main>
		</div>
	);
}
