"use client";

import Image from "next/image";
import React from "react";

import { motion } from "framer-motion";

// Define the props for our component
interface PartnerSliderProps {
	partners: { name: string; logo: any }[];
}

export const PartnerSlider: React.FC<PartnerSliderProps> = ({ partners }) => {
	return (
		<div className="w-full overflow-hidden py-4">
			<div className="flex">
				<motion.div
					className="flex gap-8"
					animate={{ x: ["0%", "-50%"] }}
					transition={{
						duration: 80,
						ease: "linear",
						repeat: Infinity,
					}}
				>
					{[...partners, ...partners].map((partner, index) => (
						<div
							key={`${partner.name}-${index}`}
							className="flex items-center justify-center w-40 h-20"
						>
							<Image
								src={partner.logo}
								alt={`${partner.name} logo`}
								width={160}
								height={60}
								className="max-w-full max-h-full object-contain"
							/>
						</div>
					))}
				</motion.div>
			</div>
		</div>
	);
};
