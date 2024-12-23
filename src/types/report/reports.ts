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
