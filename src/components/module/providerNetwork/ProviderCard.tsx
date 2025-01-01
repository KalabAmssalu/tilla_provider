import React from "react";

import { Mail, MapPin, Phone, Star, Syringe } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Provider } from "@/lib/store/redux/providerSlice";

type ProviderCardProps = {
	provider: Provider;
};

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
	return (
		<Card className="border rounded-lg shadow-lg transition-transform transform p-4 items-center">
			<CardHeader>
				{/* <Image
					src={IMAGES.provider} // Replace with the actual image URL
					alt={`${provider.provider_first_name} ${provider.provider_last_name}`}
					className="rounded-t-lg h-40 w-full object-cover"
				/> */}
				<h3 className="text-lg font-semibold mt-2 text-center">
					{`${provider.provider_title}. ${provider.provider_first_name} ${provider.provider_last_name}`}
				</h3>
				<span className="text-sm mt-2 text-center">
					{`${provider.institute_name}`}
				</span>
			</CardHeader>
			<CardContent className="p-4 space-y-2 items-center">
				<div className="flex items-center">
					<Syringe className="h-5 w-5 text-primary mr-2" />
					<p className="text-gray-600">
						<span className="text-primary">Specialty: </span>
						{provider.provider_primary_specialty}
					</p>
				</div>
				{/* <div className="flex items-center">
					<Star className="h-5 w-5 text-primary mr-2" />
					<p className="text-gray-600">
						Sub-specialty: {provider.provider_sub_specialty}
					</p>
				</div> */}
				<div className="flex items-center">
					<MapPin className="h-5 w-5 text-primary mr-2" />
					<p className="text-gray-600">
						<span className="text-primary"> Address: </span>{" "}
						{provider.provider_address}
					</p>
				</div>
				{/* <div className="flex items-center">
					<Building className="h-5 w-5 text-primary mr-2" />
					<p className="text-gray-600">City: {provider.provider_city}</p>
				</div> */}
				<div className="flex items-center">
					<Phone className="h-5 w-5 text-primary mr-2" />
					<p className="text-gray-600">
						<span className="text-primary"> Phone: </span>{" "}
						{provider.provider_phone_number}
					</p>
				</div>
				<div className="flex items-center">
					<Mail className="h-5 w-5 text-primary mr-2" />
					<p className="text-gray-600">
						<span className="text-primary"> Email: </span>{" "}
						{provider.provider_email}
					</p>
				</div>

				<div className="flex items-center">
					<Star className="h-5 w-5 text-primary mr-2" />
					<p className="text-gray-600">
						<span className="text-primary"> Service Type:</span>{" "}
						{provider.provider_service_type}
					</p>
				</div>
			</CardContent>
			<CardFooter>
				<div className="flex items-center justify-evenly">
					<Button className="">Write Referral</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

export default ProviderCard;
