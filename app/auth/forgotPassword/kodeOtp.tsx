import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OTPTextView from 'react-native-otp-textinput';
import * as Clipboard from 'expo-clipboard';
import { useRef, useState } from 'react';

export default function KodeOtp() {
	const [otpInput, setOtpInput] = useState<string>('');
	const input = useRef<OTPTextView>(null);

	const router = useRouter();

	const handleCellTextChange = async (text: string, i: number) => {
		if (i == 0) {
			const clippedText = await Clipboard.getStringAsync();
			if (clippedText.slice(0, 1) === text) {
				input.current?.setValue(clippedText, true);
			}
		}
	};

	return (
		<SafeAreaView className='flex-1 p-10 bg-white'>
			<View className='items-center flex-1 gap-3'>
				<Text style={{ fontSize: 26 }} className='text-center font-poppins-bold text-black-200'>
					Kode OTP
				</Text>
				<Text
					style={{ fontSize: 16, color: '#7A7A7A' }}
					className='leading-normal text-center font-poppins'
				>
					Kami mengirimkan kode OTP melalui email ke example@gmail.com
				</Text>
				<View style={{ width: '100%', marginTop: 30 }}>
					<OTPTextView
						ref={input}
						handleTextChange={setOtpInput}
						handleCellTextChange={handleCellTextChange}
						inputCount={4}
						keyboardType='numeric'
					/>
					<TextInput maxLength={4} onChangeText={setOtpInput} />
				</View>
				<View className='flex-row gap-1'>
					<Text
						style={{ fontSize: 16, color: '#7A7A7A' }}
						className='leading-normal text-center font-poppins'
					>
						Minta kode lagi di
					</Text>
					<Text
						style={{ fontSize: 16, color: '#288A53' }}
						className='leading-normal text-center font-poppins-bold'
					>
						2:53
					</Text>
				</View>
			</View>
			<View className='w-full gap-3'>
				{!!otpInput && (
					<Button
						text='Kirim'
						onPress={() => router.push('./changePassword')}
						color1='#49A18C'
						color2='#3D8D7A'
					/>
				)}
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
