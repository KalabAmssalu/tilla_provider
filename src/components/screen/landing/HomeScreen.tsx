"use client";

import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

import CTA from "@/components/module/landing/CTA";
import { HeroHighlightDemo } from "@/components/module/landing/HeroHighLight";
import { PartnerSlider } from "@/components/module/landing/PartnerSlider";
import Testimonials from "@/components/module/landing/Testimonials";
import { IMAGES } from "@/constants/files";

gsap.registerPlugin(ScrollTrigger);

export default function HomeScreen() {
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

	const partner = [
		{ name: "blacklionlogo", logo: IMAGES.noRecord },
		{ name: "who", logo: IMAGES.noRecord },
		{ name: "moh", logo: IMAGES.noRecord },
		{ name: "paulos", logo: IMAGES.noRecord },
		{ name: "redcrosslogo", logo: IMAGES.noRecord },
		{ name: "pauloslogo", logo: IMAGES.noRecord },
		{ name: "mohlogo", logo: IMAGES.noRecord },
		{ name: "blacklion", logo: IMAGES.noRecord },
	];
	return (
		<div className="flex flex-col min-h-screen">
			<main ref={mainRef} className="min-h-screen bg-background">
				<HeroHighlightDemo
					text="Welcome to Tilla Health Provider Portal!!"
					link1="/member"
					btnText1="Register"
					link2="/login"
					btnText2="Login"
				/>
				{/* <PartnerSlider partners={partner} /> */}
				<Testimonials />
				<CTA
					text="Access your Provider Portal"
					link="/member"
					description={["Joining the Provider Portal is easy."]}
					btnText="Login"
					btn2Text="Read More"
					registerLink="/member"
					slug="member-portal"
				/>
			</main>
		</div>
	);
}
