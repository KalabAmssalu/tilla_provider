import { Clock, Heart, Shield } from "lucide-react";

import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { IMAGES } from "@/constants/files";

const features = [
	{
		icon: Shield,
		title: "Comprehensive Coverage",
		description:
			"Get protection for a wide range of health services and treatments.",
	},
	{
		icon: Heart,
		title: "Personalized Care",
		description: "Tailored insurance plans to meet your specific health needs.",
	},
	{
		icon: Clock,
		title: "24/7 Support",
		description: "Round-the-clock assistance for your health-related queries.",
	},
];

export default function Features() {
	return (
		<section id="features" className="relative py-12 md:py-20 bg-muted">
			<div
				className="absolute inset-0 bg-cover bg-center w-full filter "
				style={{
					backgroundImage: `url(${IMAGES.provider})`,
					zIndex: 0.2,
				}}
			></div>
			<div className="container mx-auto px-4  flex flex-col items-center justify-center  mb-10">
				<h2 className="text-3xl md:text-4xl font-bold text-center text-primary w-[90%] border-2 border-primary backdrop-blur-sm bg-background rounded-full mb-28 animate-fade-in">
					Why Choose Tilla
				</h2>
				<div className="grid grid-cols-1  md:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<Card
							key={index}
							className="animate-fade-in border-2 border-primary"
						>
							<CardHeader>
								<feature.icon className="w-12 h-12 text-primary mb-4" />
								<CardTitle>{feature.title}</CardTitle>
								<CardDescription>{feature.description}</CardDescription>
							</CardHeader>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
