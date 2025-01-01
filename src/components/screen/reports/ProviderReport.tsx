import { Control } from "react-hook-form";

import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import { Separator } from "@/components/ui/separator";

import { ProviderReportFormFieldNames } from "./Claim_and_Member_Report";

interface providerInfoProps {
	control: Control<any>;
	onDataChange: (name: ProviderReportFormFieldNames, value: any) => void;
}

const ProviderInformationForm = ({
	control,
	onDataChange,
}: providerInfoProps) => {
	const handleFieldChange = (
		name: ProviderReportFormFieldNames,
		value: any
	) => {
		onDataChange(name, value); // Notify the parent about the data change
	};

	return (
		<fieldset className="border rounded-md p-4 border-white">
			<legend className="text-lg font-semibold px-2">
				Provider Information
			</legend>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
				<ReusableFormField
					control={control}
					name="provider_first_name"
					type="text"
					local="claimStatusForm"
					labelKey="fields.provider_first_name.label"
					placeholderKey="fields.provider_first_name.placeholder"
					descriptionKey="fields.provider_first_name.description"
					onChange={(value) => handleFieldChange("provider_first_name", value)}
				/>
				<ReusableFormField
					control={control}
					name="provider_middle_name"
					type="text"
					local="claimStatusForm"
					labelKey="fields.provider_middle_name.label"
					placeholderKey="fields.provider_middle_name.placeholder"
					descriptionKey="fields.provider_middle_name.description"
					onChange={(value) => handleFieldChange("provider_middle_name", value)}
				/>
				<ReusableFormField
					control={control}
					name="provider_last_name"
					type="text"
					local="claimStatusForm"
					labelKey="fields.provider_last_name.label"
					placeholderKey="fields.provider_last_name.placeholder"
					descriptionKey="fields.provider_last_name.description"
					onChange={(value) => handleFieldChange("provider_last_name", value)}
				/>
			</div>

			<Separator className="my-4" />

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
				<ReusableFormField
					control={control}
					name="provider_npi"
					type="text"
					local="claimStatusForm"
					labelKey="fields.provider_npi.label"
					placeholderKey="fields.provider_npi.placeholder"
					descriptionKey="fields.provider_npi.description"
					onChange={(value) => handleFieldChange("provider_npi", value)}
				/>
				<ReusableFormField
					control={control}
					name="billing_provider_npi"
					type="text"
					local="claimStatusForm"
					labelKey="fields.billingprovider_npi_id.label"
					placeholderKey="fields.billingprovider_npi_id.placeholder"
					descriptionKey="fields.billingprovider_npi_id.description"
					onChange={(value) => handleFieldChange("billing_provider_npi", value)}
				/>
			</div>

			<Separator className="my-4" />

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<ReusableFormField
					control={control}
					name="referral_provider_name"
					type="text"
					local="claimStatusForm"
					labelKey="fields.referral_provider_name.label"
					placeholderKey="fields.referral_provider_name.placeholder"
					descriptionKey="fields.referral_provider_name.description"
					onChange={(value) =>
						handleFieldChange("referral_provider_name", value)
					}
				/>
				<ReusableFormField
					control={control}
					name="referral_provider_npi"
					type="text"
					local="claimStatusForm"
					labelKey="fields.referral_provider_npi.label"
					placeholderKey="fields.referral_provider_npi.placeholder"
					descriptionKey="fields.referral_provider_npi.description"
					onChange={(value) =>
						handleFieldChange("referral_provider_npi", value)
					}
				/>
			</div>
		</fieldset>
	);
};

export default ProviderInformationForm;
