"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type CTAProps = {
	text: string;
	link: string;
	description: string[];
	btnText: string;
	btn2Text: string;
	registerLink: string;
	slug: string;
};

export default function CTA({
	text,
	description,
	link,
	btnText,
	btn2Text,
	registerLink,
	slug,
}: CTAProps) {
	const route = useRouter();
	return (
		<section className="py-12 md:py-20 bg-primary text-primary-foreground">
			<div className="container mx-auto px-4 text-center">
				<h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
					{text}
				</h2>
				<div className="text-xl mb-8 animate-fade-in">
					{description.map((line, index) => (
						<span key={index} className="block mb-2">
							{line.includes("[Register Here]") ? (
								<>
									{line.split("[Register Here]")[0]}
									<Link
										href={`${registerLink}` as `/${string}`}
										className="underline hover:text-secondary"
									>
										Register Here
									</Link>
									{line.split("[Register Here]")[1]}
								</>
							) : (
								line
							)}
						</span>
					))}
				</div>
				<div className="flex justify-center space-x-4">
					<Button
						size="lg"
						variant="secondary"
						className="animate-fade-in"
						onClick={() => route.push(`${link}` as `/${string}`)}
					>
						{btnText}
					</Button>
					<Button
						size="lg"
						variant="ghost"
						className="animate-fade-in bg-gray-500"
						onClick={() => route.push(`/blog/${slug}` as `/${string}`)}
					>
						{btn2Text}
					</Button>
				</div>
			</div>
		</section>
	);
}
