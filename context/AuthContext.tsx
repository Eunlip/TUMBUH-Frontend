import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
	authState?: { token: string | null; authenticated: boolean | null };
	onSignup?: (username: string, email: string, password: string) => Promise<any>;
	onSignin?: (email: string, password: string) => Promise<any>;
	onLogout?: () => Promise<any>;
}

const TOKEN_KEY = process.env.EXPO_PUBLIC_TOKEN_KEY ?? 'my-jwt-token-key';
export const API_URL = process.env.EXPO_PUBLIC_API_URL;
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
	const [authState, setAuthState] = useState<{
		token: string | null;
		authenticated: boolean | null;
	}>({
		token: null,
		authenticated: null,
	});

	// Check if user is already authenticated
	useEffect(() => {
		const loadToken = async () => {
			const token = await SecureStore.getItemAsync(TOKEN_KEY);
			console.log('store token:', token);
			if (token) {
				setAuthState({ token, authenticated: true });
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			} else {
				setAuthState({ token: null, authenticated: false });
			}
		};
		loadToken();
	}, []);

	const signup = async (username: string, email: string, password: string) => {
		try {
			return await axios.post(`${API_URL}/register`, { username, email, password });
		} catch (error) {
			console.log('error:', error);
			return { error: true, message: (error as any).response.data.message };
		}
	};

	const signin = async (email: string, password: string) => {
		try {
			const response = await axios.post(`${API_URL}/login`, { email, password });

			console.log('login ~ result:', response.data);

			if (!response?.data) {
				throw new Error('Response dari server tidak valid');
			}

			const { token } = response.data;
			console.log('token received:', token);

			setAuthState({ token, authenticated: true });
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			await SecureStore.setItemAsync(TOKEN_KEY, token);

			return response;
		} catch (error: any) {
			return {
				error: true,
				message: error?.response?.data?.message || 'Network Error',
			};
		}
	};

	const logout = async () => {
		await SecureStore.deleteItemAsync(TOKEN_KEY);
		axios.defaults.headers.common['Authorization'] = '';

		// Reset auth state
		setAuthState({
			token: null,
			authenticated: false,
		});
	};

	const value = useMemo(
		() => ({
			onSignup: signup,
			onSignin: signin,
			onLogout: logout,
			authState,
		}),
		[signup, signin, logout, authState],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
