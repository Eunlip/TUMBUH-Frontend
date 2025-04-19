import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

interface AuthProps {
	authState?: { token: string | null; authenticated: boolean | null };
	onSignup?: (username: string, email: string, password: string) => Promise<any>;
	onSignin?: (email: string, password: string) => Promise<any>;
	onLogout?: () => Promise<any>;
	verifyEmail?: (email: string, otp: string) => Promise<any>;
	resendOTP?: (email: string) => Promise<any>;
	GoogleSignin: () => Promise<any>;
}

const TOKEN_KEY = process.env.EXPO_PUBLIC_TOKEN_KEY ?? 'my-jwt-token-key';
export const API_URL = process.env.EXPO_PUBLIC_API_URL;

const AuthContext = createContext<AuthProps>({
	GoogleSignin: async () => {
		throw new Error('GoogleSignin function must be overridden');
	},
});

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

	GoogleSignin.configure({
		webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
		scopes: ['https://www.googleapis.com/auth/drive.readonly'],
		offlineAccess: false,
		forceCodeForRefreshToken: false,
		iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
	});

	// Check if user is already authenticated
	useEffect(() => {
		const loadToken = async () => {
			const token = await SecureStore.getItemAsync(TOKEN_KEY);
			console.log('store token:', token);
			if (token) {
				try {
					await axios.get(`${API_URL}/user`, {
						headers: { Authorization: `Bearer ${token}` },
					});
					setAuthState({ token, authenticated: true });
					axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
				} catch (error: any) {
					await SecureStore.deleteItemAsync(TOKEN_KEY);
					setAuthState({ token: null, authenticated: false });
					console.log('Error setting token:', error.message);
				}
			} else {
				// ✨ Coba sign in silently jika tidak ada token
				try {
					const userInfo = await GoogleSignin.signInSilently();
					const idToken = userInfo.data?.idToken;
					console.log(idToken);

					const response = await axios.post(`${API_URL}/oauth/google/callback`, {
						id_token: idToken,
					});

					const { token } = response.data;

					await SecureStore.setItemAsync(TOKEN_KEY, token);
					axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
					setAuthState({ token, authenticated: true });
				} catch (error: any) {
					console.log('Silent login gagal atau belum pernah login:', error.message);
					setAuthState({ token: null, authenticated: false });
				}
			}
		};
		loadToken();
	}, []);

	const signup = async (username: string, email: string, password: string) => {
		try {
			return await axios.post(`${API_URL}/register`, { username, email, password });
		} catch (error: any) {
			console.log('error:', error.response.data.errors);
			return { error: true, message: error.response.data.errors };
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
				message: error?.response?.data?.message ?? 'Network Error',
			};
		}
	};

	const signInWithGoogle = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const { data } = await GoogleSignin.signIn();
			console.log('Google Sign-In Data:', data?.user);
			const idToken = data?.idToken;

			if (!idToken) {
				throw new Error('Google Sign-In failed: No ID token received');
			}

			const response = await axios.post(`${API_URL}/oauth/google/callback`, {
				id_token: idToken,
			});
			console.log('Backend Response:', response.data);

			if (!response?.data) {
				throw new Error('Response dari server tidak valid');
			}

			const { token } = response.data;

			setAuthState({ token, authenticated: true });
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			await SecureStore.setItemAsync(TOKEN_KEY, token);

			return response;
		} catch (error: any) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				return { error: true, message: 'User cancelled the login flow' };
			} else if (error.code === statusCodes.IN_PROGRESS) {
				return { error: true, message: 'Sign in is in progress already' };
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				return { error: true, message: 'Play services not available or outdated' };
			} else {
				console.error('Google Sign-In Error:', error);
				return { error: true, message: error.message ?? 'Network Error' };
			}
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

	const verifyEmail = async (email: string, otp: string) => {
		try {
			return await axios.post(`${API_URL}/verify-email`, { email, otp });
		} catch (error: any) {
			return { error: true, message: error.response.data.message };
		}
	};

	const resendOTP = async (email: string) => {
		try {
			return await axios.post(`${API_URL}/resend-otp`, { email });
		} catch (error: any) {
			return { error: true, message: error.response.data.message };
		}
	};

	const value = useMemo(
		() => ({
			onSignup: signup,
			onSignin: signin,
			onLogout: logout,
			verifyEmail,
			resendOTP,
			GoogleSignin: signInWithGoogle,
			authState,
		}),
		[signup, signin, logout, verifyEmail, signInWithGoogle, resendOTP, authState],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
