interface StepIndicatorProps {
	currentStep: number;
	totalSteps: number;
}

export default function StepIndicator({
	currentStep,
	totalSteps,
}: StepIndicatorProps) {
	return (
		<div className="flex items-center space-x-2 mt-2">
			{Array.from({ length: totalSteps }).map((_, index) => (
				<div
					key={index}
					className={`h-2 w-full rounded-full ${
						index <= currentStep ? "bg-primary" : "bg-gray-200"
					}`}
				/>
			))}
		</div>
	);
}
