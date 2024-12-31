// "use client";

// import { useEffect, useState } from "react";

// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";

// // Define types for available fields and props
// interface Field {
// 	id: string;
// 	label: string;
// }

// interface FieldSelectorProps {
// 	onFieldsChange: (fields: string[]) => void;
// }

// const availableFields: Field[] = [
// 	{ id: "id", label: "ID" },
// 	{ id: "name", label: "Name" },
// 	{ id: "date", label: "Date" },
// 	{ id: "amount", label: "Amount" },
// 	{ id: "status", label: "Status" },
// ];

// export default function FieldSelector({ onFieldsChange }: FieldSelectorProps) {
// 	const [selectedFields, setSelectedFields] = useState<string[]>(
// 		availableFields.map((field) => field.id)
// 	);

// 	useEffect(() => {
// 		onFieldsChange(selectedFields);
// 	}, [selectedFields, onFieldsChange]);

// 	const handleFieldChange = (fieldId: string) => {
// 		setSelectedFields((prev) =>
// 			prev.includes(fieldId)
// 				? prev.filter((id) => id !== fieldId)
// 				: [...prev, fieldId]
// 		);
// 	};

// 	return (
// 		<div className="space-y-2">
// 			<h2 className="text-lg font-semibold">Select Fields</h2>
// 			<div className="flex flex-wrap gap-4">
// 				{availableFields.map((field) => (
// 					<div key={field.id} className="flex items-center space-x-2">
// 						<Checkbox
// 							id={field.id}
// 							checked={selectedFields.includes(field.id)}
// 							onCheckedChange={() => handleFieldChange(field.id)}
// 						/>
// 						<Label htmlFor={field.id}>{field.label}</Label>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// }
