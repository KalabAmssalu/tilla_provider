"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileSearch } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";

// Define the validation schema for the member search form
const memberSearchSchema = z.object({
	member_id: z.string().optional(),
	first_name: z.string().optional(),
	last_name: z.string().optional(),
	email_address: z.string().email().optional(),
	phone_number: z.string().optional(),
});

type MemberSearchFormValues = z.infer<typeof memberSearchSchema>;

const MemberSearch = () => {
	const form = useForm<MemberSearchFormValues>({
		resolver: zodResolver(memberSearchSchema),
		defaultValues: {
			member_id: "",
			first_name: "",
			last_name: "",
			email_address: "",
			phone_number: "",
		},
	});

	function onSubmit(data: MemberSearchFormValues) {
		console.log("Submitted Data:", data);
		// Here you can perform the search operation, e.g., fetching member data
	}

	return (
		<Card className="mb-4 bg-secondary/40">
			<CardHeader>
				<CardTitle className="text-xl font-bold">Member Search</CardTitle>
				<CardDescription className="text-muted-foreground">
					Search and manage member information
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col items-end">
				<Accordion
					type="single"
					collapsible
					defaultValue="item-1"
					className="w-full mt-4 m-0"
				>
					<AccordionItem value="item-1">
						<AccordionTrigger className="hover:no-underline rounded-lg bg-muted/40 px-4">
							<span className="text-xl px-4 py-2 rounded-lg font-bold flex items-center">
								Search Member <FileSearch className="ml-2" size={20} />
							</span>
						</AccordionTrigger>
						<AccordionContent className="pt-8">
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)} className="px-0">
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<ReusableFormField
											control={form.control}
											name="member_id"
											type="text"
											local="claimStatusForm"
											labelKey="fields.member_id.label"
											placeholderKey="fields.member_id.placeholder"
										/>
										<ReusableFormField
											control={form.control}
											name="member_first_name"
											type="text"
											local="claimStatusForm"
											labelKey="fields.member_first_name.label"
											placeholderKey="fields.member_first_name.placeholder"
										/>
										<ReusableFormField
											control={form.control}
											name="member_last_name"
											type="text"
											local="claimStatusForm"
											labelKey="fields.member_last_name.label"
											placeholderKey="fields.member_last_name.placeholder"
										/>
										<ReusableFormField
											control={form.control}
											name="email_address"
											type="text"
											local="claimStatusForm"
											labelKey="fields.email_address.label"
											placeholderKey="fields.email_address.placeholder"
										/>
										<ReusableFormField
											control={form.control}
											name="phone_number"
											type="text"
											local="claimStatusForm"
											labelKey="fields.phone_number.label"
											placeholderKey="fields.phone_number.placeholder"
										/>
									</div>
									<div className="flex justify-end gap-4">
										<Button variant="outline" className="mt-4">
											Clear
										</Button>
										<Button type="submit" className="mt-4">
											Search
										</Button>
									</div>
								</form>
							</Form>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</CardContent>
		</Card>
	);
};

export default MemberSearch;
