export type NavItem = {
	title: string;
	url: string;
	isActive?: boolean;
	items?: NavItem[]; // Recursive type for nested sub-items
};
