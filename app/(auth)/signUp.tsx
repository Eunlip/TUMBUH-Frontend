import ImageInAuth from '@/assets/images/top-auth.png';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/context/AuthContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
	Image,
	ImageBackground,
	Pressable,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import Loading from '../loading';

export default function SignUp() {
	const [formData, setFormData] = useState<{
		username: string;
		email: string;
		password: string;
	}>({
		username: '',
		email: '',
		password: '',
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const { onSignup } = useAuth();

	const [isChecked, setIsChecked] = useState(false);
	const router = useRouter();

	const handleSignup = async () => {
		setIsLoading(true);
		try {
			const { username, email, password } = formData;

			if (!username || !email || !password) {
				Dialog.show({
					type: ALERT_TYPE.WARNING,
					title: 'Oops!!',
					textBody: 'Username, email, dan password harus diisi!',
					button: 'OK',
					onPressButton: () => Dialog.hide(),
				});
				return;
			}

			const usernameRegex = /^\w+$/;
			if (!usernameRegex.test(username)) {
				Dialog.show({
					type: ALERT_TYPE.WARNING,
					title: 'Oops!!',
					textBody: 'Username hanya boleh mengandung huruf, angka, dan garis bawah',
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

			const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?!.*\s).{6,}$/;
			if (!passwordRegex.test(password)) {
				Dialog.show({
					type: ALERT_TYPE.WARNING,
					title: 'Oops!!',
					textBody:
						'Password harus minimal 6 karakter. \n\n Termasuk huruf dan angka. \n\n Tidak boleh mengandung spasi',
					button: 'OK',
					onPressButton: () => Dialog.hide(),
				});
				return;
			}

			if (!isChecked) {
				Dialog.show({
					type: ALERT_TYPE.WARNING,
					title: 'Oops!!',
					textBody: 'Anda harus menyetujui syarat dan ketentuan',
					button: 'OK',
					onPressButton: () => Dialog.hide(),
				});
				return;
			}

			const result = await onSignup!(username, email, password);

			if (result.error) {
				Dialog.show({
					type: ALERT_TYPE.DANGER,
					title: 'ERROR!!',
					textBody: result.message,
					button: 'OK',
					onPressButton: () => Dialog.hide(),
				});
				return;
			} else {
				router.replace({
					pathname: './kodeOtp',
					params: { email: formData.email, password: formData.password },
				});
			}
		} catch (error: any) {
			console.error('Signup error:', error);
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'ERROR!!',
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
			{/*  Status Bar */}
			<StatusBar translucent backgroundColor='transparent' barStyle='light-content' />

			<ImageBackground source={ImageInAuth} style={{ width: '100%', height: 300 }} />
			<Image source={ImageInAuth} resizeMode='cover' className='w-full h-72' />
			<View className='flex-1 w-full p-10 bg-white rounded-t-[30px] absolute bottom-0 top-64'>
				<View className='flex gap-5 mb-8'>
					<Input
						label='Username'
						placeholder='Username'
						placeholderTextColor='#686868'
						onChangeText={(text: string) => {
							setFormData({ ...formData, username: text });
						}}
						leftIcon={<FontAwesome name='user' size={24} color='#4F6F52' />}
						clsnm='px-6 py-1 h-16 border-green-700'
						iconClsnm='mr-4'
						value={formData.username}
					/>
					<Input
						label='Email Address'
						placeholder='Email Address'
						placeholderTextColor='#686868'
						keyboardType='email-address'
						onChangeText={(text: string) => {
							setFormData({ ...formData, email: text });
						}}
						leftIcon={<MaterialIcons name='email' size={24} color='#4F6F52' />}
						clsnm='px-5 py-1 h-16 border-green-700'
						iconClsnm='mr-3'
						value={formData.email}
					/>
					<Input
						label='Password'
						placeholder='Password'
						placeholderTextColor='#686868'
						onChangeText={(text: string) => {
							setFormData({ ...formData, password: text });
						}}
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
						value={formData.password}
					/>
					<View className='flex-row gap-3' style={{ marginTop: 10 }}>
						<Checkbox
							style={{ marginTop: 3, borderRadius: 5 }}
							color='#686868'
							value={isChecked}
							onValueChange={setIsChecked}
						/>
						<View className='flex-row flex-wrap items-center w-full'>
							<Text className='text-sm text-right text-black-300 font-poppins text-wrap'>
								Saya setuju dengan{' '}
							</Text>
							<Text className='text-sm text-right text-[#328BF0] font-poppins-medium text-wrap'>
								Syarat & Ketentuan{' '}
							</Text>
							<Text className='text-sm text-right text-black-300 font-poppins'>dan </Text>
							<Text className='text-sm text-right text-[#328BF0] font-poppins-medium text-wrap'>
								Kebijakan Privasi
							</Text>
						</View>
					</View>
				</View>
				<Button
					text='Daftar'
					onPress={handleSignup}
					color1='#49A18C'
					color2='#3D8D7A'
					isLoading={isLoading}
				/>
				<View className='flex-row items-end justify-center flex-1'>
					<Text className='font-poppins-medium'>Sudah punya akun? </Text>
					<Pressable onPress={() => router.push('./signIn')}>
						<Text className='text-[#3D8D7A] font-poppins-semiBold'>Masuk</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}
