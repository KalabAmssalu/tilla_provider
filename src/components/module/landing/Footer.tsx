import Image from "next/image";
import Link from "next/link";

import {
	ArrowUpRight,
	Facebook,
	Instagram,
	Linkedin,
	Twitter,
} from "lucide-react";

import { IMAGES } from "@/constants/files";

export function Footer() {
	return (
		<footer className=" py-10 bg-[#] shadow-xl">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-start mb-8 space-y-6 md:space-y-0">
					{/* Logo Section */}
					<div className="flex items-center justify-center md:justify-start w-full md:w-1/4">
						<Image
							src={IMAGES.logoOnly}
							alt="Logo"
							className="h-auto"
							width={200}
						/>
					</div>

					{/* Contact Us Section */}
					<div className="w-full md:w-1/4 ml-4 animate-fade-in">
						<h3 className="text-lg group font-semibold mb-2 flex items-center gap-2 cursor-pointer transition duration-300 hover:underline hover:text-primary">
							Contact
							<ArrowUpRight
								size={16}
								className="text-primary transition-transform group-hover:translate-x-1 "
							/>
						</h3>
						<p className="text-sm">
							Email: <span className="text-primary">info@tillaHealth.com</span>
						</p>
						<p className="text-sm mb-2">
							Phone: <span className="text-primary">(123) 456-7890</span>
						</p>
					</div>

					{/* Quick Links Section */}
					<div className="w-full md:w-1/4 animate-fade-in">
						<h3 className="text-lg group font-semibold mb-2 flex items-center gap-2 cursor-pointer transition duration-300 hover:underline hover:text-primary">
							Quick Links
							<ArrowUpRight
								size={16}
								className="text-primary transition-transform group-hover:translate-x-1"
							/>
						</h3>
						<ul className="space-y-2">
							<li>
								<Link href="/telemedicine" className="hover:text-primary">
									Telemedicine
								</Link>
							</li>
							<li>
								<Link href="/provider-online" className="hover:text-primary">
									Provider Online
								</Link>
							</li>
							<li>
								<Link href="/locations" className="hover:text-primary">
									Locations
								</Link>
							</li>
						</ul>
					</div>

					{/* Resources Section */}
					<div className="w-full md:w-1/4 animate-fade-in">
						<h3 className="text-lg group font-semibold mb-2 flex items-center gap-2 cursor-pointer transition duration-300 hover:underline hover:text-primary">
							Resources
							<ArrowUpRight
								size={16}
								className="text-primary transition-transform group-hover:translate-x-1"
							/>
						</h3>
						<ul className="space-y-2">
							<li>
								<Link href="/training" className="hover:text-primary">
									Training
								</Link>
							</li>
							<li>
								<Link href="/support" className="hover:text-primary">
									Support
								</Link>
							</li>
							<li>
								<Link href="/faq" className="hover:text-primary">
									FAQ
								</Link>
							</li>
						</ul>
					</div>
					{/* Legal and Social Media Section */}
					<div className="w-full md:w-1/4 animate-fade-in">
						<h3 className="text-lg group font-semibold mb-2 flex items-center gap-2 cursor-pointer transition duration-300 hover:underline hover:text-primary">
							Legal
							<ArrowUpRight
								size={16}
								className="text-primary transition-transform group-hover:translate-x-1 "
							/>
						</h3>
						<ul className="space-y-2">
							<li>
								<Link href="/privacy" className="hover:text-primary">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link href="/terms" className="hover:text-primary">
									Terms of Use
								</Link>
							</li>
						</ul>
						<h3 className="text-lg font-semibold mb-2 mt-2">Follow Us</h3>
						<div className="flex space-x-4">
							<Link href="#" aria-label="Facebook">
								<Facebook className="text-primary" />
							</Link>
							<Link href="#" aria-label="Twitter">
								<Twitter className="text-primary" />
							</Link>
							<Link href="#" aria-label="LinkedIn">
								<Linkedin className="text-primary" />
							</Link>
							<Link href="#" aria-label="Instagram">
								<Instagram className="text-primary" />
							</Link>
						</div>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="border-t border-gray-600 pt-4 text-center text-sm">
					<p>
						&copy; {new Date().getFullYear()} Tilla Health Insurance. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
