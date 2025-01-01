"use client";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { HeroHighlight } from "@/components/ui/custom/hero-highlight";

type HeroProps = {
	text: string;
	link1: string; // First button link
	btnText1: string; // First button text
	link2: string; // Second button link
	btnText2: string; // Second button text
};

export function HeroHighlightDemo({
	text,
	link1,
	btnText1,
	link2,
	btnText2,
}: HeroProps) {
	const route = useRouter();
	return (
		<div className="relative bg-primary">
			<HeroHighlight className="flex flex-col md:flex-row items-center justify-center h-[20rem]">
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
					{text}
					<br />
					<div className="flex justify-center space-x-4 mt-4">
						<Button
							className="text-lg font-bold px-10 py-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
							size="lg"
							variant="secondary"
							onClick={() => route.push(`${link1}` as `/${string}`)}
						>
							{btnText1}
						</Button>
						<Button
							className="text-lg font-bold px-10 py-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
							size="lg"
							variant="secondary"
							onClick={() => route.push(`${link2}` as `/${string}`)}
						>
							{btnText2}
						</Button>
					</div>
				</motion.h1>
				<div className="relative pt-20">
					{/* <Image src={IMAGES.logoOnly} alt="doctors" width={1000} /> */}
				</div>
			</HeroHighlight>
			{/* <div className="pointer-events-none absolute inset-x-0 -bottom-10 z-40 h-20 w-full select-none bg-gradient-to-b from-primary to-background" /> */}
		</div>
	);
}
