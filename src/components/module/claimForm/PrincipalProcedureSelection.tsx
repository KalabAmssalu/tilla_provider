"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useVirtualizer } from "@tanstack/react-virtual";
import debounce from "lodash/debounce";
import { ChevronDownIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";

import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { principalProcedure } from "@/constants/data/principalProcedure";
import { cn } from "@/lib/utils";

interface CategoryDescriptionFormProps {
	onDataChange: (data: {
		category: string;
		description: string;
		code: string;
	}) => void;
}

const PrincipalProcedureSelection: React.FC<CategoryDescriptionFormProps> = ({
	onDataChange,
}) => {
	const { control, setValue } = useForm();
	const t = useTranslations("claimForm");

	const [categories, setCategories] = useState<Array<string>>([]);
	const [descriptions, setDescriptions] = useState<
		Array<{ Description: string; Codes: string }>
	>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [selectedDescription, setSelectedDescription] = useState<string>("");
	const [selectedList, setSelectedList] = useState<
		Array<{ Codes: string; Description: string }>
	>([]);
	const [code, setCode] = useState<string>("");
	const [searchTerm, setSearchTerm] = useState("");
	const [unhiddenDescription, setUnhiddenDescription] = useState(true);
	// Function to get descriptions and codes by category
	const getDescriptionsAndCodesByCategory = (categoryName: string) => {
		return principalProcedure
			.filter((procedure) => procedure.Category === categoryName)
			.map((procedure) => ({
				Description: procedure.Description,
				Codes: procedure.Codes,
			}));
	};

	// Memoized filtered descriptions based on search term
	const filteredDescriptions = useMemo(() => {
		if (!descriptions.length) return [];
		return descriptions.filter((desc) =>
			desc.Description.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [descriptions, searchTerm]);

	const debouncedSearch = useCallback(
		debounce((term: string) => {
			setSearchTerm(term);
		}, 300),
		[]
	);

	useEffect(() => {
		const uniqueCategories = Array.from(
			new Set(principalProcedure.map((procedure) => procedure.Category))
		);
		setCategories(uniqueCategories);
	}, []);

	useEffect(() => {
		if (selectedCategory) {
			setUnhiddenDescription(true);
			const descriptionsAndCodes =
				getDescriptionsAndCodesByCategory(selectedCategory);
			setDescriptions(descriptionsAndCodes);
			setSelectedList(descriptionsAndCodes);
			setSearchTerm(""); // Reset search term when category changes
		}
	}, [selectedCategory]);

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
		setDescriptions([]);
		setCode("");
		setValue("description", "");
		onDataChange({ category, description: "", code: "" });
	};

	const handleDescriptionChange = (description: string) => {
		setSelectedDescription(description);

		const selectedRecord = selectedList.find(
			(record) => record.Description === description
		);

		if (selectedRecord) {
			setCode(selectedRecord.Codes);
			onDataChange({
				category: selectedCategory,
				description,
				code: selectedRecord.Codes,
			});
		} else {
			setCode("");
		}
		setUnhiddenDescription(false);
	};

	const VirtualizedSelect = () => {
		const parentRef = React.useRef<HTMLDivElement>(null);

		const rowVirtualizer = useVirtualizer({
			count: filteredDescriptions.length,
			getScrollElement: () => parentRef.current,
			estimateSize: () => 35,
			overscan: 5,
		});

		return (
			<FormItem>
				<FormLabel>
					{t("fields.principal_procedure_description.label")}
				</FormLabel>
				<FormControl>
					<div className="relative">
						<Controller
							control={control}
							name="diagnosis_description"
							render={({ field }) => (
								<div>
									<Input
										{...field}
										type="text"
										placeholder={t(
											"fields.principal_procedure_description.placeholder"
										)}
										onChange={(e) => {
											field.onChange(e.target.value);
											debouncedSearch(e.target.value);
											setUnhiddenDescription(false);
										}}
										value={selectedDescription} // Use selectedDescription here
										className="mb-2"
									/>
									{unhiddenDescription ? (
										<div
											ref={parentRef}
											className="h-[200px] overflow-auto border rounded-md bg-background"
										>
											<div
												style={{
													height: `${rowVirtualizer.getTotalSize()}px`,
													width: "100%",
													position: "relative",
												}}
											>
												{rowVirtualizer.getVirtualItems().map((virtualRow) => (
													<div
														key={virtualRow.index}
														className={cn(
															"absolute left-0 w-full px-4 py-2 cursor-pointer hover:bg-accent/50 transition-colors",
															selectedDescription ===
																filteredDescriptions[virtualRow.index]
																	.Description
																? "bg-primary text-white hover:text-black hover:bg-primary/50"
																: ""
														)}
														style={{
															height: `${virtualRow.size}px`,
															transform: `translateY(${virtualRow.start}px)`,
														}}
														onClick={() =>
															handleDescriptionChange(
																filteredDescriptions[virtualRow.index]
																	.Description
															)
														}
													>
														<div className="flex items-center h-full">
															<span className="text-sm leading-normal line-clamp-2">
																{
																	filteredDescriptions[virtualRow.index]
																		.Description
																}
															</span>
														</div>
													</div>
												))}
											</div>
										</div>
									) : (
										<Button
											className="absolute right-2 top-1/2 hover:bg-secondary rounded-full p-2 -translate-y-1/2 h-auto"
											size="sm"
											onClick={() => setUnhiddenDescription(true)}
											variant="ghost"
										>
											<ChevronDownIcon className="h-4 w-4" />
										</Button>
									)}
								</div>
							)}
						/>
					</div>
				</FormControl>
			</FormItem>
		);
	};

	return (
		<div className="flex flex-col gap-4">
			<fieldset className="border p-4 rounded-md bg-muted pb-6">
				<legend className="text-lg font-semibold">
					Principal Procedure Selection
				</legend>
				<div className="grid grid-cols-1 md:grid-cols-1 gap-4 pt-4">
					<ReusableSelectField
						control={control}
						name="category"
						local="claimForm"
						labelKey="fields.principal_procedure_category.label"
						placeholderKey="fields.principal_procedure_category.placeholder"
						options={categories}
						onValueChange={handleCategoryChange}
					/>
					<div>
						<VirtualizedSelect />
					</div>

					<div>
						<label
							htmlFor="code"
							className="block text-sm font-medium text-gray-700"
						>
							{t("fields.principal_procedure_code.label")}
						</label>
						<Controller
							control={control}
							name="code"
							render={({ field }) => (
								<Input
									{...field}
									id="code"
									value={code}
									readOnly
									className="cursor-not-allowed"
								/>
							)}
						/>
					</div>
				</div>
			</fieldset>
		</div>
	);
};

export default PrincipalProcedureSelection;
