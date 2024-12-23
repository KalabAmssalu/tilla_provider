"use client";

import React, { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";

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

type DiagnosisSource = "WHO" | "ETHIOPIA";

interface CategoryDescriptionFormProps {
	onDataChange: (data: {
		category: string;
		description: string;
		code: string;
		date: string;
	}) => void;
}

const DiagnosisSelectionForm: React.FC<CategoryDescriptionFormProps> = ({
	onDataChange,
}) => {
	const { control, setValue, watch } = useForm();
	const diagnosisDate = watch("diagnosis_date");

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

	// Use useQuery to fetch WHO and Ethiopia diagnosis data
	const {
		data: diagnosisCodeDataWHO,
		isError: isErrorWHO,
		isLoading: isLoadingWHO,
	} = useICD10WHO();
	const {
		data: diagnosisCodeDataEthiopia,
		isError: isErrorEthiopia,
		isLoading: isLoadingEthiopia,
	} = useICD10Ethiopia();

	// Use the hooks at component level
	const { data: whoRecords } = useICD10WHORecords(selectedCategory);
	const { data: ethiopiaRecords } = useICD10EthiopiaRecords(selectedCategory);

	// Fetch categories based on diagnosis source
	useEffect(() => {
		if (diagnosisSource === "WHO" && diagnosisCodeDataWHO) {
			setCategories(diagnosisCodeDataWHO);
		} else if (diagnosisSource === "ETHIOPIA" && diagnosisCodeDataEthiopia) {
			setCategories(diagnosisCodeDataEthiopia);
		}
	}, [diagnosisSource, diagnosisCodeDataWHO, diagnosisCodeDataEthiopia]);

	// Fetch records based on selected category and diagnosis source
	useEffect(() => {
		try {
			const records = diagnosisSource === "WHO" ? whoRecords : ethiopiaRecords;

			if (isICD10RecordArray(records)) {
				const descriptions = records.map((record) => record.description);
				setSelectedList(records);
				setDescriptions(descriptions);
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
		onDataChange({ category, description: "", code: "", date: diagnosisDate });
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
				description,
				code: selectedRecord.code,
				date: diagnosisDate,
			});
		} else {
			setCode("");
		}
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
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
					<ReusableDatePickerField
						control={control}
						name="diagnosis_date"
						local="claimForm"
						labelKey="fields.diagnosis_date.label"
						placeholderKey="fields.diagnosis_date.placeholder"
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
				<legend className="text-lg font-semibold">Diagnosis ICD-11</legend>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
					<ReusableSelectField
						control={control}
						name="category"
						labelKey="Category"
						options={categories}
						onValueChange={handleCategoryChange}
						required
					/>
					<ReusableSelectField
						control={control}
						name="description"
						labelKey="Description"
						options={descriptions}
						onValueChange={handleDescriptionChange}
						required
					/>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Code
						</label>
						<Controller
							control={control}
							name="code"
							render={({ field }) => (
								<Input
									{...field}
									value={code}
									readOnly
									className="cursor-not-allowed "
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
