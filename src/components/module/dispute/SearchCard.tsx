"use client";

import { useEffect, useState } from "react";

import { CirclePlus, SearchIcon, UserX } from "lucide-react";

import { useSearchMember } from "@/actions/Query/member_Query/member_Query";
import SearchForm from "@/components/module/appealForm/SearchForm";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { type memberType } from "@/types/member/memeberType";

import { columns } from "../table/columns";
import { DataTable } from "../table/data-table";

type Props = {};

const SearchCard = (props: Props) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [formData, setFormData] = useState<Partial<memberType>>({
		member_id: "",
		first_name: "",
		middle_name: "",
		last_name: "",
		// first_name_amharic: "",
		// middle_name_amharic: "",
		// last_name_amharic: "",
		date_of_birth: "",
		phone_number: "",
		family_id: "",
	});

	const { data: members, isLoading, isError } = useSearchMember(formData);

	const [shouldSearch, setShouldSearch] = useState(false);

	useEffect(() => {
		if (shouldSearch) {
			setShouldSearch(false);
		}
	}, [formData, shouldSearch]);

	const updateFormData = (newData: Partial<memberType>) => {
		newData.first_name = newData.dependent_first_name
			? newData.dependent_first_name
			: newData.first_name;
		newData.middle_name = newData.dependent_middle_name
			? newData.dependent_middle_name
			: newData.middle_name;
		newData.last_name = newData.dependent_last_name
			? newData.dependent_last_name
			: newData.last_name;
		// newData.first_name_amharic = newData.dependent_first_name_amharic
		// 	? newData.dependent_first_name_amharic
		// 	: newData.first_name_amharic;
		// newData.middle_name_amharic = newData.dependent_middle_name_amharic
		// 	? newData.dependent_middle_name_amharic
		// 	: newData.middle_name_amharic;
		// newData.last_name_amharic = newData.dependent_last_name_amharic
		// 	? newData.dependent_last_name_amharic
		// 	: newData.last_name_amharic;
		newData.date_of_birth = newData.dependent_date_of_birth
			? newData.dependent_date_of_birth
			: newData.date_of_birth;

		setFormData((prev) => {
			return Object.keys(newData).reduce(
				(updatedData, key) => {
					const typedKey = key as keyof Partial<memberType>;

					if (
						newData[typedKey] !== undefined &&
						newData[typedKey] !== prev[typedKey]
					) {
						updatedData[typedKey] = newData[typedKey] as any;
					}
					return updatedData;
				},
				{ ...prev }
			);
		});

		setShouldSearch(true);
		setIsDialogOpen(false);
		setView(true);
	};

	const [view, setView] = useState(false);

	const handleAdd = () => {
		setIsDialogOpen(true);
	};

	return (
		<div className="flex flex-col w-full gap-4">
			<Card className="bg-secondary/40 h-[100px] flex justify-around px-32 items-center">
				<CardHeader>
					<CardTitle className="text-xl font-bold">
						File a Dispute Against a Claim
					</CardTitle>
					<CardDescription className="text-black">
						Please Search the Claim first
					</CardDescription>
				</CardHeader>
				<Button
					className="px-8 w-fit text-white flex font-bold text-md"
					onClick={() => handleAdd()}
				>
					{members && members.length === 0 ? (
						<>
							<SearchIcon className="text-white mr-5" size={20} />
							Search Again
						</>
					) : members && members.length > 0 ? (
						<>
							<SearchIcon className="text-white mr-5" size={20} />
							New Search
						</>
					) : (
						<>
							<CirclePlus className="text-white mr-5" size={20} />
							File an Dispute
						</>
					)}
				</Button>
			</Card>
			{isLoading && (
				<div className="flex justify-center items-center"> Loading... </div>
			)}
			{isError && (
				<div className="flex justify-center items-center"> Error </div>
			)}
			{members && members?.length > 0 && (
				<DataTable data={members || []} columns={columns} />
			)}
			{members && members?.length === 0 && (
				<div className="flex flex-col gap-6 text-xl mt-10 justify-center items-center">
					<div className="bg-muted rounded-full w-80 h-80 p-16">
						<UserX size={200} className="text-background " />
					</div>
					No Member Found
				</div>
			)}

			<SearchForm
				open={isDialogOpen}
				setOpen={setIsDialogOpen}
				onFormComplete={(data) => {
					updateFormData(data);
				}}
			/>
		</div>
	);
};

export default SearchCard;
