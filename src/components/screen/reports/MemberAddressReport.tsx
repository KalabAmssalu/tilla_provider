import { useEffect, useMemo } from "react";

import { Control, useFormContext } from "react-hook-form";

import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import {
	getAllCountries,
	getStatesForCountry,
} from "@/constants/data/schema/getcountry";

import { MemberAddressReportFormFieldNames } from "./Claim_and_Member_Report";

interface AddressFormProps {
	control: Control<any>;
	onDataChange: (name: MemberAddressReportFormFieldNames, value: any) => void;
}

const MemberAddressReportForm = ({
	control,
	onDataChange,
}: AddressFormProps) => {
	const { getValues, setValue } = useFormContext();

	// Set initial states based on the selected country
	useEffect(() => {
		const country = getValues("country");
		if (country) {
			setValue("region", ""); // Clear the region when country changes
		}
	}, [getValues, setValue]);

	// Memoize country options to avoid recalculating on every render
	const countryOptions = useMemo(() => {
		return getAllCountries();
	}, []);

	// Handle country selection change
	const handleCountryValueChange = (value: string) => {
		setValue("country", value);
		setValue("region", ""); // Clear the region when country changes
		handleFieldChange("country", value); // Notify the parent about country change
	};

	// Handle region selection change
	const handleRegionValueChange = (value: string) => {
		setValue("region", value); // Update region value
		handleFieldChange("region", value); // Notify the parent about region change
	};

	// Handle field value change and notify the parent
	const handleFieldChange = (
		name: MemberAddressReportFormFieldNames,
		value: any
	) => {
		onDataChange(name, value); // Notify the parent about the data change
	};

	// Get states for the selected country
	const country = getValues("country");
	const subStates = useMemo(() => {
		return getStatesForCountry(country) || [];
	}, [country]);

	return (
		<fieldset className="border p-4 rounded-md border-white pb-6">
			<legend className="text-lg font-semibold">
				Geographical Information
			</legend>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Country Select Field */}
				<ReusableSelectField
					control={control}
					name="country"
					labelKey="fields.country.label"
					local="claimStatusForm"
					placeholderKey="fields.country.placeholder"
					descriptionKey="fields.country.description"
					options={countryOptions}
					onValueChange={handleCountryValueChange} // Call on country change
				/>

				{/* Street Address */}
				<ReusableFormField
					control={control}
					name="street_address"
					type="text"
					local="claimStatusForm"
					labelKey="fields.street_address.label"
					placeholderKey="fields.street_address.placeholder"
					descriptionKey="fields.street_address.description"
					onChange={(value) => handleFieldChange("street_address", value)}
				/>

				{/* Mailing Address Line 1 */}
				<ReusableFormField
					control={control}
					name="mailing_address_line1"
					type="text"
					local="claimStatusForm"
					labelKey="fields.mailing_address_line1.label"
					placeholderKey="fields.mailing_address_line1.placeholder"
					descriptionKey="fields.mailing_address_line1.description"
					onChange={(value) =>
						handleFieldChange("mailing_address_line1", value)
					}
				/>

				{/* City */}
				<ReusableFormField
					control={control}
					name="city"
					type="text"
					local="claimStatusForm"
					labelKey="fields.city.label"
					placeholderKey="fields.city.placeholder"
					descriptionKey="fields.city.description"
					onChange={(value) => handleFieldChange("city", value)}
				/>

				{/* Region Select Field */}
				<ReusableSelectField
					control={control}
					name="region"
					labelKey="fields.region.label"
					local="claimStatusForm"
					placeholderKey="fields.region.placeholder"
					descriptionKey="fields.region.description"
					options={subStates}
					onValueChange={handleRegionValueChange} // Call on region change
				/>

				{/* Zip Code */}
				<ReusableFormField
					control={control}
					name="zip_code"
					type="text"
					local="claimStatusForm"
					labelKey="fields.zip_code.label"
					placeholderKey="fields.zip_code.placeholder"
					descriptionKey="fields.zip_code.description"
					onChange={(value) => handleFieldChange("zip_code", value)}
				/>

				{/* Kifle Ketema */}
				<ReusableFormField
					control={control}
					name="kifle_ketema"
					type="text"
					local="claimStatusForm"
					labelKey="fields.kifle_ketema.label"
					placeholderKey="fields.kifle_ketema.placeholder"
					descriptionKey="fields.kifle_ketema.description"
					onChange={(value) => handleFieldChange("kifle_ketema", value)}
				/>
			</div>
		</fieldset>
	);
};

export default MemberAddressReportForm;
