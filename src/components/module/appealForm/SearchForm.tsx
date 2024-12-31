"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DateSelector } from "@/components/ui/custom/date-selector";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatToMMDDYYYY } from "@/lib/utils/dateUtils";
import {
	type PersonalInfoFormValues,
	createPersonalInfoSchema,
} from "@/types/member/memeberValidation";

interface SearchFormProps {
	onFormComplete: (data: PersonalInfoFormValues) => void;
	open: boolean;
	setOpen: (open: boolean) => void;
}

export default function SearchForm({
	onFormComplete,
	open,
	setOpen,
}: SearchFormProps) {
	const [visible, setVisible] = useState(true);
	const t = useTranslations("searchClaimInfoForm");

	const personalInfoSchema = createPersonalInfoSchema(t);

	const form = useForm<PersonalInfoFormValues>({
		resolver: zodResolver(personalInfoSchema),
		defaultValues: {
			member_id: "",
			first_name: "",
			middle_name: "",
			last_name: "",
			first_name_amharic: "",
			middle_name_amharic: "",
			last_name_amharic: "",
			date_of_birth: "",
			phone_number: "",
			family_id: "",
			dependent_first_name: "",
			dependent_middle_name: "",
			dependent_last_name: "",
			dependent_first_name_amharic: "",
			dependent_middle_name_amharic: "",
			dependent_last_name_amharic: "",
			dependent_date_of_birth: "",
		},
	});
	function onSubmit(data: PersonalInfoFormValues) {
		setVisible(false);
		onFormComplete(data);
	}
	const [activeTab, setActiveTab] = useState("primary");

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="overflow-hidden border-2 border-secondary p-0 md:max-h-[800px] md:max-w-[700px] lg:max-w-[1200px]">
				<DialogHeader className="bg-primary text-white p-3">
					<DialogTitle className="font-bold">{t("title")}</DialogTitle>
					<DialogDescription className="text-white">
						{t("description")}
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="px-4">
						<Tabs
							defaultValue="account"
							className="w-full pb-20"
							onValueChange={(value) => setActiveTab(value)}
						>
							<TabsList className="grid lg:w-[40%] w-full grid-cols-2 h-14 mb-4">
								<TabsTrigger
									value="primary"
									className={`h-12 ${
										activeTab === "primary" ? "border-t-8 border-primary" : ""
									}`}
								>
									Primary Member Search
								</TabsTrigger>
								{/* <TabsTrigger
									value="dependancy"
									className={`h-12 ${
										activeTab === "dependancy"
											? "border-t-8 border-primary"
											: ""
									}`}
								>
									Family Member Search
								</TabsTrigger> */}
							</TabsList>
							<TabsContent value="primary" className="w-full">
								<Card>
									<CardContent className="py-4 bg-muted">
										<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 pr-6">
											<FormField
												control={form.control}
												name="member_id"
												render={({ field }) => (
													<FormItem>
														<FormLabel>{t("fields.claim_id.label")}</FormLabel>
														<FormControl>
															<Input
																placeholder={t("fields.claim_id.placeholder")}
																{...field}
																className="bg-background"
															/>
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="member_id"
												render={({ field }) => (
													<FormItem>
														<FormLabel>{t("fields.member_id.label")}</FormLabel>
														<FormControl>
															<Input
																placeholder={t("fields.member_id.placeholder")}
																{...field}
																className="bg-background"
															/>
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="member_id"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															{t("fields.diagnosis_date.label")}
														</FormLabel>
														<FormControl>
															<Input
																placeholder={t(
																	"fields.diagnosis_date.placeholder"
																)}
																{...field}
																className="bg-background"
															/>
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>

											{/* <FormField
												control={form.control}
												name="phone_number"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															{t("fields.phone_number.label")}
														</FormLabel>
														<FormControl>
															<Input
																placeholder={t(
																	"fields.phone_number.placeholder"
																)}
																{...field}
																className="bg-background"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="first_name"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															{t("fields.first_name.label")}
														</FormLabel>
														<FormControl>
															<Input
																placeholder={t("fields.first_name.placeholder")}
																{...field}
																className="bg-background"
															/>
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="middle_name"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															{t("fields.middle_name.label")}
														</FormLabel>
														<FormControl>
															<Input
																placeholder={t(
																	"fields.middle_name.placeholder"
																)}
																{...field}
																className="bg-background"
															/>
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="last_name"
												render={({ field }) => (
													<FormItem>
														<FormLabel>{t("fields.last_name.label")}</FormLabel>
														<FormControl>
															<Input
																placeholder={t("fields.last_name.placeholder")}
																{...field}
																className="bg-background"
															/>
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="date_of_birth"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															{t("fields.date_of_birth.label")}
														</FormLabel>
														<FormControl>
															<DateSelector
																selectedDate={
																	field.value
																		? new Date(field.value)
																		: undefined
																} // Convert string to Date
																onDateChange={(date) => {
																	form.setValue(
																		"date_of_birth",
																		date ? formatToMMDDYYYY(date) : "" // Format Date to MM, DD, YYYY
																	);
																}}
																placeholder={t(
																	"fields.date_of_birth.placeholder"
																)}
																buttonClassName="custom-button-class "
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/> */}
										</div>
										{/* <Accordion type="single" collapsible className="w-full">
											<AccordionItem value="primary_amharic">
												<AccordionTrigger>
													ታካሚውን በአማርኛ ስም ፈልግ ?
												</AccordionTrigger>
												<AccordionContent>
													<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pr-6">
														<FormField
															control={form.control}
															name="first_name_amharic"
															render={({ field }) => (
																<FormItem>
																	<FormLabel>
																		{t("fields.first_name_amharic.label")}
																	</FormLabel>
																	<FormControl>
																		<Input
																			placeholder={t(
																				"fields.first_name_amharic.placeholder"
																			)}
																			{...field}
																			className="bg-background"
																		/>
																	</FormControl>

																	<FormMessage />
																</FormItem>
															)}
														/>
														<FormField
															control={form.control}
															name="middle_name_amharic"
															render={({ field }) => (
																<FormItem>
																	<FormLabel>
																		{t("fields.middle_name_amharic.label")}
																	</FormLabel>
																	<FormControl>
																		<Input
																			placeholder={t(
																				"fields.middle_name_amharic.placeholder"
																			)}
																			{...field}
																			className="bg-background"
																		/>
																	</FormControl>

																	<FormMessage />
																</FormItem>
															)}
														/>
														<FormField
															control={form.control}
															name="last_name_amharic"
															render={({ field }) => (
																<FormItem>
																	<FormLabel>
																		{t("fields.last_name_amharic.label")}
																	</FormLabel>
																	<FormControl>
																		<Input
																			placeholder={t(
																				"fields.last_name_amharic.placeholder"
																			)}
																			{...field}
																			className="bg-background"
																		/>
																	</FormControl>

																	<FormMessage />
																</FormItem>
															)}
														/>
													</div>
												</AccordionContent>
											</AccordionItem>
										</Accordion> */}
									</CardContent>
								</Card>
							</TabsContent>
							{/* <TabsContent value="dependancy" className="w-full">
								<Card>
									<CardContent className="py-4 bg-muted">
										<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 pr-6">
											<FormField
												control={form.control}
												name="family_id"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="flex gap-1">
															{t("fields.family_id.label")}
															<p className="text-red-500">*</p>
														</FormLabel>
														<FormControl>
															<Input
																placeholder={t("fields.family_id.placeholder")}
																{...field}
																className="bg-background"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="dependent_first_name"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															{t("fields.dependent_first_name.label")}
														</FormLabel>
														<FormControl>
															<Input
																placeholder={t(
																	"fields.dependent_first_name.placeholder"
																)}
																{...field}
																className="bg-background"
															/>
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="dependent_middle_name"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															{t("fields.dependent_middle_name.label")}
														</FormLabel>
														<FormControl>
															<Input
																placeholder={t(
																	"fields.dependent_middle_name.placeholder"
																)}
																{...field}
																className="bg-background"
															/>
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="dependent_last_name"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															{t("fields.dependent_last_name.label")}
														</FormLabel>
														<FormControl>
															<Input
																placeholder={t(
																	"fields.dependent_last_name.placeholder"
																)}
																{...field}
																className="bg-background"
															/>
														</FormControl>

														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="dependent_date_of_birth"
												render={({ field }) => (
													<FormItem>
														<FormLabel>
															{t("fields.dependent_date_of_birth.label")}
														</FormLabel>
														<FormControl>
															<DateSelector
																selectedDate={
																	field.value
																		? new Date(field.value)
																		: undefined
																} // Convert string to Date
																onDateChange={(date) => {
																	form.setValue(
																		"dependent_date_of_birth",
																		date ? formatToMMDDYYYY(date) : "" // Format Date to MM, DD, YYYY
																	);
																}}
																placeholder={t(
																	"fields.dependent_date_of_birth.placeholder"
																)}
																buttonClassName="custom-button-class"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<Accordion type="single" collapsible className="w-full">
											<AccordionItem value="primary_amharic">
												<AccordionTrigger>
													ታካሚውን በአማርኛ ስም ፈልግ ?
												</AccordionTrigger>
												<AccordionContent>
													<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pr-6">
														<FormField
															control={form.control}
															name="dependent_first_name_amharic"
															render={({ field }) => (
																<FormItem>
																	<FormLabel>
																		{t(
																			"fields.dependent_first_name_amharic.label"
																		)}
																	</FormLabel>
																	<FormControl>
																		<Input
																			placeholder={t(
																				"fields.dependent_first_name_amharic.placeholder"
																			)}
																			{...field}
																			className="bg-background"
																		/>
																	</FormControl>

																	<FormMessage />
																</FormItem>
															)}
														/>
														<FormField
															control={form.control}
															name="dependent_middle_name_amharic"
															render={({ field }) => (
																<FormItem>
																	<FormLabel>
																		{t(
																			"fields.dependent_middle_name_amharic.label"
																		)}
																	</FormLabel>
																	<FormControl>
																		<Input
																			placeholder={t(
																				"fields.dependent_middle_name_amharic.placeholder"
																			)}
																			{...field}
																			className="bg-background"
																		/>
																	</FormControl>

																	<FormMessage />
																</FormItem>
															)}
														/>
														<FormField
															control={form.control}
															name="dependent_last_name_amharic"
															render={({ field }) => (
																<FormItem>
																	<FormLabel>
																		{t(
																			"fields.dependent_last_name_amharic.label"
																		)}
																	</FormLabel>
																	<FormControl>
																		<Input
																			placeholder={t(
																				"fields.dependent_last_name_amharic.placeholder"
																			)}
																			{...field}
																			className="bg-background"
																		/>
																	</FormControl>

																	<FormMessage />
																</FormItem>
															)}
														/>
													</div>
												</AccordionContent>
											</AccordionItem>
										</Accordion>
									</CardContent>
								</Card>
							</TabsContent> */}
						</Tabs>

						<DialogFooter className="p-2 flex justify-between w-full">
							<Button
								type="reset"
								variant={"outline"}
								onClick={() => form.reset()}
							>
								Clean
							</Button>
							<Button type="submit">Search Claim</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
