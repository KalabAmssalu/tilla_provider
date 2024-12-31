"use client";

import { useRef, useState } from "react";

import { motion } from "framer-motion";
import { Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";

// import { submitContactForm } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

export default function ContactPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	const contactInfo = [
		{
			icon: Phone,
			title: "Phone",
			details: ["+251 (900) 034-848", "Mon-Fri from 8am to 6pm"],
		},
		{
			icon: Mail,
			title: "Email",
			details: ["tillaHealthsupport@email.com", "tillaHealthsales@email.com"],
		},
		{
			icon: MapPin,
			title: "Address",
			details: ["Airport Road", "Bole", "Addis Ababa, Ethiopia"],
		},
		{
			icon: Clock,
			title: "Hours",
			details: [
				"Monday - Friday: 8:00 AM - 6:00 PM",
				"Saturday - Sunday: Closed",
			],
		},
	];

	async function handleSubmit(formData: FormData) {
		setIsSubmitting(true);
		try {
			// const result = await submitContactForm(formData);
			// if (result.success) {
			// 	toast({
			// 		title: "Success!",
			// 		description: result.message,
			// 	});
			// 	formRef.current?.reset();
			// } else {
			// 	toast({
			// 		title: "Error",
			// 		description: result.message,
			// 		variant: "destructive",
			// 	});
			// }
		} catch (error) {
			toast({
				title: "Error",
				description: "Something went wrong. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="min-h-screen bg-background py-12 md:py-24">
			<div className="container px-4 md:px-6">
				<div className="grid gap-12">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-center space-y-4"
					>
						<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
							Contact Us
						</h1>
						<p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
							Have a question or need assistance? We&apos;re here to help. Fill
							out the form below or use our contact information to reach us.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 gap-8">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<Card>
								<CardHeader>
									<CardTitle>Send us a Message</CardTitle>
									<CardDescription>
										Fill out the form below and we&apos;ll get back to you as
										soon as possible.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<form
										ref={formRef}
										action={handleSubmit}
										className="space-y-4"
									>
										<div className="space-y-2">
											<Label htmlFor="name">Name</Label>
											<Input
												id="name"
												name="name"
												placeholder="Your name"
												required
												disabled={isSubmitting}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="email">Email</Label>
											<Input
												id="email"
												name="email"
												type="email"
												placeholder="your@email.com"
												required
												disabled={isSubmitting}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="subject">Subject</Label>
											<Input
												id="subject"
												name="subject"
												placeholder="How can we help?"
												required
												disabled={isSubmitting}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="message">Message</Label>
											<Textarea
												id="message"
												name="message"
												placeholder="Your message..."
												required
												className="min-h-[150px]"
												disabled={isSubmitting}
											/>
										</div>
										<Button
											type="submit"
											className="w-full"
											disabled={isSubmitting}
										>
											{isSubmitting ? (
												<>
													<Loader2 className="mr-2 h-4 w-4 animate-spin" />
													Sending...
												</>
											) : (
												"Send Message"
											)}
										</Button>
									</form>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="grid content-start gap-6"
						>
							<h2 className="text-2xl font-bold">Get in Touch</h2>
							{contactInfo.map((item, index) => (
								<Card key={index}>
									<CardContent className="p-6">
										<div className="flex items-start space-x-4">
											<div className="p-2 bg-primary/10 rounded-lg">
												<item.icon className="h-5 w-5 text-primary" />
											</div>
											<div>
												<h3 className="font-semibold">{item.title}</h3>
												{item.details.map((detail, i) => (
													<p key={i} className="text-sm text-muted-foreground">
														{detail}
													</p>
												))}
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
}
