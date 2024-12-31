export type ReportType =
	| "member"
	| "claim"
	| "diagnosis"
	| "loinc"
	| "referral";

export interface Report {
	id: string;
	type: ReportType;
	name: string;
	description: string;
	createdAt: string;
	status: "ready" | "processing" | "failed";
	downloadUrl?: string;
}

export interface ReportTypeInfo {
	type: ReportType;
	label: string;
	description: string;
	icon: React.ComponentType;
}

export interface ReportConfig {
	id: string;
	title: string;
	type: string;
	category: string;
	fields: ReportField[];
}

export interface ReportField {
	id: string;
	label: string;
	type: "string" | "number" | "date" | "boolean";
	required: boolean;
}

export interface ReportData {
	reportName: string;
	selectedFacilities: string[];
	selectedReports: string[];
	dateRange?: {
		startDate: Date;
		endDate: Date;
	};
}
