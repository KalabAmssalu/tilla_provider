import Link from "next/link";

import { ArrowRight, FileText, Scale } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReferralScreen() {
	return (
		<div className="py-12">
			<div className="container px-4 space-y-16">
				<section className="text-center max-w-3xl mx-auto space-y-4">
					<h1 className="text-4xl font-bold">
						Navigating Referrals, Appeals, and Disputes
					</h1>
					<p className="text-lg text-muted-foreground">
						Streamlined processes for managing healthcare administrative tasks
					</p>
				</section>

				<Tabs defaultValue="referrals" className="space-y-8">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="referrals">Referrals</TabsTrigger>
						<TabsTrigger value="appeals">Appeals</TabsTrigger>
						<TabsTrigger value="disputes">Disputes</TabsTrigger>
					</TabsList>
					<TabsContent value="referrals" className="space-y-8">
						<Card>
							<CardContent className="p-6">
								<div className="space-y-4">
									<h2 className="text-2xl font-bold">
										Simplifying the Referral Process
									</h2>
									<p className="text-muted-foreground">
										Learn when and how to submit referrals for specialist visits
										or specific procedures
									</p>
									<Button asChild>
										{/* <Link href="/referrals/submit">
											Submit a Referral
											<ArrowRight className="ml-2 w-4 h-4" />
										</Link> */}
									</Button>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="appeals" className="space-y-8">
						<Card>
							<CardContent className="p-6">
								<div className="space-y-4">
									<h2 className="text-2xl font-bold">
										Appealing a Denied Claim or Service
									</h2>
									<p className="text-muted-foreground">
										Understanding when and how to file an appeal for denied
										claims or services
									</p>
									<Button asChild>
										{/* <Link href="/appeals/file">
											File an Appeal
											<FileText className="ml-2 w-4 h-4" />
										</Link> */}
									</Button>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
					<TabsContent value="disputes" className="space-y-8">
						<Card>
							<CardContent className="p-6">
								<div className="space-y-4">
									<h2 className="text-2xl font-bold">
										Resolving Provider Payment and Service Disputes
									</h2>
									<p className="text-muted-foreground">
										Guide to filing and resolving disputes related to payments
										or services
									</p>
									<Button asChild>
										{/* <Link href="/disputes/resolve">
											Resolve a Dispute
											<Scale className="ml-2 w-4 h-4" />
										</Link> */}
									</Button>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
