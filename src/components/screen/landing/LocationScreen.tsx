import Image from "next/image";

import { Mail, MapPin, Phone, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Locations() {
	const locations = [
		{
			name: "Tilla Health Main Campus",
			address: "123 Healthcare Drive, Medical District",
			city: "Atlanta, GA 30308",
			phone: "(404) 555-0123",
			email: "atlanta@tillahealth.com",
			services: ["Primary Care", "Specialty Care", "Telemedicine Hub"],
			image: "/placeholder.svg?height=200&width=300",
		},
		{
			name: "Tilla Health North Center",
			address: "456 Wellness Avenue",
			city: "Alpharetta, GA 30009",
			phone: "(770) 555-0124",
			email: "alpharetta@tillahealth.com",
			services: ["Primary Care", "Pediatrics", "Laboratory Services"],
			image: "/placeholder.svg?height=200&width=300",
		},
		{
			name: "Tilla Health East Center",
			address: "789 Medical Park",
			city: "Decatur, GA 30030",
			phone: "(678) 555-0125",
			email: "decatur@tillahealth.com",
			services: ["Specialty Care", "Imaging Center", "Physical Therapy"],
			image: "/placeholder.svg?height=200&width=300",
		},
	];

	return (
		<div className="py-12">
			<div className="container px-4 space-y-16">
				<section className="text-center max-w-3xl mx-auto space-y-8">
					<div className="space-y-4">
						<h1 className="text-4xl font-bold">Find a Location Near You</h1>
						<p className="text-lg text-muted-foreground">
							Discover Tilla Health facilities and services in your area
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
					{locations.map((location) => (
						<Card key={location.name} className="overflow-hidden">
							<Image
								src={location.image}
								alt={location.name}
								width={300}
								height={200}
								className="w-full object-cover"
							/>
							<CardContent className="p-6 space-y-4">
								<h2 className="text-xl font-bold">{location.name}</h2>
								<div className="space-y-2 text-sm">
									<p className="flex items-center gap-2">
										<MapPin className="w-4 h-4 text-primary" />
										{location.address}
										<br />
										{location.city}
									</p>
									<p className="flex items-center gap-2">
										<Phone className="w-4 h-4 text-primary" />
										{location.phone}
									</p>
									<p className="flex items-center gap-2">
										<Mail className="w-4 h-4 text-primary" />
										{location.email}
									</p>
								</div>
								<div className="space-y-2">
									<h3 className="font-semibold">Available Services:</h3>
									<ul className="text-sm space-y-1">
										{location.services.map((service) => (
											<li key={service}>{service}</li>
										))}
									</ul>
								</div>
								<Button className="w-full" variant="outline">
									Get Directions
								</Button>
							</CardContent>
						</Card>
					))}
				</section>

				<section className="text-center space-y-6 bg-muted rounded-lg p-8">
					<h2 className="text-2xl font-bold">Need Help Finding a Location?</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						Our team is here to help you find the nearest Tilla Health facility
						and connect you with the services you need.
					</p>
					<Button size="lg">Contact Us</Button>
				</section>
			</div>
		</div>
	);
}
