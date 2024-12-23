import { Card, CardContent } from "@/components/ui/card";
import { type memberType } from "@/types/member/memeberType";

type BillingCardProps = {
	selectedMember: memberType;
	serviceCharge: number;
	AdditionalCharge: number;
	totalCharge: number;
	paymentWithDiscount: number;
	tillaPaymentDuty: number;
	amountToBeClaimed: number;
	discountAve: number;
	tillaDuty: number;
};

const BillingCard = ({
	selectedMember,
	serviceCharge,
	AdditionalCharge,
	totalCharge,
	paymentWithDiscount,
	tillaPaymentDuty,
	amountToBeClaimed,
	discountAve,
	tillaDuty,
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
					<div className="flex justify-between">
						<span className="text-gray-600">Total Charge</span>
						<span className="font-medium text-sm text-gray-800">
							{totalCharge.toFixed(2)} ETB
						</span>
					</div>

					<div className="flex justify-between border-t pt-2 border-gray-200">
						<span className="font-medium text-sm text-gray-700">
							Provider Discount ({discountAve}%)
						</span>
						<span className="font-medium text-sm text-emerald-600">
							{paymentWithDiscount.toFixed(2)} ETB
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

					<div className="flex flex-col justify-between border-t pt-2 border-gray-200">
						<span className="font-medium text-sm text-gray-700">
							Member&apos;s Responsibility (
							{`${selectedMember.member_payment_duty}%`})
						</span>
						<span className="font-medium text-lg text-end pt-2 text-emerald-600">
							= {amountToBeClaimed.toFixed(2)} ETB
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default BillingCard;
