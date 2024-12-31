// components/AnnouncementsCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AnnouncementsCard = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Announcements & Updates</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground">
					Starting January 2025, new telehealth services will be available to
					all plans.
				</p>
			</CardContent>
		</Card>
	);
};

export default AnnouncementsCard;
