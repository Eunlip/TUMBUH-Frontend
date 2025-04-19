import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';

export default function Akun() {
	const [isLoading, setIsLoading] = useState(false);
	const { onLogout } = useAuth();
	const router = useRouter();

	const handleLogout = async () => {
		setIsLoading(true);
		try {
			await onLogout!();
			console.log('Logout successful');
			router.replace('/signIn');
		} catch (error) {
			console.error('Logout failed:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<SafeAreaView className='flex-1 p-10 bg-white'>
			<Text>Akun</Text>
			<TouchableOpacity onPress={handleLogout} className='p-4 mx-auto bg-red-500 rounded-md w-fit'>
				<Text className='text-white'>Logout</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
