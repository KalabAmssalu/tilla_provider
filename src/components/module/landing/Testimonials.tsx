import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const testimonials = [
	{
		name: "Sarah Johnson",
		role: "Teacher",
		content:
			"Tilla has been a lifesaver. Their comprehensive coverage and quick claim process made my recent hospital stay stress-free.",
		avatar: "/placeholder.svg?height=40&width=40",
	},
	{
		name: "Michael Chen",
		role: "Software Engineer",
		content:
			"I love how Tilla tailored a plan specifically for my needs. Their customer service is top-notch!",
		avatar: "/placeholder.svg?height=40&width=40",
	},
];

export default function Testimonials() {
	return (
		<section id="testimonials" className="py-12 md:py-20">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in">
					What Our Customers Say
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{testimonials.map((testimonial, index) => (
						<Card key={index} className="animate-fade-in">
							<CardContent className="pt-6">
								<p className="text-muted-foreground mb-4">
									{testimonial.content}
								</p>
							</CardContent>
							<CardFooter className="flex items-center">
								<Avatar className="mr-4">
									<AvatarImage
										src={testimonial.avatar}
										alt={testimonial.name}
									/>
									<AvatarFallback>{testimonial.name[0]}</AvatarFallback>
								</Avatar>
								<div>
									<p className="font-semibold">{testimonial.name}</p>
									<p className="text-sm text-muted-foreground">
										{testimonial.role}
									</p>
								</div>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
