"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useVirtualizer } from "@tanstack/react-virtual";
import debounce from "lodash/debounce";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";

import { useCPT, useCPTRecords } from "@/actions/Query/claim-Query/request";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CategoryDescriptionFormProps {
	onDataChange: (data: {
		category: string;
		description: string;
		code: string;
	}) => void;
}

export const isCPTRecordArray = (
	data: any
): data is Array<{ category: string; code: string; description: string }> => {
	return (
		Array.isArray(data) &&
		data.every(
			(item) => "category" in item && "code" in item && "description" in item
		)
	);
};

const CPTSelectionForm: React.FC<CategoryDescriptionFormProps> = ({
	onDataChange,
}) => {
	const { control, setValue } = useForm();
	const t = useTranslations("claimForm");

	const [categories, setCategories] = useState<Array<string>>([]);
	const [descriptions, setDescriptions] = useState<Array<string>>([]);
	const [fetchMe, setFetchMe] = useState<boolean>(false);
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [selectedDescription, setSelectedDescription] = useState<string>("");
	const [selectedList, setSelectedList] = useState<
		Array<{
			code: string;
			description: string;
		}>
	>([]);
	const [code, setCode] = useState<string>("");
	const [searchTerm, setSearchTerm] = useState("");

	const filteredDescriptions = useMemo(() => {
		if (!descriptions.length) return [];
		return descriptions.filter((desc) =>
			desc.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [descriptions, searchTerm]);

	const debouncedSearch = useCallback(
		debounce((term: string) => {
			setSearchTerm(term);
		}, 300),
		[]
	);

	const { data: cptData, isError, isLoading } = useCPT(fetchMe);
	const { data: cptRecords } = useCPTRecords(
		selectedCategory,
		!!selectedCategory
	);

	useEffect(() => {
		if (cptData) {
			setCategories(cptData);
		}
	}, [cptData]);

	useEffect(() => {
		try {
			const records = cptRecords;

			if (isCPTRecordArray(records)) {
				const chunkSize = 100;
				let currentIndex = 0;

				const processNextChunk = () => {
					const chunk = records.slice(currentIndex, currentIndex + chunkSize);
					const newDescriptions = chunk.map((record) => record.description);

					setDescriptions((prev) => [...prev, ...newDescriptions]);
					setSelectedList((prev) => [...prev, ...chunk]);

					currentIndex += chunkSize;
					if (currentIndex < records.length) {
						setTimeout(processNextChunk, 0);
					}
				};

				setDescriptions([]);
				setSelectedList([]);
				processNextChunk();
			}
		} catch (error) {
			console.error("Error processing records:", error);
		}
	}, [selectedCategory, cptRecords]);

	useEffect(() => {
		setFetchMe(true);
	}, []);

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
			(record) => record.description === description
		);

		if (selectedRecord) {
			setCode(selectedRecord.code);
			onDataChange({
				category: selectedCategory,
				description: selectedDescription,
				code: selectedRecord.code,
			});
		} else {
			setCode("");
		}
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
				<FormLabel>{t("fields.cpt_description.label")}</FormLabel>
				<FormControl>
					<div className="relative">
						<Input
							type="text"
							placeholder={t("fields.cpt_description.placeholder")}
							onChange={(e) => debouncedSearch(e.target.value)}
							className="mb-2"
						/>
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
											)
										}
									>
										<div className="flex items-center h-full">
											<span className="text-sm leading-normal line-clamp-2">
												{filteredDescriptions[virtualRow.index]}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</FormControl>
			</FormItem>
		);
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Error fetching data</p>;
	}

	return (
		<div className="flex flex-col gap-4">
			<fieldset className="border p-4 rounded-md bg-muted pb-6">
				<legend className="text-lg font-semibold">CPT Selection</legend>
				<div className="grid grid-cols-1 md:grid-cols-1 gap-4 pt-4">
					<ReusableSelectField
						control={control}
						name="category"
						local="claimForm"
						labelKey="fields.cpt_category.label"
						placeholderKey="fields.cpt_category.placeholder"
						options={categories}
						onValueChange={handleCategoryChange}
						required
					/>
					<div>
						<VirtualizedSelect />
					</div>

					<div>
						<label
							htmlFor="cpt_code"
							className="block text-sm font-medium text-gray-700"
						>
							{t("fields.cpt_code.label")}
						</label>
						<Controller
							control={control}
							name="cpt_code"
							render={({ field }) => (
								<Input
									{...field}
									id="cpt_code"
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

export default CPTSelectionForm;
