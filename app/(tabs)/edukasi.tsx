import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Edukasi() {
	const { onLogout } = useAuth();
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await onLogout!();
			console.log('Logout successful');
			router.replace('/');
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	return (
		<SafeAreaView className='flex-1 bg-white'>
			<Text>Edukasi</Text>
			<TouchableOpacity
				onPress={handleLogout}
				className='w-20 p-4 mx-auto mt-4 bg-red-500 rounded-md'
			>
				<Text className='text-white'>Logout</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
