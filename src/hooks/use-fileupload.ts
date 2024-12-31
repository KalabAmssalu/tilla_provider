import { useEffect, useState } from "react";

import { DropzoneOptions, useDropzone } from "react-dropzone";
import { UseFormReturn, useForm } from "react-hook-form";

export type FileUploadHookProps = {
	acceptedFileTypes: Record<string, string[]>;
	maxFileSize?: number;
};

export type FileUploadHookReturn = {
	imagePreview: string | null;
	dropzoneProps: ReturnType<typeof useDropzone>;
	form: UseFormReturn<{ file: FileList }>;
};

export function useFileUpload({
	acceptedFileTypes,
	maxFileSize = 5 * 1024 * 1024,
}: FileUploadHookProps): FileUploadHookReturn {
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const form = useForm<{ file: FileList }>();
	const { setValue, clearErrors } = form;

	const onDrop: DropzoneOptions["onDrop"] = (acceptedFiles) => {
		if (acceptedFiles.length > 0) {
			const file = acceptedFiles[0];

			if (file.size > maxFileSize) {
				form.setError("file", {
					type: "manual",
					message: `File size should not exceed ${maxFileSize / (1024 * 1024)}MB`,
				});
				return;
			}

			const dataTransfer = new DataTransfer();
			dataTransfer.items.add(file);

			setValue("file", dataTransfer.files);
			clearErrors("file");

			const previewUrl = URL.createObjectURL(file);
			setImagePreview(previewUrl);
		}
	};

	const dropzoneProps = useDropzone({
		accept: acceptedFileTypes,
		onDrop,
		maxSize: maxFileSize,
	});

	useEffect(() => {
		return () => {
			if (imagePreview) {
				URL.revokeObjectURL(imagePreview);
			}
		};
	}, [imagePreview]);

	return { imagePreview, dropzoneProps, form };
}
