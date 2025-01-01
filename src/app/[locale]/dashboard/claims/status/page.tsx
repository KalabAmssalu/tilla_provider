import ClaimStatusHistory from "@/components/screen/claims/ClaimStatusHistory";
import StatusScreen from "@/components/screen/claims/StatusScreen";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const statusPage = () => {
	return (
		<div>
			<Tabs defaultValue="history" className="">
				<TabsList className="w-[50%]">
					<TabsTrigger value="history" className="w-full">
						Claim History
					</TabsTrigger>
					<TabsTrigger value="search" className="w-full">
						Claim Search
					</TabsTrigger>
				</TabsList>
				<TabsContent value="history" className="w-full">
					<ClaimStatusHistory />
				</TabsContent>
				<TabsContent value="search">
					<StatusScreen />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default statusPage;
