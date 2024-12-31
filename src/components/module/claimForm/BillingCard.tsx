import { Card, CardContent } from "@/components/ui/card";

type BillingCardProps = {
	memberDuty: number;
	providerDuty: number;
	tillaDuty: number;
	discountAgree: number;
	serviceCharge: number;
	AdditionalCharge: number;
	totalCharge: number;
	tillaPaymentDuty: number;
	amountToBeClaimed: number;
	isDeductable: boolean;
};

const BillingCard = ({
	memberDuty,
	providerDuty,
	discountAgree,
	tillaDuty,
	serviceCharge,
	AdditionalCharge,
	totalCharge,
	tillaPaymentDuty,
	amountToBeClaimed,
	isDeductable,
}: BillingCardProps) => {
	return (
		<Card className="sticky top-28 shadow z-10 rounded-lg bg-white">
			<CardContent className="p-4">
				<h3 className="mb-4 text-lg font-semibold text-primary uppercase text-center">
					Payment Summary
				</h3>
				<div className="space-y-2">
					<div className="flex justify-between">
						<span className="text-gray-600">Service Charge</span>
						<span className="font-medium text-sm text-gray-800">
							{serviceCharge.toFixed(2)} ETB
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Additional Charge</span>
						<span className="font-medium text-sm text-gray-800">
							{AdditionalCharge.toFixed(2)} ETB
						</span>
					</div>

					<div className="flex justify-between border-b pb-2 border-gray-200">
						<span className="font-medium text-sm text-gray-700">
							Provider Discount ({discountAgree}%)
						</span>
						<span className="font-medium text-sm text-emerald-600">
							{providerDuty.toFixed(2)} ETB
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Total Charge</span>
						<span className="font-medium text-xl font-bold text-gray-800">
							{totalCharge.toFixed(2)} ETB
						</span>
					</div>

					<div className="flex justify-between border-t pt-2 border-gray-200">
						<span className="font-medium text-sm text-gray-700">
							Tilla&apos;s Responsibility ({tillaDuty}%)
						</span>
						<span className="font-medium text-sm text-emerald-600">
							{tillaPaymentDuty.toFixed(2)} ETB
						</span>
					</div>

					<div className="flex flex-col justify-between border items-center text-center py-2 bg-green-200/30 border-gray-200">
						<span className="font-medium text-sm text-gray-700">
							Member&apos;s Responsibility
						</span>
						<span>({`${memberDuty}%`})</span>
						<span className="font-medium text-xl pt-2 text-emerald-600">
							{amountToBeClaimed.toFixed(2)} ETB
						</span>
						{amountToBeClaimed > 0 && (
							<span className="text-xs text-gray-600">
								Please ensure that the member pays{" "}
								{amountToBeClaimed.toFixed(2)} ETB.
							</span>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default BillingCard;
