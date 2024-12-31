import MemberReport from "@/components/screen/reports/MemberReport";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {};

const page = (props: Props) => {
	return (
		<div className="container mt-4 flex flex-col gap-4">
			<Tabs defaultValue="member" className="w-full">
				<TabsList className="w-full ">
					<TabsTrigger value="member" className="w-[400px]">
						Member and Claims Report{" "}
					</TabsTrigger>
					<TabsTrigger value="financial" className="w-[400px]">
						Financial Report
					</TabsTrigger>
				</TabsList>
				<TabsContent value="member">
					<MemberReport />
				</TabsContent>
				<TabsContent value="financial">Change your password here.</TabsContent>
			</Tabs>
		</div>
	);
};

export default page;
