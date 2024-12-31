import Image from "next/image";

import { Mail, MapPin, Phone, Search } from "lucide-react";

import CTA from "@/components/module/landing/CTA";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IMAGES } from "@/constants/files";

export default function Providers() {
	const providers = [
		{
			name: "Dr. Sarah Johnson",
			specialty: "Primary Care",
			address: "123 Healthcare Drive, Medical District",
			city: "Atlanta, GA 30308",
			phone: "(404) 555-0123",
			email: "sarah.johnson@tillahealth.com",
			image: "/placeholder.svg?height=200&width=300",
		},
		{
			name: "Dr. Michael Smith",
			specialty: "Pediatrics",
			address: "456 Wellness Avenue",
			city: "Alpharetta, GA 30009",
			phone: "(770) 555-0124",
			email: "michael.smith@tillahealth.com",
			image: "/placeholder.svg?height=200&width=300",
		},
		{
			name: "Dr. Emily Davis",
			specialty: "Physical Therapy",
			address: "789 Medical Park",
			city: "Decatur, GA 30030",
			phone: "(678) 555-0125",
			email: "emily.davis@tillahealth.com",
			image: "/placeholder.svg?height=200&width=300",
		},
	];

	return (
		<div className="py-12 space-y-16">
			<div className="container space-y-16">
				<section className="text-center max-w-3xl mx-auto space-y-8">
					<div className="space-y-4">
						<h1 className="text-4xl font-bold">Find a Provider Near You</h1>
						<p className="text-lg text-muted-foreground">
							Discover healthcare providers available in your area
						</p>
					</div>

					<div className="flex gap-4 max-w-lg mx-auto">
						<Input placeholder="Enter ZIP code or city" />
						<Button>
							<Search className="w-4 h-4 mr-2" />
							Search
						</Button>
					</div>
				</section>

				<section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{providers.map((provider) => (
						<Card key={provider.name} className="overflow-hidden">
							<Image
								src={IMAGES.provider}
								alt={provider.name}
								width={300}
								height={200}
								className="w-full object-cover"
							/>
							<CardContent className="p-6 space-y-4">
								<h2 className="text-xl font-bold">{provider.name}</h2>
								<p className="text-sm text-muted-foreground">
									{provider.specialty}
								</p>
								<div className="space-y-2 text-sm">
									<p className="flex items-center gap-2">
										<MapPin className="w-4 h-4 text-primary" />
										{provider.address}, {provider.city}
									</p>
									<p className="flex items-center gap-2">
										<Phone className="w-4 h-4 text-primary" />
										{provider.phone}
									</p>
									<p className="flex items-center gap-2">
										<Mail className="w-4 h-4 text-primary" />
										{provider.email}
									</p>
								</div>
								<Button className="w-full" variant="outline">
									Get Directions
								</Button>
							</CardContent>
						</Card>
					))}
				</section>
			</div>
			{/* CTA Section */}
			<CTA
				text="Need Help Finding a Provider?"
				link="/contact-us"
				description={[
					"Our team is here to help you find the nearest healthcare provider",
					"and connect you with the services you need.",
				]}
				btnText="Contact Us"
				btn2Text="Read More"
				registerLink="/contact-us"
				slug="member-portal"
			/>
		</div>
	);
}
