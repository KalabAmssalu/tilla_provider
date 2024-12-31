const DEFAULT_MESSAGE: string =
	"ያልተጠበቀ ስህተት ተፈጥሯል። እባክዎ ቆየት ብለው ይሞክሩ። ችግሩ ከቀጠለ፣ እባክዎ ድጋፍን ያግኙ።";

const ERROR_MAP: Record<string, string> = {
	USER_NOT_FOUND: "The specified user does not exist.",
	VALIDATION_ERROR: "Some input fields are invalid.",
	UNAUTHORIZED: "You are not authorized to perform this action.",
	FORBIDDEN:
		"You do not have the required permissions to access this resource.",
	RESOURCE_NOT_FOUND: "The requested resource could not be found.",
	CONFLICT: "There is a conflict with the current state of the resource.",
	INTERNAL_SERVER_ERROR:
		"An internal server error occurred. Please try again later.",
	SERVICE_UNAVAILABLE:
		"The service is temporarily unavailable. Please try again later.",
	BAD_REQUEST:
		"The request could not be understood by the server due to malformed syntax.",
	TOO_MANY_REQUESTS:
		"You have made too many requests in a short period. Please wait and try again.",
	DATABASE_ERROR: "A database error occurred. Please try again later.",
	TIMEOUT: "The request timed out. Please check your connection and try again.",
	NETWORK_ERROR:
		"A network error occurred. Please check your internet connection.",
	INVALID_CREDENTIALS:
		"The provided credentials are invalid. Please check and try again.",
	SESSION_EXPIRED: "Your session has expired. Please log in again.",
	DUPLICATE_ENTRY: "The data you are trying to submit already exists.",
	FILE_UPLOAD_ERROR:
		"An error occurred while uploading the file. Please try again.",
	PAYMENT_REQUIRED: "Payment is required to access this resource.",
	NOT_IMPLEMENTED:
		"This feature is not implemented yet. Please contact support for more information.",
};

export default function getErrorMessage(error: any): string {
	const error_code = error?.response?.data?.error_code;
	const error_message = error?.response?.data?.message;
	const error_status = error?.response?.status;
	const error_data = error?.response?.data;
	console.log("error data", error_data);
	// Map error code to user-friendly message if possible
	if (error_code && ERROR_MAP[error_code]) {
		return ERROR_MAP[error_code];
	}

	if (error_message) {
		return error_message;
	}
	// Handle cases where the response data has multiple errors
	if (error_data && typeof error_data === "object") {
		let detailedErrorMessages = "";
		Object.entries(error_data).forEach(([field, messages]) => {
			if (Array.isArray(messages)) {
				messages.forEach((message) => {
					detailedErrorMessages += `${field}: ${message}\n`;
				});
			} else {
				detailedErrorMessages += `${field}: ${messages}\n`;
			}
		});
		// Trim trailing newline character and return as the error message
		return detailedErrorMessages.trim();
	}

	if (error_status) {
		return `HTTP Status ${error_status}: An unexpected error occurred.`;
	}

	return DEFAULT_MESSAGE;
}
