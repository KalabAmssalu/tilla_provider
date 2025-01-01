import React, { useEffect, useState } from "react";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { useTranslations } from "next-intl";
import { type Control } from "react-hook-form";

import {
	useCPT,
	useICD10Ethiopia,
	useICD10WHO,
	useLonic,
} from "@/actions/Query/claim-Query/request";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface DiagnosisReportFormProps {
	onDataChange: (data: {
		category: string;
		source: DiagnosisSource;
		cpt_category: string;
		loinc_category: string;
	}) => void;
	control: Control<any>;
}
type DiagnosisSource = "WHO" | "ETHIOPIA";

const DiagnosisReport: React.FC<DiagnosisReportFormProps> = ({
	onDataChange,
	control,
}) => {
	const t = useTranslations("claimForm");
	const [diagnosisSource, setDiagnosisSource] =
		useState<DiagnosisSource>("WHO");
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [categories, setCategories] = useState<Array<string>>([]);
	const [cptCategories, setCPTCategories] = useState<Array<string>>([]);
	const [loincCategories, setLOINCCategories] = useState<Array<string>>([]);
	const [selectedCPTCategory, setSelectedCPTCategory] = useState<string>("");
	const [selectedLOINCCategory, setSelectedLOINCCategory] =
		useState<string>("");

	const handleDiagnosisSourceChange = (value: DiagnosisSource) => {
		setDiagnosisSource(value);
	};

	const { data: diagnosisCodeDataWHO } = useICD10WHO(diagnosisSource);

	const { data: diagnosisCodeDataEthiopia } = useICD10Ethiopia(diagnosisSource);

	useEffect(() => {
		if (diagnosisSource === "WHO" && diagnosisCodeDataWHO) {
			setCategories(diagnosisCodeDataWHO);
		} else if (diagnosisSource === "ETHIOPIA" && diagnosisCodeDataEthiopia) {
			setCategories(diagnosisCodeDataEthiopia);
		}
	}, [diagnosisSource, diagnosisCodeDataWHO, diagnosisCodeDataEthiopia]);

	const { data: cptData } = useCPT(true);
	const { data: lonicData } = useLonic(true);

	useEffect(() => {
		if (cptData) {
			setCPTCategories(cptData);
		}
	}, [cptData]);

	useEffect(() => {
		if (lonicData) {
			setLOINCCategories(lonicData);
		}
	}, [lonicData]);

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
		onDataChange({
			category,
			source: diagnosisSource,
			cpt_category: selectedCPTCategory,
			loinc_category: selectedLOINCCategory,
		});
	};

	const handleCPTCategoryChange = (cptCategory: string) => {
		setSelectedCPTCategory(cptCategory);
		onDataChange({
			category: selectedCategory,
			source: diagnosisSource,
			cpt_category: cptCategory,
			loinc_category: selectedLOINCCategory,
		});
	};

	const handleLoincCategoryChange = (loincCategory: string) => {
		setSelectedLOINCCategory(loincCategory);
		onDataChange({
			category: selectedCategory,
			source: diagnosisSource,
			cpt_category: selectedCPTCategory,
			loinc_category: loincCategory,
		});
	};

	return (
		<div>
			<fieldset className="border rounded-md border-white p-4 my-6">
				<legend className="text-lg font-semibold">
					Report on Diagnosis Information
				</legend>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
					<FormItem className="space-y-3">
						<FormLabel>Diagnosis Source</FormLabel>
						<FormControl>
							<RadioGroup
								onValueChange={handleDiagnosisSourceChange}
								defaultValue={diagnosisSource}
								className="flex flex-col space-y-1"
							>
								<FormItem className="flex items-center space-x-3 space-y-0">
									<FormControl>
										<RadioGroupItem value="WHO" />
									</FormControl>
									<FormLabel className="font-normal">WHO Diagnosis</FormLabel>
								</FormItem>
								<FormItem className="flex items-center space-x-3 space-y-0">
									<FormControl>
										<RadioGroupItem value="ETHIOPIA" />
									</FormControl>
									<FormLabel className="font-normal">
										Ethiopia Diagnosis
									</FormLabel>
								</FormItem>
							</RadioGroup>
						</FormControl>
					</FormItem>

					<ReusableSelectField
						control={control}
						name="diagnosis_category"
						local="claimForm"
						labelKey="fields.diagnosis_category.label"
						placeholderKey="fields.diagnosis_category.placeholder"
						options={categories}
						onValueChange={handleCategoryChange}
					/>
				</div>
				<Separator className="bg-white h-1" />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mb-4">
					<ReusableSelectField
						control={control}
						name="cpt_category"
						local="claimForm"
						labelKey="fields.cpt_category.label"
						placeholderKey="fields.cpt_category.placeholder"
						options={cptCategories}
						onValueChange={handleCPTCategoryChange}
					/>
					<ReusableSelectField
						control={control}
						name="loinc_category"
						local="claimStatusForm"
						labelKey="fields.loinc_category.label"
						placeholderKey="fields.loinc_category.placeholder"
						options={loincCategories}
						onValueChange={handleLoincCategoryChange}
					/>
				</div>
			</fieldset>
		</div>
	);
};

export default DiagnosisReport;
