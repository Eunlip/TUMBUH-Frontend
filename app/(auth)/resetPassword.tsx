import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useLocalSearchParams, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import Loading from '../loading';

export default function ChangePassword() {
	const { token, email } = useLocalSearchParams();
	const [formData, setFormData] = useState<{
		password: string;
		confirmPassword: string;
	}>({
		password: '',
		confirmPassword: '',
	});
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { resetPassword } = useAuth();
	const router = useRouter();

	const handleChangePassword = async () => {
		setIsLoading(true);
		try {
			const { password, confirmPassword } = formData;

			if (!password || !confirmPassword) {
				Dialog.show({
					type: ALERT_TYPE.WARNING,
					title: 'Oops!!',
					textBody: 'Password dan konfirmasi password harus diisi!',
					button: 'OK',
					onPressButton: () => Dialog.hide(),
				});
				return;
			}

			if (password !== confirmPassword) {
				Dialog.show({
					type: ALERT_TYPE.WARNING,
					title: 'Oops!!',
					textBody: 'Password dan konfirmasi password tidak sama!',
					button: 'OK',
					onPressButton: () => Dialog.hide(),
				});
				return;
			}

			if (typeof email === 'string' && typeof token === 'string') {
				const response = await resetPassword!(email, password, token);

				if (response && response.status === 200) {
					Dialog.show({
						type: ALERT_TYPE.SUCCESS,
						title: 'Berhasil!',
						textBody: 'Password berhasil diubah!',
						button: 'OK',
						onPressButton: () => {
							Dialog.hide();
							router.replace('/signIn');
						},
					});
				}
			} else {
				throw new Error('Invalid email or token');
			}
		} catch (error) {
			if (error instanceof Error) {
				Dialog.show({
					type: ALERT_TYPE.WARNING,
					title: 'Oops!!',
					textBody: error.message,
					button: 'OK',
					onPressButton: () => Dialog.hide(),
				});
			} else {
				Dialog.show({
					type: ALERT_TYPE.WARNING,
					title: 'Oops!!',
					textBody: 'Terjadi kesalahan, silakan coba lagi.',
					button: 'OK',
					onPressButton: () => Dialog.hide(),
				});
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<SafeAreaView className='flex-1 px-10 pt-5 pb-10 bg-white'>
					<View className='items-center flex-1 gap-3'>
						<Text
							style={{ fontSize: 26 }}
							className='text-center capitalize font-poppins-bold text-black-200'
						>
							Ubah Password
						</Text>
						<Text
							style={{ fontSize: 16, color: '#7A7A7A' }}
							className='leading-normal text-center font-poppins'
						>
							Masukkan password baru untuk mengubah password lama anda
						</Text>
						<View style={{ width: '100%', marginTop: 30, gap: 20 }}>
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
							<Input
								label='Password'
								placeholder='Konfirmasi Password'
								placeholderTextColor='#686868'
								onChangeText={(text: string) => {
									setFormData({ ...formData, confirmPassword: text });
								}}
								value={formData.confirmPassword}
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
						</View>
					</View>
					<View className='w-full gap-3'>
						<Button
							text='Ubah'
							onPress={handleChangePassword}
							color1='#49A18C'
							color2='#3D8D7A'
							isLoading={isLoading}
						/>
					</View>
				</SafeAreaView>
			)}
		</>
	);
}
