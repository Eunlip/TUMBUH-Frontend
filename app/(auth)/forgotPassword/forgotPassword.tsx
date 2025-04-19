import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function ForgotPassword() {
	const [email, setEmail] = useState<string>('');
	const router = useRouter();

	return (
		<SafeAreaView className='flex-1 p-10 bg-white'>
			<View className='items-center flex-1 gap-3'>
				<Text
					style={{ fontSize: 26 }}
					className='text-center capitalize font-poppins-bold text-black-200'
				>
					Lupa Password
				</Text>
				<Text
					style={{ fontSize: 16, color: '#7A7A7A' }}
					className='leading-normal text-center font-poppins'
				>
					Masukkan email anda untuk mengirimkan kode OTP
				</Text>
				<View style={{ width: '100%', marginTop: 30 }}>
					<Input
						label='Email Address'
						placeholder='Email Address'
						keyboardType='email-address'
						value={email}
						onChangeText={(text) => setEmail(text)}
						leftIcon={<MaterialIcons name='email' size={24} color='#4F6F52' />}
						clsnm='px-5 py-1 h-16 border-green-700'
						iconClsnm='mr-3'
					/>
				</View>
			</View>
			<View className='w-full gap-3'>
				<Button
					text='Kirim'
					onPress={() => router.push('./kodeOtp')}
					color1='#49A18C'
					color2='#3D8D7A'
				/>
				<Button
					text='Kembali'
					onPress={() => router.canGoBack() && router.back()}
					color1='transparent'
					color2='transparent'
					textColor='text-[##3D8D7A]'
					border='border-2 border-[##3D8D7A]'
					opacity={0.6}
				/>
			</View>
		</SafeAreaView>
	);
}
