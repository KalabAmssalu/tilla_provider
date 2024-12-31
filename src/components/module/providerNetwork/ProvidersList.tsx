import React from "react";

import { Provider } from "@/lib/store/redux/providerSlice";

import ProviderCard from "./ProviderCard";

type Props = {
	providers: Provider[];
};

const ProvidersList: React.FC<Props> = ({ providers }) => {
	return (
		<div className="mt-8 p-4">
			<h1 className="text-xl font-bold mb-5">Providers Network List</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{providers.map((provider) => (
					<ProviderCard key={provider.id} provider={provider} />
				))}
			</div>
		</div>
	);
};

export default ProvidersList;
