"use client";

import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import {
	DataGrid,
	type GridRenderCellParams,
	GridToolbar,
} from "@mui/x-data-grid";

const StyledGridOverlay = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	height: "100%",
	"& .no-results-primary": {
		fill: theme.palette.mode === "light" ? "#AEB8C2" : "#3D4751",
	},
	"& .no-results-secondary": {
		fill: theme.palette.mode === "light" ? "#E8EAED" : "#1D2126",
	},
}));

interface RowData {
	id?: number;
	member_id?: string;
	family_id?: string;
	date_of_birth: string;
	first_name: string;
	last_name: string;
	middle_name: string;
	gender: string;
	insurance_type: string;
	has_transport_subscription: boolean;
	marital_status: string;
	member_organization_type: string;
	benefit_plan: string;
	member_payment_duty: number;
	member_type: string;
	member_status: string;
	phone_number: string;
	email_address: string;
	mailing_address_line1: string;
	country: string;
	street_address: string;
	city: string;
	region: string;
	kifle_ketema: string;
	representative_first_name: string;
	representative_last_name: string;
	representative_middle_name: string;
	representative_gender: string;
	representative_date_of_birth: string | null;
	representative_marital_status: string;
	representative_mailing_address_line1: string;
	representative_country: string;
	representative_street_address: string;
	representative_city: string;
	representative_region: string;
	representative_kifle_ketema: string;
	representative_zip_code: string;
	representative_phone_number: string;
	representative_email_address: string;
	relationship_to_member: string;
	is_representative: boolean;
	height: number;
	weight: number;
	tin_number: string;
	max_out_of_pocket: number;
	max_out_of_pocket_etb: number;
	total_medical_expense: number;
	deductible_type: string;
	deductible: number;
	payment_date: string;
	benefit_begin_date: string;
}

const dummyData: RowData[] = [
	{
		id: 1,
		member_id: "M123456",
		family_id: "F987654",
		date_of_birth: "1985-05-15",
		first_name: "John",
		last_name: "Doe",
		middle_name: "A",
		gender: "Male",
		insurance_type: "Health",
		has_transport_subscription: true,
		marital_status: "Married",
		member_organization_type: "Private",
		benefit_plan: "Gold",
		member_payment_duty: 500,
		member_type: "Employee",
		member_status: "Active",
		phone_number: "0912345678",
		email_address: "john.doe@example.com",
		mailing_address_line1: "123 Main St",
		country: "Ethiopia",
		street_address: "123 Main St",
		city: "Addis Ababa",
		region: "Addis Ababa",
		kifle_ketema: "Kirkos",
		representative_first_name: "Jane",
		representative_last_name: "Doe",
		representative_middle_name: "B",
		representative_gender: "Female",
		representative_date_of_birth: "1990-08-22",
		representative_marital_status: "Single",
		representative_mailing_address_line1: "456 Another St",
		representative_country: "Ethiopia",
		representative_street_address: "456 Another St",
		representative_city: "Addis Ababa",
		representative_region: "Addis Ababa",
		representative_kifle_ketema: "Bole",
		representative_zip_code: "12345",
		representative_phone_number: "0912345679",
		representative_email_address: "jane.doe@example.com",
		relationship_to_member: "Spouse",
		is_representative: true,
		height: 175,
		weight: 70,
		tin_number: "1234567890",
		max_out_of_pocket: 2000,
		max_out_of_pocket_etb: 100000,
		total_medical_expense: 500,
		deductible_type: "Fixed",
		deductible: 100,
		payment_date: "2024-12-28",
		benefit_begin_date: "2024-01-01",
	},
	{
		id: 2,
		member_id: "M234567",
		family_id: "F876543",
		date_of_birth: "1992-03-25",
		first_name: "Alice",
		last_name: "Smith",
		middle_name: "C",
		gender: "Female",
		insurance_type: "Dental",
		has_transport_subscription: false,
		marital_status: "Single",
		member_organization_type: "Government",
		benefit_plan: "Silver",
		member_payment_duty: 300,
		member_type: "Dependent",
		member_status: "Active",
		phone_number: "0912345680",
		email_address: "alice.smith@example.com",
		mailing_address_line1: "789 Elm St",
		country: "Ethiopia",
		street_address: "789 Elm St",
		city: "Addis Ababa",
		region: "Addis Ababa",
		kifle_ketema: "Lideta",
		representative_first_name: "Bob",
		representative_last_name: "Smith",
		representative_middle_name: "D",
		representative_gender: "Male",
		representative_date_of_birth: "1988-02-10",
		representative_marital_status: "Married",
		representative_mailing_address_line1: "321 Pine St",
		representative_country: "Ethiopia",
		representative_street_address: "321 Pine St",
		representative_city: "Addis Ababa",
		representative_region: "Addis Ababa",
		representative_kifle_ketema: "Kolfe",
		representative_zip_code: "54321",
		representative_phone_number: "0912345681",
		representative_email_address: "bob.smith@example.com",
		relationship_to_member: "Father",
		is_representative: true,
		height: 160,
		weight: 55,
		tin_number: "0987654321",
		max_out_of_pocket: 1500,
		max_out_of_pocket_etb: 75000,
		total_medical_expense: 300,
		deductible_type: "Percentage",
		deductible: 10,
		payment_date: "2024-12-27",
		benefit_begin_date: "2024-01-01",
	},
	{
		id: 3,
		member_id: "M345678",
		family_id: "F765432",
		date_of_birth: "1987-07-10",
		first_name: "Bob",
		last_name: "Johnson",
		middle_name: "D",
		gender: "Male",
		insurance_type: "Vision",
		has_transport_subscription: true,
		marital_status: "Divorced",
		member_organization_type: "Private",
		benefit_plan: "Platinum",
		member_payment_duty: 600,
		member_type: "Employee",
		member_status: "Inactive",
		phone_number: "0912345690",
		email_address: "bob.johnson@example.com",
		mailing_address_line1: "101 Maple St",
		country: "Ethiopia",
		street_address: "101 Maple St",
		city: "Addis Ababa",
		region: "Addis Ababa",
		kifle_ketema: "Yeka",
		representative_first_name: "Alice",
		representative_last_name: "Johnson",
		representative_middle_name: "E",
		representative_gender: "Female",
		representative_date_of_birth: "1991-11-15",
		representative_marital_status: "Single",
		representative_mailing_address_line1: "202 Birch St",
		representative_country: "Ethiopia",
		representative_street_address: "202 Birch St",
		representative_city: "Addis Ababa",
		representative_region: "Addis Ababa",
		representative_kifle_ketema: "Bole",
		representative_zip_code: "67890",
		representative_phone_number: "0912345691",
		representative_email_address: "alice.johnson@example.com",
		relationship_to_member: "Sister",
		is_representative: true,
		height: 168,
		weight: 65,
		tin_number: "1122334455",
		max_out_of_pocket: 2500,
		max_out_of_pocket_etb: 125000,
		total_medical_expense: 400,
		deductible_type: "Fixed",
		deductible: 150,
		payment_date: "2024-12-26",
		benefit_begin_date: "2024-01-01",
	},
	{
		id: 4,
		member_id: "M456789",
		family_id: "F654321",
		date_of_birth: "1990-02-14",
		first_name: "Charlie",
		last_name: "Williams",
		middle_name: "G",
		gender: "Male",
		insurance_type: "Health",
		has_transport_subscription: false,
		marital_status: "Single",
		member_organization_type: "Government",
		benefit_plan: "Gold",
		member_payment_duty: 700,
		member_type: "Employee",
		member_status: "Active",
		phone_number: "0912345700",
		email_address: "charlie.williams@example.com",
		mailing_address_line1: "202 Oak St",
		country: "Ethiopia",
		street_address: "202 Oak St",
		city: "Addis Ababa",
		region: "Addis Ababa",
		kifle_ketema: "Lideta",
		representative_first_name: "David",
		representative_last_name: "Williams",
		representative_middle_name: "H",
		representative_gender: "Male",
		representative_date_of_birth: "1985-12-20",
		representative_marital_status: "Married",
		representative_mailing_address_line1: "303 Cedar St",
		representative_country: "Ethiopia",
		representative_street_address: "303 Cedar St",
		representative_city: "Addis Ababa",
		representative_region: "Addis Ababa",
		representative_kifle_ketema: "Kolfe",
		representative_zip_code: "54322",
		representative_phone_number: "0912345701",
		representative_email_address: "david.williams@example.com",
		relationship_to_member: "Father",
		is_representative: true,
		height: 180,
		weight: 75,
		tin_number: "5566778899",
		max_out_of_pocket: 3000,
		max_out_of_pocket_etb: 150000,
		total_medical_expense: 600,
		deductible_type: "Percentage",
		deductible: 20,
		payment_date: "2024-12-25",
		benefit_begin_date: "2024-01-01",
	},
	{
		id: 5,
		member_id: "M567890",
		family_id: "F543210",
		date_of_birth: "1995-06-30",
		first_name: "Eve",
		last_name: "Davis",
		middle_name: "F",
		gender: "Female",
		insurance_type: "Dental",
		has_transport_subscription: true,
		marital_status: "Married",
		member_organization_type: "Private",
		benefit_plan: "Silver",
		member_payment_duty: 400,
		member_type: "Employee",
		member_status: "Active",
		phone_number: "0912345702",
		email_address: "eve.davis@example.com",
		mailing_address_line1: "505 Pine St",
		country: "Ethiopia",
		street_address: "505 Pine St",
		city: "Addis Ababa",
		region: "Addis Ababa",
		kifle_ketema: "Yeka",
		representative_first_name: "Frank",
		representative_last_name: "Davis",
		representative_middle_name: "I",
		representative_gender: "Male",
		representative_date_of_birth: "1993-01-18",
		representative_marital_status: "Single",
		representative_mailing_address_line1: "404 Birch St",
		representative_country: "Ethiopia",
		representative_street_address: "404 Birch St",
		representative_city: "Addis Ababa",
		representative_region: "Addis Ababa",
		representative_kifle_ketema: "Bole",
		representative_zip_code: "67891",
		representative_phone_number: "0912345703",
		representative_email_address: "frank.davis@example.com",
		relationship_to_member: "Husband",
		is_representative: true,
		height: 165,
		weight: 60,
		tin_number: "6677889900",
		max_out_of_pocket: 2000,
		max_out_of_pocket_etb: 100000,
		total_medical_expense: 350,
		deductible_type: "Fixed",
		deductible: 100,
		payment_date: "2024-12-24",
		benefit_begin_date: "2024-01-01",
	},
];

function CustomNoResultsOverlay() {
	return (
		<StyledGridOverlay>
			<svg
				xmlns=""
				fill="none"
				width={96}
				viewBox="0 0 523 299"
				aria-hidden
				focusable="false"
			>
				<path
					className="no-results-primary"
					d="M262 20c-63.513 0-115 51.487-115 115s51.487 115 115 115 115-51.487 115-115S325.513 20 262 20ZM127 135C127 60.442 187.442 0 262 0c74.558 0 135 60.442 135 135 0 74.558-60.442 135-135 135-74.558 0-135-60.442-135-135Z"
				/>
				<path
					className="no-results-primary"
					d="M348.929 224.929c3.905-3.905 10.237-3.905 14.142 0l56.569 56.568c3.905 3.906 3.905 10.237 0 14.143-3.906 3.905-10.237 3.905-14.143 0l-56.568-56.569c-3.905-3.905-3.905-10.237 0-14.142ZM212.929 85.929c3.905-3.905 10.237-3.905 14.142 0l84.853 84.853c3.905 3.905 3.905 10.237 0 14.142-3.905 3.905-10.237 3.905-14.142 0l-84.853-84.853c-3.905-3.905-3.905-10.237 0-14.142Z"
				/>
				<path
					className="no-results-primary"
					d="M212.929 185.071c-3.905-3.905-3.905-10.237 0-14.142l84.853-84.853c3.905-3.905 10.237-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-84.853 84.853c-3.905 3.905-10.237 3.905-14.142 0Z"
				/>
				<path
					className="no-results-secondary"
					d="M0 43c0-5.523 4.477-10 10-10h100c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 53 0 48.523 0 43ZM0 89c0-5.523 4.477-10 10-10h80c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 99 0 94.523 0 89ZM0 135c0-5.523 4.477-10 10-10h74c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 181c0-5.523 4.477-10 10-10h80c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 227c0-5.523 4.477-10 10-10h100c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM523 227c0 5.523-4.477 10-10 10H413c-5.523 0-10-4.477-10-10s4.477-10 10-10h100c5.523 0 10 4.477 10 10ZM523 181c0 5.523-4.477 10-10 10h-80c-5.523 0-10-4.477-10-10s4.477-10 10-10h80c5.523 0 10 4.477 10 10ZM523 135c0 5.523-4.477 10-10 10h-74c-5.523 0-10-4.477-10-10s4.477-10 10-10h74c5.523 0 10 4.477 10 10ZM523 89c0 5.523-4.477 10-10 10h-80c-5.523 0-10-4.477-10-10s4.477-10 10-10h80c5.523 0 10 4.477 10 10ZM523 43c0 5.523-4.477 10-10 10H413c-5.523 0-10-4.477-10-10s4.477-10 10-10h100c5.523 0 10 4.477 10 10Z"
				/>
			</svg>
			<Box sx={{ mt: 2 }}>No results found.</Box>
		</StyledGridOverlay>
	);
}

export default function CustomGrid() {
	const [data, setData] = useState<RowData[]>([]); // Assuming the data will have the required fields

	const columns = [
		{ field: "id", headerName: "Member ID", width: 150 },
		{ field: "first_name", headerName: "First Name", width: 180 },
		{ field: "last_name", headerName: "Last Name", width: 180 },
		{ field: "middle_name", headerName: "Middle Name", width: 180 },
		{ field: "date_of_birth", headerName: "Date of Birth", width: 180 },
		{ field: "gender", headerName: "Gender", width: 150 },
		{ field: "insurance_type", headerName: "Insurance Type", width: 180 },
		{
			field: "has_transport_subscription",
			headerName: "Transport Subscription",
			width: 200,
			renderCell: (params: GridRenderCellParams) => {
				return params.value ? "Yes" : "No";
			},
		},
		{ field: "marital_status", headerName: "Marital Status", width: 180 },
		{
			field: "member_organization_type",
			headerName: "Organization Type",
			width: 180,
		},
		{ field: "benefit_plan", headerName: "Benefit Plan", width: 180 },
		{ field: "member_payment_duty", headerName: "Payment Duty", width: 180 },
		{ field: "member_type", headerName: "Member Type", width: 180 },
		{ field: "member_status", headerName: "Member Status", width: 180 },
		{ field: "phone_number", headerName: "Phone Number", width: 180 },
		{ field: "email_address", headerName: "Email Address", width: 200 },
		{
			field: "mailing_address_line1",
			headerName: "Mailing Address",
			width: 200,
		},
		{ field: "country", headerName: "Country", width: 150 },
		{ field: "street_address", headerName: "Street Address", width: 200 },
		{ field: "city", headerName: "City", width: 150 },
		{ field: "region", headerName: "Region", width: 150 },
		{ field: "kifle_ketema", headerName: "Kifle Ketema", width: 150 },
		{
			field: "representative_first_name",
			headerName: "Rep. First Name",
			width: 180,
		},
		{
			field: "representative_last_name",
			headerName: "Rep. Last Name",
			width: 180,
		},
		{
			field: "representative_middle_name",
			headerName: "Rep. Middle Name",
			width: 180,
		},
		{ field: "representative_gender", headerName: "Rep. Gender", width: 150 },
		{
			field: "representative_date_of_birth",
			headerName: "Rep. Date of Birth",
			width: 180,
		},
		{
			field: "representative_marital_status",
			headerName: "Rep. Marital Status",
			width: 180,
		},
		{
			field: "representative_mailing_address_line1",
			headerName: "Rep. Mailing Address",
			width: 200,
		},
		{ field: "representative_country", headerName: "Rep. Country", width: 150 },
		{
			field: "representative_street_address",
			headerName: "Rep. Street Address",
			width: 200,
		},
		{ field: "representative_city", headerName: "Rep. City", width: 150 },
		{ field: "representative_region", headerName: "Rep. Region", width: 150 },
		{
			field: "representative_kifle_ketema",
			headerName: "Rep. Kifle Ketema",
			width: 150,
		},
		{
			field: "representative_zip_code",
			headerName: "Rep. Zip Code",
			width: 150,
		},
		{
			field: "representative_phone_number",
			headerName: "Rep. Phone Number",
			width: 180,
		},
		{
			field: "representative_email_address",
			headerName: "Rep. Email",
			width: 200,
		},
		{
			field: "relationship_to_member",
			headerName: "Relationship to Member",
			width: 200,
		},
		{
			field: "is_representative",
			headerName: "Is Representative",
			width: 180,
			renderCell: (params: GridRenderCellParams) => {
				return params.value ? "Yes" : "No";
			},
		},
		{ field: "height", headerName: "Height (cm)", width: 150 },
		{ field: "weight", headerName: "Weight (kg)", width: 150 },
		{ field: "tin_number", headerName: "TIN Number", width: 180 },
		{ field: "max_out_of_pocket", headerName: "Max Out of Pocket", width: 180 },
		{
			field: "max_out_of_pocket_etb",
			headerName: "Max Out of Pocket (ETB)",
			width: 180,
		},
		{
			field: "total_medical_expense",
			headerName: "Total Medical Expense",
			width: 180,
		},
		{ field: "deductible_type", headerName: "Deductible Type", width: 180 },
		{ field: "deductible", headerName: "Deductible", width: 150 },
		{ field: "payment_date", headerName: "Payment Date", width: 180 },
		{
			field: "benefit_begin_date",
			headerName: "Benefit Begin Date",
			width: 180,
		},
	];

	useEffect(() => {
		// Assuming you fetch your data here
		// Sample data structure:
		setData(dummyData);
	}, []);

	return (
		<div style={{ height: 600, width: "100%" }}>
			<DataGrid
				rows={data}
				columns={columns}
				slots={{
					noResultsOverlay: CustomNoResultsOverlay,
					toolbar: GridToolbar,
				}}
				initialState={{
					filter: {
						filterModel: {
							items: [],
							quickFilterValues: [],
						},
					},
				}}
				slotProps={{
					toolbar: {
						showQuickFilter: true,
					},
				}}
				onRowClick={(params) => {
					// router.push(`Inventory/${params.id}`);
				}}
				sx={{
					"& .MuiButtonBase-root": {
						color: "white",
					},
					"& .MuiDataGrid-toolbarContainer": {
						bgcolor: "#59D3FC",
					},
					"& .MuiDataGrid-columnHeader": {
						bgcolor: "#002664",
						color: "#59D3FC",
						fontWeight: "bold",
						borderBlockColor: "black",
					},
					"& .MuiDataGrid-filler": {
						bgcolor: "Background",
					},
					"& .MuiDataGrid-virtualScrollerRenderZone": {
						color: "GrayText",
						fontWeight: "bold",
						fontSize: "1rem",
					},
					"& .MuiDataGrid-scrollbarFiller": {
						bgcolor: "black",
					},
					"& .MuiDataGrid-footerContainer": {
						bgcolor: "#59D3FC",
						fontWeight: "bold",
					},
					"& .MuiDataGrid-row:hover": {
						bgcolor: "#59D3FC",
						color: "black",
						cursor: "pointer",
					},
					"& .MuiDataGrid-row.Mui-selected": {
						bgcolor: "#59D3FC",
						color: "white",
						cursor: "pointer",
					},
				}}
			/>
		</div>
	);
}
