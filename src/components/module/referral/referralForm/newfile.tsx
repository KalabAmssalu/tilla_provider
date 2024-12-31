"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";

import axios from "axios";

const FileUploadingTest = () => {
	const [file1, setFile1] = useState<File | null>(null);
	const [file2, setFile2] = useState<File | null>(null);
	const [message, setMessage] = useState<string>("");

	const handleFileChange = (
		e: ChangeEvent<HTMLInputElement>,
		fileSetter: React.Dispatch<React.SetStateAction<File | null>>
	) => {
		if (e.target.files) {
			fileSetter(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const formData = new FormData();
		if (file1) formData.append("supporting_doc1", file1);
		if (file2) formData.append("supporting_doc2", file2);
		//  formData.append("individual_member", Number(1));
		//  formData.append("refferred_to", Number(1));

		try {
			const response = await axios.post(
				"https://api.tillahealthinsurance.com/referrals",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			setMessage(response.data.message);
		} catch (error) {
			setMessage("An error occurred while uploading files.");
		}
	};

	return (
		<div>
			<h1>Upload Files</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>File 1:</label>
					<input type="file" onChange={(e) => handleFileChange(e, setFile1)} />
				</div>
				<div>
					<label>File 2:</label>
					<input type="file" onChange={(e) => handleFileChange(e, setFile2)} />
				</div>

				<button type="submit">Upload</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
};

export default FileUploadingTest;
