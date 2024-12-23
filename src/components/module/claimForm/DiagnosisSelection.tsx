"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useVirtualizer } from "@tanstack/react-virtual";
import debounce from "lodash/debounce";
import { useTranslations } from "next-intl";
import {
	type Control,
	Controller,
	type UseFormSetValue,
	useWatch,
} from "react-hook-form";

import {
	useICD10Ethiopia,
	useICD10EthiopiaRecords,
	useICD10WHO,
	useICD10WHORecords,
} from "@/actions/Query/claim-Query/request";
import { ReusableDatePickerField } from "@/components/shared/Form/ReusableDateField";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type DiagnosisSource = "WHO" | "ETHIOPIA";

interface CategoryDescriptionFormProps {
	onDataChange: (data: {
		category: string;
		source: DiagnosisSource;
		description: string;
		code: string;
		date: string;
	}) => void;
	control: Control<any>;
	setValue: UseFormSetValue<any>;
}

const DiagnosisSelectionForm: React.FC<CategoryDescriptionFormProps> = ({
	onDataChange,
	control,
	setValue,
}) => {
	const diagnosisDate = useWatch({
		control,
		name: "diagnosis_date",
	});
	const t = useTranslations("claimForm");

	const [diagnosisSource, setDiagnosisSource] =
		useState<DiagnosisSource>("WHO");
	const [categories, setCategories] = useState<Array<string>>([]);
	const [descriptions, setDescriptions] = useState<Array<string>>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [selectedDescription, setSelectedDescription] = useState<string>("");
	const [selectedList, setSelectedList] = useState<
		Array<{
			code: string;
			description: string;
		}>
	>([]);
	const [code, setCode] = useState<string>("");

	// Add search state
	const [searchTerm, setSearchTerm] = useState("");

	// Memoize filtered descriptions
	const filteredDescriptions = useMemo(() => {
		if (!descriptions.length) return [];
		return descriptions.filter((desc) =>
			desc.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [descriptions, searchTerm]);

	// Debounced search handler
	const debouncedSearch = useCallback(
		debounce((term: string) => {
			setSearchTerm(term);
		}, 300),
		[]
	);

	// Modified query hooks with enabled option
	const {
		data: diagnosisCodeDataWHO,
		isError: isErrorWHO,
		isLoading: isLoadingWHO,
	} = useICD10WHO(diagnosisSource);

	const {
		data: diagnosisCodeDataEthiopia,
		isError: isErrorEthiopia,
		isLoading: isLoadingEthiopia,
	} = useICD10Ethiopia(diagnosisSource);

	// Modify the records queries to only run when there's a selected category
	const { data: whoRecords } = useICD10WHORecords(
		selectedCategory,
		!!selectedCategory && diagnosisSource === "WHO"
	);

	const { data: ethiopiaRecords } = useICD10EthiopiaRecords(
		selectedCategory,
		!!selectedCategory && diagnosisSource === "ETHIOPIA"
	);

	// Fetch categories based on diagnosis source
	useEffect(() => {
		if (diagnosisSource === "WHO" && diagnosisCodeDataWHO) {
			setCategories(diagnosisCodeDataWHO);
		} else if (diagnosisSource === "ETHIOPIA" && diagnosisCodeDataEthiopia) {
			setCategories(diagnosisCodeDataEthiopia);
		}
	}, [diagnosisSource, diagnosisCodeDataWHO, diagnosisCodeDataEthiopia]);

	// Modify the records effect to handle data in chunks
	useEffect(() => {
		try {
			const records = diagnosisSource === "WHO" ? whoRecords : ethiopiaRecords;

			if (isICD10RecordArray(records)) {
				// Process data in chunks to prevent UI blocking
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

				// Reset states before processing new data
				setDescriptions([]);
				setSelectedList([]);
				processNextChunk();
			}
		} catch (error) {
			console.error("Error processing records:", error);
		}
	}, [selectedCategory, diagnosisSource, whoRecords, ethiopiaRecords]);

	const handleDiagnosisSourceChange = (value: DiagnosisSource) => {
		setDiagnosisSource(value);
		setCategories([]);
		setDescriptions([]);
		setSelectedCategory("");
		setSelectedDescription("");
		setCode("");
	};

	const isICD10RecordArray = (
		data: any
	): data is Array<{ category: string; code: string; description: string }> => {
		return (
			Array.isArray(data) &&
			data.every(
				(item) => "category" in item && "code" in item && "description" in item
			)
		);
	};

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
		setDescriptions([]);
		setCode("");
		setValue("description", "");
		onDataChange({
			category,
			source: diagnosisSource,
			description: "",
			code: "",
			date: diagnosisDate,
		});
	};

	// Add memoization for handlers
	const handleDescriptionChange = useCallback(
		(description: string) => {
			setSelectedDescription(description);
			const selectedRecord = selectedList.find(
				(record) => record.description === description
			);

			if (selectedRecord) {
				setCode(selectedRecord.code);
				onDataChange({
					category: selectedCategory,
					source: diagnosisSource,
					description: selectedDescription,
					code: selectedRecord.code,
					date: diagnosisDate,
				});
			} else {
				setCode("");
			}
		},
		[
			selectedList,
			selectedCategory,
			diagnosisSource,
			selectedDescription,
			diagnosisDate,
			onDataChange,
		]
	);

	// Optimize the search input handler with debouncing
	const handleSearchChange = useCallback(
		debounce((value: string, onChange: (value: string) => void) => {
			onChange(value);
			debouncedSearch(value);
		}, 150),
		[debouncedSearch]
	);

	// Replace the ReusableSelectField for descriptions with a virtualized select
	const VirtualizedSelect = () => {
		const parentRef = React.useRef<HTMLDivElement>(null);

		const rowVirtualizer = useVirtualizer({
			count: filteredDescriptions.length,
			getScrollElement: () => parentRef.current,
			estimateSize: () => 35, // estimated height of each row
			overscan: 5,
		});

		return (
			<FormItem>
				<FormLabel htmlFor="diagnosis_description">
					{t("fields.diagnosis_description.label")}
				</FormLabel>
				<FormControl>
					<Controller
						control={control}
						name="diagnosis_description"
						render={({ field }) => (
							<div className="relative">
								<Input
									id="diagnosis_description"
									type="text"
									placeholder={t("fields.diagnosis_description.placeholder")}
									onChange={(e) => {
										field.onChange(e.target.value);
										debouncedSearch(e.target.value);
									}}
									value={field.value}
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
						)}
					/>
				</FormControl>
			</FormItem>
		);
	};

	if (isLoadingWHO || isLoadingEthiopia) {
		return <p>Loading...</p>;
	}

	if (isErrorWHO || isErrorEthiopia) {
		return <p>Error fetching data</p>;
	}

	return (
		<div className="flex flex-col gap-4">
			<fieldset className="border p-4 rounded-md bg-muted pb-6">
				<legend className="text-lg font-semibold">Diagnosis Information</legend>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 ">
					<ReusableDatePickerField
						control={control}
						name="diagnosis_date"
						local="claimForm"
						labelKey="fields.diagnosis_date.label"
						placeholderKey="fields.diagnosis_date.placeholder"
						descriptionKey="fields.diagnosis_date.description"
						buttonClassName="custom-button-class"
						required
					/>

					<FormItem>
						<FormLabel>Diagnosis Source</FormLabel>
						<FormControl>
							<Select
								value={diagnosisSource}
								onValueChange={handleDiagnosisSourceChange}
							>
								<SelectTrigger className="bg-background">
									<SelectValue placeholder="Select Diagnosis Source" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="WHO">WHO Diagnosis</SelectItem>
									<SelectItem value="ETHIOPIA">Ethiopia Diagnosis</SelectItem>
								</SelectContent>
							</Select>
						</FormControl>
					</FormItem>
				</div>
			</fieldset>
			<fieldset className="border p-4 rounded-md bg-muted pb-6">
				<legend className="text-lg font-semibold">
					{diagnosisSource === "WHO"
						? "WHO Diagnosis ICD-10"
						: "Ethiopia Diagnosis ICD-11"}
				</legend>
				<div className="grid grid-cols-1 md:grid-cols-1 gap-4 pt-4">
					<ReusableSelectField
						control={control}
						name="diagnosis_category"
						local="claimForm"
						labelKey="fields.diagnosis_category.label"
						placeholderKey="fields.diagnosis_category.placeholder"
						options={categories}
						onValueChange={handleCategoryChange}
						required
					/>
					<div>
						<VirtualizedSelect />
					</div>

					<div>
						<label
							htmlFor="diagnosis_code"
							className="block text-sm font-medium text-gray-700"
						>
							{t("fields.diagnosis_code.label")}
						</label>
						<Controller
							control={control}
							name="diagnosis_code"
							render={({ field }) => (
								<Input
									{...field}
									id="diagnosis_code"
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

export default DiagnosisSelectionForm;
