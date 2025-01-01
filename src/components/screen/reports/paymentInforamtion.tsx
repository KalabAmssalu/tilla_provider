import { Control } from "react-hook-form";

import { ReusableDatePickerField } from "@/components/shared/Form/ReusableDateField";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
// Ensure this exists
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

import { PaymentReportFormFieldNames } from "./PaymentReport";

interface PaymentInfoProps {
	paymentFilterEnabled?: boolean;
	control: Control<any>;
	onDataChange: (name: PaymentReportFormFieldNames, value: any) => void;
}

const PaymentInformationReportForm = ({
	paymentFilterEnabled,
	control,
	onDataChange,
}: PaymentInfoProps) => {
	const handleFieldChange = (name: PaymentReportFormFieldNames, value: any) => {
		onDataChange(name, value);
	};

	return (
		<fieldset className="border rounded-md p-4 border-white">
			<legend className="text-lg font-semibold px-2">Member Information</legend>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
				<ReusableSelectField
					control={control}
					name="payment_status"
					local="claimStatusForm"
					labelKey="fields.payment_status.label"
					placeholderKey="fields.payment_status.placeholder"
					descriptionKey="fields.payment_status.description"
					options={[
						{ label: "Pending", value: "pending" },
						{ label: "Disputing", value: "disputing" },
						{ label: "Denied", value: "denied" },
						{ label: "Paid", value: "paid" },
					]}
					onValueChange={(value) => {
						handleFieldChange("payment_status", value);
					}}
				/>
				<ReusableDatePickerField
					control={control}
					name="payment_date"
					labelKey="fields.payment_date.label"
					placeholderKey="fields.payment_date.placeholder"
					descriptionKey="fields.payment_date.description"
					buttonClassName="custom-button-class"
					local="claimStatusForm"
				/>
				<ReusableSelectField
					control={control}
					name="denied_reason"
					local="claimStatusForm"
					labelKey="fields.denied_reason.label"
					placeholderKey="fields.denied_reason.placeholder"
					descriptionKey="fields.denied_reason.description"
					options={[
						{ label: "Reason 1", value: "reason1" },
						{ label: "Reason 2", value: "reason2" },
						{ label: "Reason 3", value: "reason3" },
					]}
					onValueChange={(value) => {
						handleFieldChange("denied_reason", value);
					}}
				/>
			</div>

			<Separator className="my-4" />

			<div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-4">
				<FormField
					control={control}
					name="paymentFilterEnabled"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center justify-between rounded-lg border-white border-2 p-3 shadow-sm">
							<div>
								<FormLabel>Filter by payment</FormLabel>
								<FormDescription>
									Enable payment range filtering.
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={!!field.value}
									onCheckedChange={field.onChange}
									className={`${
										field.value ? "bg-blue-600" : "bg-gray-400"
									} relative inline-flex h-6 w-11 items-center rounded-full`}
								>
									<span className="sr-only">Enable Payment filter</span>
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

				{paymentFilterEnabled && (
					<FormField
						control={control}
						name="amountRange"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Payment Range</FormLabel>
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
										onValueChange={(value) => {
											field.onChange(value); // Update the field value in the form
											handleFieldChange("amountRange", value); // Notify parent about the change
										}}
										className="w-full"
									/>
								</FormControl>
								<FormDescription>
									{Array.isArray(field.value) &&
									field.value[0] !== undefined &&
									field.value[1] !== undefined
										? `Selected range: ${field.value[0]} - ${field.value[1]}`
										: "No payment range selected"}
								</FormDescription>
							</FormItem>
						)}
					/>
				)}
			</div>
		</fieldset>
	);
};

export default PaymentInformationReportForm;
