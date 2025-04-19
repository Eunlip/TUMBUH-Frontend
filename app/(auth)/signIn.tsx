import GoogleIcon from '@/assets/icons/Google.png';
import ImageInAuth from '@/assets/images/top-auth.png';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/context/AuthContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
	Image,
	ImageBackground,
	Pressable,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import Loading from '../loading';

export default function SignIn() {
	const [formData, setFormData] = useState<{
		email: string;
		password: string;
	}>({
		email: '',
		password: '',
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const { onSignin, GoogleSignin } = useAuth();
	const router = useRouter();

	const handleSignin = async () => {
		setIsLoading(true);
		try {
			const { email, password } = formData;

			if (!email || !password) {
				Dialog.show({
					type: ALERT_TYPE.WARNING,
					title: 'Oops!!',
					textBody: 'Email dan password harus diisi!',
					button: 'OK',
					onPressButton: () => Dialog.hide(),
				});
				return;
			}

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				Dialog.show({
					type: ALERT_TYPE.WARNING,
					title: 'Oops!!',
					textBody: 'Kolom email harus berupa alamat email yang valid',
					button: 'OK',
					onPressButton: () => Dialog.hide(),
				});
				return;
			}

			const result = await onSignin!(email, password);

			if (result.error) {
				Dialog.show({
					type: ALERT_TYPE.WARNING,
					title: 'Oops!!',
					textBody: 'Email atau password salah!',
					button: 'OK',
					onPressButton: () => Dialog.hide(),
				});
				return;
			}
		} catch (error: any) {
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Oops!!',
				textBody: error.message ?? 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.',
				button: 'OK',
				onPressButton: () => Dialog.hide(),
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSignIn = async () => {
		setIsLoading(true);
		try {
			const result = await GoogleSignin();

			if (result.error) {
				Dialog.show({
					type: ALERT_TYPE.WARNING,
					title: 'Oops!!',
					textBody: result.message,
					button: 'OK',
					onPressButton: () => Dialog.hide(),
				});
				return;
			}
		} catch (error: any) {
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Oops!!',
				textBody: error.message ?? 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.',
				button: 'OK',
				onPressButton: () => Dialog.hide(),
			});
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<View className='flex-1'>
			{/* Status Bar */}
			<StatusBar translucent backgroundColor='transparent' barStyle='light-content' />

			<ImageBackground source={ImageInAuth} style={{ width: '100%', height: 300 }} />
			<View className='flex-1 w-full p-10 bg-white rounded-t-[30px] absolute bottom-0 top-64'>
				<View className='flex gap-5'>
					<Input
						label='Email Address'
						placeholder='Email Address'
						placeholderTextColor='#686868'
						keyboardType='email-address'
						onChangeText={(text: string) => {
							setFormData({ ...formData, email: text });
						}}
						value={formData.email}
						leftIcon={<MaterialIcons name='email' size={24} color='#4F6F52' />}
						clsnm='px-5 py-1 h-16 border-green-700'
						iconClsnm='mr-3'
					/>
					<Input
						label='Password'
						placeholder='Password'
						placeholderTextColor='#686868'
						onChangeText={(text: string) => {
							setFormData({ ...formData, password: text });
						}}
						value={formData.password}
						leftIcon={<FontAwesome name='lock' size={25} color='#4F6F52' />}
						clsnm='px-6 py-1 h-16 border-green-700'
						secureTextEntry={!isPasswordVisible}
						rightIcon={
							<TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
								<FontAwesome
									name={isPasswordVisible ? 'eye' : 'eye-slash'}
									size={20}
									color='#4F6F52'
								/>
							</TouchableOpacity>
						}
						iconClsnm='mr-4'
					/>
					<Pressable onPress={() => router.push('./forgotPassword')} className='self-end'>
						<Text className='text-right text-black-300 font-poppins-medium'>Lupa Password?</Text>
					</Pressable>
				</View>
				<View className='flex gap-5 mt-6'>
					<Button
						text='Masuk'
						onPress={handleSignin}
						color1='#49A18C'
						color2='#3D8D7A'
						isLoading={isLoading}
					/>

					<View className='flex-row items-center justify-center gap-3'>
						<View style={styles.line} />
						<Text className='text-black-100 font-poppins-medium'>atau</Text>
						<View style={styles.line} />
					</View>

					<Button
						text='Masuk dengan Google'
						textSize='text-xl'
						onPress={handleGoogleSignIn}
						color1='transparent'
						color2='transparent'
						textColor='text-black-200'
						border='border border-[#d7d7d7]'
						opacity={0.6}
						icon={<Image source={GoogleIcon} resizeMode='contain' className='w-7 h-7' />}
						isLoading={isLoading}
					/>
				</View>
				<View className='flex-row items-end justify-center flex-1'>
					<Text className='font-poppins-medium'>Belum punya akun? </Text>
					<Pressable onPress={() => router.push('./signUp')}>
						<Text className='text-[#3D8D7A] font-poppins-semiBold'>Daftar</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	line: {
		flex: 1,
		height: 1,
		backgroundColor: '#DCDCDC',
	},
});
