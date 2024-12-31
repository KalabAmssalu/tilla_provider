import React, { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";

import { useFindJSON } from "@/actions/Query/claim-Query/request";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import { Input } from "@/components/ui/input";

interface CategoryDescriptionFormProps {
	// eslint-disable-next-line no-unused-vars
	onDataChange: (data: {
		category: string;
		description: string;
		code: string;
	}) => void;
}

const API_URLS = "https://kalabamssalu.github.io/LONIC_Code/num.json";

interface DiagnosisCode {
	Categories: string;
	DESCRIPTIONS: string;
	Code: string;
}

const LONICSelectionForm: React.FC<CategoryDescriptionFormProps> = ({
	onDataChange,
}) => {
	const { control, setValue } = useForm();

	const {
		data: diagnosisCodeData,
		isError,
		isLoading,
	} = useFindJSON(API_URLS) as {
		data: DiagnosisCode[];
		isError: boolean;
		isLoading: boolean;
	};

	const [categories, setCategories] = useState<string[]>([]);
	const [descriptions, setDescriptions] = useState<string[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	// eslint-disable-next-line no-unused-vars
	const [selectedDescription, setSelectedDescription] = useState<string>("");
	const [code, setCode] = useState<string>("");

	useEffect(() => {
		if (diagnosisCodeData && Array.isArray(diagnosisCodeData)) {
			const categorySet = new Set(
				diagnosisCodeData
					.filter((item) => item.Categories) // Only include items where `Categories` is not empty or undefined
					.map((item) => item.Categories)
			);
			setCategories(Array.from(categorySet));
		}
	}, [diagnosisCodeData]);

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
		const filteredDescriptions = diagnosisCodeData
			? diagnosisCodeData
					.filter((item) => item.Categories === category)
					.map((item) => item.DESCRIPTIONS)
			: [];
		setDescriptions(filteredDescriptions);

		setValue("description", ""); // Reset the description field
		setCode(""); // Reset the code field

		onDataChange({ category, description: "", code: "" });
	};

	const handleDescriptionChange = (description: string) => {
		setSelectedDescription(description);
		const selectedItem = diagnosisCodeData?.find(
			(item) => item.DESCRIPTIONS === description
		);
		setCode(selectedItem?.Code || "");

		onDataChange({
			category: selectedCategory,
			description,
			code: selectedItem?.Code || "",
		});
	};

	// Render the form with loading and error handling
	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Error fetching data </p>;
	}

	return (
		<div className="flex flex-col gap-4">
			{/* Source Selector */}

			<fieldset className="border p-4 rounded-md bg-muted pb-6">
				<legend className="text-lg font-semibold">LONIC Code</legend>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 ">
					{/* Category Dropdown */}
					<ReusableSelectField
						control={control}
						name="category"
						labelKey="Category"
						options={categories}
						onValueChange={handleCategoryChange}
						required
					/>

					{/* Description Dropdown */}
					<ReusableSelectField
						control={control}
						name="description"
						labelKey="Description"
						options={descriptions}
						onValueChange={handleDescriptionChange}
						required
					/>

					{/* Code Input Field */}
					<div className="space-y-2">
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

export default LONICSelectionForm;
