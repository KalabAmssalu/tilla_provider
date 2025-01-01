import { Control } from "react-hook-form";

import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

import { MemberReportFormFieldNames } from "./Claim_and_Member_Report";

// Import your field names type

interface MemberInfoProps {
	ageFilterEnabled?: boolean;
	control: Control<any>;
	onDataChange: (name: MemberReportFormFieldNames, value: any) => void;
}

const MemberInformationReportForm = ({
	ageFilterEnabled,
	control,
	onDataChange,
}: MemberInfoProps) => {
	const handleFieldChange = (name: MemberReportFormFieldNames, value: any) => {
		onDataChange(name, value); // Notify the parent about the data change
	};

	return (
		<fieldset className="border rounded-md p-4 border-white">
			<legend className="text-lg font-semibold px-2">Member Information</legend>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
				<ReusableFormField
					control={control}
					name="member_id"
					type="text"
					local="claimStatusForm"
					labelKey="fields.member_id.label"
					placeholderKey="fields.member_id.placeholder"
					descriptionKey="fields.member_id.description"
					onChange={(value) => handleFieldChange("member_id", value)}
				/>
				<ReusableFormField
					control={control}
					name="member_first_name"
					type="text"
					local="claimStatusForm"
					labelKey="fields.member_first_name.label"
					placeholderKey="fields.member_first_name.placeholder"
					descriptionKey="fields.member_first_name.description"
					onChange={(value) => handleFieldChange("member_first_name", value)}
				/>
				<ReusableFormField
					control={control}
					name="member_middle_name"
					type="text"
					local="claimStatusForm"
					labelKey="fields.member_middle_name.label"
					placeholderKey="fields.member_middle_name.placeholder"
					descriptionKey="fields.member_middle_name.description"
					onChange={(value) => handleFieldChange("member_middle_name", value)}
				/>
				<ReusableFormField
					control={control}
					name="member_last_name"
					type="text"
					local="claimStatusForm"
					labelKey="fields.member_last_name.label"
					placeholderKey="fields.member_last_name.placeholder"
					descriptionKey="fields.member_last_name.description"
					onChange={(value) => handleFieldChange("member_last_name", value)}
				/>
				<ReusableSelectField
					control={control}
					name="plan_type"
					local="claimStatusForm"
					labelKey="fields.plan_type.label"
					placeholderKey="fields.plan_type.placeholder"
					descriptionKey="fields.plan_type.description"
					options={[
						{
							label: "Basic",
							value: "basic",
						},
						{
							label: "Standard",
							value: "standard",
						},
						{
							label: "Comprehensive",
							value: "comprehensive",
						},
						{
							label: "Family",
							value: "family",
						},
					]}
					onValueChange={(value) => {
						handleFieldChange("plan_type", value);
					}}
				/>
			</div>

			<Separator className="my-4" />

			<div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-4">
				<FormField
					control={control}
					name="ageFilterEnabled"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center justify-between rounded-lg border-white border-2 p-3 shadow-sm">
							<div>
								<FormLabel>Filter by Age</FormLabel>
								<FormDescription>Enable age range filtering.</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={!!field.value}
									onCheckedChange={field.onChange}
									className={`${
										field.value ? "bg-blue-600" : "bg-gray-400"
									} relative inline-flex h-6 w-11 items-center rounded-full`}
								>
									<span className="sr-only">Enable age filter</span>
									<span
										className={`${
											field.value ? "translate-x-6" : "translate-x-1"
										} inline-block h-4 w-4 transform rounded-full bg-white transition`}
									/>
								</Switch>
							</FormControl>
						</FormItem>
					)}
				/>

				{ageFilterEnabled && (
					<FormField
						control={control}
						name="ageRange"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Age Range</FormLabel>
								<FormControl>
									<Slider
										min={0}
										max={100}
										step={1}
										value={
											Array.isArray(field.value) && field.value.length === 2
												? field.value
												: [0, 100]
										}
										onValueChange={field.onChange}
										className="w-full"
									/>
								</FormControl>
								<FormDescription>
									{Array.isArray(field.value) &&
									field.value[0] !== undefined &&
									field.value[1] !== undefined
										? `Selected range: ${field.value[0]} - ${field.value[1]} years`
										: "No age range selected"}
								</FormDescription>
							</FormItem>
						)}
					/>
				)}
			</div>
		</fieldset>
	);
};

export default MemberInformationReportForm;
