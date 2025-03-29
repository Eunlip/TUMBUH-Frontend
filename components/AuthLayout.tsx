import { useAuth } from '@/context/AuthContext';
import { Stack } from 'expo-router';

export default function AuthLayout() {
	const { authState } = useAuth();

	return (
		<Stack screenOptions={{ headerShown: false }}>
			{authState?.authenticated ? (
				<Stack.Screen name='index' />
			) : (
				<Stack.Screen name='(tabs)/edukasi' />
			)}
		</Stack>
	);
}
