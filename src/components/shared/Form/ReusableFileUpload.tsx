"use client";

import Image from "next/image";

import { CloudUpload, Replace, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
	type FileUploadHookProps,
	useFileUpload,
} from "@/hooks/use-fileupload";

interface ReusableUploadFormProps extends FileUploadHookProps {
	title: string;
	onSubmit: (file: File) => Promise<void>;
}

export function ReusableUploadForm({
	title,
	acceptedFileTypes,
	maxFileSize,
	onSubmit,
}: ReusableUploadFormProps) {
	const { imagePreview, dropzoneProps, form } = useFileUpload({
		acceptedFileTypes,
		maxFileSize,
	});
	const { getRootProps, getInputProps, open } = dropzoneProps;
	const {
		handleSubmit,
		formState: { errors },
	} = form;
	const { toast } = useToast();

	const handleFormSubmit = handleSubmit(async (data) => {
		if (data.file && data.file.length > 0) {
			try {
				await onSubmit(data.file[0]);
				toast({
					title: "Success",
					description: "File uploaded successfully!",
				});
			} catch (error) {
				toast({
					title: "Error",
					description: "Failed to upload file. Please try again.",
					variant: "destructive",
				});
			}
		}
	});

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleFormSubmit} className="space-y-6">
					<div
						{...getRootProps({
							className:
								"border-dashed border-2 border-gray-300 p-6 rounded-lg cursor-pointer hover:border-primary transition-colors duration-200 flex flex-col items-center justify-center text-center",
						})}
					>
						<input {...getInputProps()} />
						{imagePreview ? (
							<div className="flex flex-col items-center">
								<Image
									src={imagePreview}
									alt="File Preview"
									className="mt-4 max-w-full h-auto"
									width={200}
									height={200}
									objectFit="contain"
								/>
								<p className="mt-2 text-sm text-green-600">
									File uploaded successfully
								</p>
							</div>
						) : (
							<p className="text-gray-500">
								Drag and drop a file here, or click to select one
							</p>
						)}
					</div>
					<Button
						type="button"
						onClick={open}
						variant="outline"
						className="w-full flex items-center justify-center gap-2"
					>
						{imagePreview ? (
							<Replace className="w-4 h-4" />
						) : (
							<CloudUpload className="w-4 h-4" />
						)}
						{imagePreview ? "Change file" : "Select file"}
					</Button>
					{errors.file && (
						<p className="text-red-500 text-sm" role="alert">
							{errors.file.message}
						</p>
					)}
					<Button
						type="submit"
						disabled={!imagePreview}
						className="w-full flex items-center justify-center gap-2"
					>
						<Save className="w-4 h-4" />
						Submit
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
