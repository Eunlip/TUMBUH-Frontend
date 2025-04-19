import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import OTPTextView from 'react-native-otp-textinput';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../loading';

export default function KodeOtp() {
	const [otpInput, setOtpInput] = useState<string>('');
	const [timer, setTimer] = useState<number>(60);
	const input = useRef<OTPTextView>(null);
	const { email, password } = useLocalSearchParams<{ email: string; password: string }>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [dots, setDots] = useState<string>('');

	const { onSignin, verifyEmail, resendOTP } = useAuth();

	const handleCellTextChange = async (text: string, i: number) => {
		if (i == 0) {
			const clippedText = await Clipboard.getStringAsync();
			if (clippedText.slice(0, 1) === text) {
				input.current?.setValue(clippedText, true);
			}
		}
	};

	const handleResendOTP = async () => {
		try {
			await resendOTP!(email);
			setTimer(60);
		} catch (error) {
			console.error('Error sending OTP:', error);
		}
	};

	const verifyOTP = async () => {
		setIsLoading(true);
		try {
			const response = await verifyEmail!(email, otpInput);
			if (response && response.status === 200) {
				Dialog.show({
					type: ALERT_TYPE.SUCCESS,
					title: 'Berhasil',
					textBody: 'Kode OTP berhasil diverifikasi!',
					button: 'Ke Aplikasi',
					onPressButton: () => {
						Dialog.hide();
						onSignin!(email, password).catch((error) => {
							console.error('Error during sign-in:', error);
						});
					},
				});
			} else {
				Dialog.show({
					type: ALERT_TYPE.WARNING,
					title: 'Oops!!',
					textBody: 'Kode OTP tidak valid!',
					button: 'OK',
					onPressButton: () => Dialog.hide(),
				});
			}
		} catch (error) {
			console.error('Error verifying OTP:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [timer]);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<SafeAreaView className='flex-1 bg-white'>
					<View className='items-center flex-1 gap-3'>
						<View className='px-10 py-5'>
							<Text
								style={{ fontSize: 26 }}
								className='text-center font-poppins-bold text-black-200'
							>
								Kode OTP
							</Text>
							<Text
								style={{ fontSize: 16, color: '#7A7A7A' }}
								className='pt-5 leading-normal text-center font-poppins'
							>
								Kami mengirimkan kode OTP melalui email ke {email}
							</Text>
						</View>
						<View
							style={{
								width: '100%',
							}}
						>
							<OTPTextView
								ref={input}
								handleTextChange={setOtpInput}
								handleCellTextChange={handleCellTextChange}
								inputCount={6}
								keyboardType='numeric'
								autoFocus
								textInputStyle={{
									width: Dimensions.get('screen').width * 0.1,
									height: Dimensions.get('screen').width * 0.15,
								}}
								containerStyle={{
									flexDirection: 'row',
									justifyContent: 'center',
									width: '100%',
								}}
							/>
							<TextInput maxLength={6} onChangeText={setOtpInput} />
						</View>
						<View className='flex-row gap-1'>
							<Text
								style={{ fontSize: 16, color: '#7A7A7A' }}
								className='leading-normal text-center font-poppins'
							>
								Minta kode lagi di
							</Text>
							{timer > 0 ? (
								<Text
									style={{ fontSize: 16, color: '#288A53' }}
									className='leading-normal text-center font-poppins-bold'
								>
									{formatTime(timer)}
								</Text>
							) : (
								<TouchableOpacity onPress={handleResendOTP} activeOpacity={0.8}>
									<Text
										style={{ fontSize: 16, color: '#288A53' }}
										className='leading-normal text-center font-poppins-bold'
									>
										Kirim Ulang
									</Text>
								</TouchableOpacity>
							)}
						</View>
					</View>
					<View className='w-full gap-3 px-10'>
						{otpInput.trim() !== '' && (
							<Button
								text='Verifikasi'
								onPress={verifyOTP}
								color1='#49A18C'
								color2='#3D8D7A'
								clsnm='mb-10 '
							/>
						)}
					</View>
				</SafeAreaView>
			)}
		</>
	);
}
