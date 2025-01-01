"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { useSetPriorAuth } from "@/actions/Query/referal_Query/request";

// Define Zod schema for form validation
const formSchema = z.object({
	date_of_service: z.string().min(1, "Date of Service is required"),
	requested_service: z.string().min(1, "Requested Service is required"),
	reason_for_request: z.string().min(1, "Reason for Request is required"),
	additional_note: z.string().optional(),
	cpt_code: z.string().min(1, "CPT Code is required"),
	cpt_category: z.string().min(1, "CPT Category is required"),
	cpt_description: z.string().min(1, "CPT Description is required"),
	diagnosis_date: z.string().min(1, "Diagnosis Date is required"),
	diagnosis_source: z.string().min(1, "Diagnosis Source is required"),
	diagnosis_category: z.string().min(1, "Diagnosis Category is required"),
	diagnosis_description: z.string().min(1, "Diagnosis Description is required"),
	diagnosis_code: z.string().min(1, "Diagnosis Code is required"),
});

type FormData = z.infer<typeof formSchema>;

const SimpleForm: React.FC = () => {
	// Use the Zod schema with React Hook Form
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema), // Use Zod resolver for validation
		defaultValues: {
			date_of_service: "",
			requested_service: "",
			reason_for_request: "",
			additional_note: "",
			cpt_code: "",
			cpt_category: "",
			cpt_description: "",
			diagnosis_date: "",
			diagnosis_source: "",
			diagnosis_category: "",
			diagnosis_description: "",
			diagnosis_code: "",
		},
	});
	const { mutate: onSubmitPriorAuth } = useSetPriorAuth();
	const onSubmit: SubmitHandler<FormData> = (data) => {
		console.log(data);
		const formData = new FormData();
		try {
			const savedData = {
				...data,
				member: "3",
			};
			Object.entries(savedData).forEach(([key, value]) => {
				if (value !== null && value !== undefined) {
					formData.append(key, value.toString());
				}
			});

			// Append file arrays
			// const appendFiles = (files: File[], fieldName: string) => {
			// 	files.forEach((file) => {
			// 		formData.append(fieldName, file);
			// 	});
			// };
			// appendFiles(supporting_doc1, "supporting_doc1");
			// appendFiles(supporting_doc2, "supporting_doc2");

			onSubmitPriorAuth(formData);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div>
				<label htmlFor="date_of_service" className="block">
					Date of Service
				</label>
				<Controller
					name="date_of_service"
					control={control}
					render={({ field }) => (
						<input type="date" {...field} className="input" />
					)}
				/>
				{errors.date_of_service && (
					<p className="text-red-500">{errors.date_of_service.message}</p>
				)}
			</div>
			<div>
				<label htmlFor="requested_service" className="block">
					Requested Service
				</label>
				<Controller
					name="requested_service"
					control={control}
					render={({ field }) => (
						<input type="text" {...field} className="input" />
					)}
				/>
				{errors.requested_service && (
					<p className="text-red-500">{errors.requested_service.message}</p>
				)}
			</div>
			<div>
				<label htmlFor="reason_for_request" className="block">
					Reason for Request
				</label>
				<Controller
					name="reason_for_request"
					control={control}
					render={({ field }) => (
						<input type="text" {...field} className="input" />
					)}
				/>
				{errors.reason_for_request && (
					<p className="text-red-500">{errors.reason_for_request.message}</p>
				)}
			</div>
			<div>
				<label htmlFor="additional_note" className="block">
					Additional Note
				</label>
				<Controller
					name="additional_note"
					control={control}
					render={({ field }) => <textarea {...field} className="input" />}
				/>
				{errors.additional_note && (
					<p className="text-red-500">{errors.additional_note.message}</p>
				)}
			</div>
			<div>
				<label htmlFor="cpt_code" className="block">
					CPT Code
				</label>
				<Controller
					name="cpt_code"
					control={control}
					render={({ field }) => (
						<input type="text" {...field} className="input" />
					)}
				/>
				{errors.cpt_code && (
					<p className="text-red-500">{errors.cpt_code.message}</p>
				)}
			</div>
			<div>
				<label htmlFor="cpt_category" className="block">
					CPT Category
				</label>
				<Controller
					name="cpt_category"
					control={control}
					render={({ field }) => (
						<input type="text" {...field} className="input" />
					)}
				/>
				{errors.cpt_category && (
					<p className="text-red-500">{errors.cpt_category.message}</p>
				)}
			</div>
			<div>
				<label htmlFor="cpt_description" className="block">
					CPT Description
				</label>
				<Controller
					name="cpt_description"
					control={control}
					render={({ field }) => (
						<input type="text" {...field} className="input" />
					)}
				/>
				{errors.cpt_description && (
					<p className="text-red-500">{errors.cpt_description.message}</p>
				)}
			</div>
			<div>
				<label htmlFor="diagnosis_date" className="block">
					Diagnosis Date
				</label>
				<Controller
					name="diagnosis_date"
					control={control}
					render={({ field }) => (
						<input type="date" {...field} className="input" />
					)}
				/>
				{errors.diagnosis_date && (
					<p className="text-red-500">{errors.diagnosis_date.message}</p>
				)}
			</div>
			<div>
				<label htmlFor="diagnosis_source" className="block">
					Diagnosis Source
				</label>
				<Controller
					name="diagnosis_source"
					control={control}
					render={({ field }) => (
						<input type="text" {...field} className="input" />
					)}
				/>
				{errors.diagnosis_source && (
					<p className="text-red-500">{errors.diagnosis_source.message}</p>
				)}
			</div>
			<div>
				<label htmlFor="diagnosis_category" className="block">
					Diagnosis Category
				</label>
				<Controller
					name="diagnosis_category"
					control={control}
					render={({ field }) => (
						<input type="text" {...field} className="input" />
					)}
				/>
				{errors.diagnosis_category && (
					<p className="text-red-500">{errors.diagnosis_category.message}</p>
				)}
			</div>
			<div>
				<label htmlFor="diagnosis_description" className="block">
					Diagnosis Description
				</label>
				<Controller
					name="diagnosis_description"
					control={control}
					render={({ field }) => (
						<input type="text" {...field} className="input" />
					)}
				/>
				{errors.diagnosis_description && (
					<p className="text-red-500">{errors.diagnosis_description.message}</p>
				)}
			</div>
			<div>
				<label htmlFor="diagnosis_code" className="block">
					Diagnosis Code
				</label>
				<Controller
					name="diagnosis_code"
					control={control}
					render={({ field }) => (
						<input type="text" {...field} className="input" />
					)}
				/>
				{errors.diagnosis_code && (
					<p className="text-red-500">{errors.diagnosis_code.message}</p>
				)}
			</div>
			<div>
				<button type="submit" className="btn">
					Submit
				</button>
			</div>
		</form>
	);
};

export default SimpleForm;
