"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import StepIndicator from "./step-indicator";

interface Step {
	title: string;
	content: React.ReactNode;
}

interface FormStepperProps {
	steps: Step[];
	nextActive: boolean;
}

export default function FormStepper({ steps, nextActive }: FormStepperProps) {
	const [currentStep, setCurrentStep] = useState(0);

	const nextStep = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const prevStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	return (
		<Card className="w-full  mx-auto">
			<CardHeader>
				<CardTitle>{steps[currentStep].title}</CardTitle>
				<StepIndicator currentStep={currentStep} totalSteps={steps.length} />
			</CardHeader>
			<CardContent className="p-6">
				{steps[currentStep].content}
				<div className="mt-6 flex justify-between">
					<Button onClick={prevStep} disabled={currentStep === 0}>
						Previous
					</Button>
					<Button
						onClick={nextStep}
						disabled={
							(currentStep === 0 && !nextActive) ||
							currentStep === steps.length - 1
						}
						className={`${currentStep === steps.length - 1 ? "bg-green-500 hidden" : ""}`}
					>
						{currentStep === steps.length - 1 ? "Finish" : "Next"}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
