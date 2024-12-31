// "use client";

// import React, { useState } from "react";

// import DownloadOptions from "./DownloadOption";
// import FieldSelector from "./FieldSelector";
// import ReportTable from "./ReportTable";
// import SearchForm from "./SearchForm";

// type Props = {};

// const ReportScreen = (props: Props) => {
// 	const [searchParams, setSearchParams] = useState({});
// 	const [selectedFields, setSelectedFields] = useState([]);

// 	return (
// 		<div className="container mx-auto p-4 space-y-6">
// 			<h1 className="text-3xl font-bold">Report Generation System</h1>
// 			<SearchForm onSearch={setSearchParams} />
// 			<FieldSelector onFieldsChange={setSelectedFields} />
// 			<ReportTable
// 				searchParams={searchParams}
// 				selectedFields={selectedFields}
// 			/>
// 			<DownloadOptions
// 				searchParams={searchParams}
// 				selectedFields={selectedFields}
// 			/>
// 		</div>
// 	);
// };

// export default ReportScreen;
