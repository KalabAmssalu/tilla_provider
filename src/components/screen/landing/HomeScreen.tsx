"use client";

import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

import CTA from "@/components/module/landing/CTA";
import Features from "@/components/module/landing/Features";
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
		{ name: "blacklionlogo", logo: IMAGES.blueLogo },
		{ name: "who", logo: IMAGES.blueLogo },
		{ name: "moh", logo: IMAGES.blueLogo },
		{ name: "paulos", logo: IMAGES.blueLogo },
		{ name: "redcrosslogo", logo: IMAGES.blueLogo },
		{ name: "pauloslogo", logo: IMAGES.blueLogo },
		{ name: "mohlogo", logo: IMAGES.blueLogo },
		{ name: "blacklion", logo: IMAGES.blueLogo },
	];
	return (
		<div className="flex flex-col min-h-screen">
			<main ref={mainRef} className="min-h-screen bg-background">
				<HeroHighlightDemo
					text="Welcome to Tilla Health Provider Portal!!"
					link1="/home"
					btnText1="Register"
					link2="/auth/sign-in"
					btnText2="Login"
				/>
				{/* <PartnerSlider partners={partner} /> */}
				<Testimonials />
				<Features />

				<CTA
					text="Access your Provider Portal"
					link="/auth/sign-in"
					description={["Joining the Provider Portal is easy."]}
					btnText="Login"
					btn2Text="Read More"
					registerLink="/member"
					slug="home"
				/>
			</main>
		</div>
	);
}
