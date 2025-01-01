import { Button } from "@/components/ui/button";

type IntroProps = {
	title: string;
	description: string;
};

export default function IntroductionSection({
	title,
	description,
}: IntroProps) {
	return (
		<section id="features" className="relative py-12 md:py-20">
			<div className="max-w-3xl mx-auto text-center items-center justify-center space-y-6">
				<h2 className="text-3xl font-bold animate-fade-in">{title}</h2>
				<p className="text-lg text-muted-foreground animate-fade-in">
					{description}
				</p>
				<Button
					className="font-bold shadow-lg transition-transform duration-300 hover:scale-105"
					size="lg"
					variant="secondary"
					// onClick={() => route.push(`${link2}` as `/${string}`)}
				>
					Read More
				</Button>
			</div>
		</section>
	);
}
