export function flattenFormData(
	formData: Record<string, any>
): Record<string, any> {
	return Object.entries(formData).reduce(
		(acc, [key, value]) => {
			if (typeof value === "object" && value !== null) {
				Object.entries(value).forEach(([subKey, subValue]) => {
					acc[subKey] = subValue;
				});
			} else {
				acc[key] = value;
			}
			return acc;
		},
		{} as Record<string, any>
	);
}
