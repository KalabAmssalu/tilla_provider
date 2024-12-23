import { type ProviderType } from "../provider/ProviderType";

export interface UserType {
	id: number;
	provider: ProviderType;
	email: string;
	phone_number: null;
	first_name: string;
	middle_name: null;
	last_name: string;
	date_of_birth: null;
	gender: null;
	date_joined: string;
	last_login: string;
	is_active: boolean;
	role: string;
}

export interface AuthResponse {
	token: string;
	user: UserType;
}
