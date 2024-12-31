import StatusScreen from "@/components/screen/claims/StatusScreen";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const statusPage = () => {
	return (
		<div>
			<Tabs defaultValue="history" className="w-full">
				<TabsList className="w-[50%]">
					<TabsTrigger value="history" className="w-[100%]">
						Claim History
					</TabsTrigger>
					<TabsTrigger value="search" className="w-[100%]">
						Claim Search
					</TabsTrigger>
				</TabsList>
				<TabsContent value="history">
					Make changes to your account here.
				</TabsContent>
				<TabsContent value="search">
					<StatusScreen />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default statusPage;
