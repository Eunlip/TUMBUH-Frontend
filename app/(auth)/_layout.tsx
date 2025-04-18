import { useAuth } from '@/context/AuthContext';
import { useRouter, Stack } from 'expo-router';
import { useEffect } from 'react';

export default function AuthLayout() {
	const { authState } = useAuth(); // Pastikan ada state `user`
	const router = useRouter();

	useEffect(() => {
		if (authState?.token) {
			router.replace('/(tabs)/edukasi'); // ✅ Redirect ke halaman utama jika sudah login
		}
	}, [authState]);

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name='signIn' />
			<Stack.Screen name='signUp' />
			<Stack.Screen name='chooseRole' />
			<Stack.Screen name='kodeOtp' options={{ headerShown: true }} />
			<Stack.Screen name='resetPassword' />
			<Stack.Screen
				name='forgotPassword'
				options={{
					headerShown: true,
					headerTitle: 'Lupa Password',
					headerTitleAlign: 'center',
					headerTintColor: '#fff',
					headerStyle: {
						backgroundColor: '#3D8D7A',
					},
				}}
			/>
		</Stack>
	);
}
