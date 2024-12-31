"use client";

import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import {
	fetchProviders,
	providersQueryKey,
} from "@/actions/Query/provider-Query/provider-Query";
import ProvidersList from "@/components/module/providerNetwork/ProvidersList";
import SearchCard from "@/components/module/providerNetwork/SearchCard";
import { DetailCards } from "@/components/shared/Cards/DetailCards";
import { useAppDispatch, useAppSelector } from "@/hooks/storehooks";
import { Provider, setProviders } from "@/lib/store/redux/providerSlice";

const notifications = [
	{
		title: "Step 1: Click on 'Search for Providers'",
		description:
			"Use the search bar to find a provider you want to connect with.",
	},
	{
		title: "Step 2: Review the Provider List",
		description: "Look through the list of providers that match your search.",
	},
	{
		title: "Step 3: Connect with a Provider",
		description: "Select a provider to initiate a connection.",
	},
];

const ProvidersNetworkScreen = () => {
	const dispatch = useAppDispatch();
	const providers = useAppSelector((state) => state.providers.providers);

	const { data, isLoading, error } = useQuery<Provider[], Error>({
		queryKey: providersQueryKey,
		queryFn: fetchProviders,
	});

	useEffect(() => {
		if (data) {
			dispatch(setProviders(data));
		}
	}, [data, dispatch]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>An error occurred: {(error as Error).message}</div>;

	return (
		<div className="w-full h-[calc(100vh-10rem)] relative">
			<div className="absolute bottom-0 right-0">
				<DetailCards
					title="Information on Connecting with Providers"
					description="Follow the steps below to connect with a provider."
					data={notifications}
					className=""
				/>
			</div>
			<SearchCard />
			<ProvidersList providers={providers} />
		</div>
	);
};

export default ProvidersNetworkScreen;
