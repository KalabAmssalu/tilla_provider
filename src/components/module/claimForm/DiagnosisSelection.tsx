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

	// Use useQuery to fetch records for WHO and Ethiopia
	const {
		data: diagnosisCodeDataWHORecords = [],
		isError: isErrorWHORecords,
		isLoading: isLoadingWHORecords,
	} = useICD10WHORecords(selectedCategory);
	const {
		data: diagnosisCodeDataEthiopiaRecords = [],
		isError: isErrorEthiopiaRecord,
		isLoading: isLoadingEthiopiaRecords,
	} = useICD10EthiopiaRecords(selectedCategory);

	useEffect(() => {
		if (diagnosisSource === "WHO" && diagnosisCodeDataWHO) {
			setCategories(diagnosisCodeDataWHO);
		} else if (diagnosisSource === "ETHIOPIA" && diagnosisCodeDataEthiopia) {
			setCategories(diagnosisCodeDataEthiopia);
		}
	}, [diagnosisSource, diagnosisCodeDataWHO, diagnosisCodeDataEthiopia]);

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

	const handleCategoryChange = async (category: string) => {
		setSelectedCategory(category);
		setDescriptions([]);
		setCode("");
		setValue("description", "");
		console.log("category:", category);

		try {
			if (diagnosisSource === "WHO" && diagnosisCodeDataWHORecords) {
				if (
					diagnosisCodeDataWHORecords &&
					isICD10RecordArray(diagnosisCodeDataWHORecords)
				) {
					console.log("WHO data:", diagnosisCodeDataWHORecords);
					const descriptions = diagnosisCodeDataWHORecords.map(
						(record) => record.description
					);
					setDescriptions(descriptions);
				} else {
					console.error(
						"Unexpected WHO data structure:",
						diagnosisCodeDataWHORecords
					);
				}
			} else if (
				diagnosisSource === "ETHIOPIA" &&
				diagnosisCodeDataEthiopiaRecords
			) {
				if (
					diagnosisCodeDataEthiopiaRecords &&
					isICD10RecordArray(diagnosisCodeDataEthiopiaRecords)
				) {
					const descriptions = diagnosisCodeDataEthiopiaRecords.map(
						(record) => record.description
					);
					setDescriptions(descriptions);
				} else {
					console.error(
						"Unexpected Ethiopia data structure:",
						diagnosisCodeDataEthiopiaRecords
					);
				}
			}
		} catch (error) {
			console.error("Error in handleCategoryChange:", error);
		}

		onDataChange({ category, description: "", code: "", date: diagnosisDate });
	};

	const handleDescriptionChange = (description: string) => {
		setSelectedDescription(description);

		// Safely check if diagnosisCodeDataWHORecords or diagnosisCodeDataEthiopiaRecords is defined and contains data
		const selectedRecord =
			(diagnosisSource === "WHO" &&
				diagnosisCodeDataWHORecords?.find(
					(record) => record.description === description
				)) ||
			(diagnosisSource === "ETHIOPIA" &&
				diagnosisCodeDataEthiopiaRecords?.find(
					(record) => record.description === description
				));

		if (selectedRecord) {
			setCode(selectedRecord.code);
			onDataChange({
				category: selectedCategory,
				description,
				code: selectedRecord?.code || "",
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
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
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
									className="cursor-not-allowed bg-gray-100"
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
