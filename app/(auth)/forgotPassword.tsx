import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/context/AuthContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPassword() {
	const [email, setEmail] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const { sendResetPassword } = useAuth();

	const handleSendResetLink = async () => {
		setLoading(true);
		try {
			const response = await sendResetPassword!(email);
			if (response && response.status === 200) {
				Dialog.show({
					type: ALERT_TYPE.SUCCESS,
					title: 'Berhasil',
					textBody: 'Tautan reset password telah dikirim ke email Anda.',
					button: 'OK',
					onPressButton: () => {
						Dialog.hide();
					},
				});
			}
		} catch (error: any) {
			Dialog.show({
				type: ALERT_TYPE.WARNING,
				title: 'Oops!!',
				textBody: error.message ?? 'Terjadi kesalahan saat mengirim tautan reset password.',
				button: 'OK',
				onPressButton: () => {
					Dialog.hide();
				},
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView className='flex-1 px-10 pt-5 pb-10 bg-white'>
			<View className='items-center flex-1 gap-5'>
				<View style={{ width: '100%' }}>
					<Input
						label='Email Address'
						placeholder='Email Address'
						placeholderTextColor='#686868'
						keyboardType='email-address'
						value={email}
						onChangeText={(text) => setEmail(text)}
						leftIcon={<MaterialIcons name='email' size={24} color='#4F6F52' />}
						clsnm='px-5 py-1 h-16 border-green-700'
						iconClsnm='mr-3'
					/>
				</View>
				<Text style={{ fontSize: 16, color: '#7A7A7A' }} className='leading-normal font-poppins'>
					Masukkan email untuk menerima tautan reset password.
				</Text>
			</View>
			<View className='w-full gap-3'>
				{email.trim() !== '' && (
					<Button
						text='Kirim'
						onPress={handleSendResetLink}
						color1='#49A18C'
						color2='#3D8D7A'
						isLoading={loading}
					/>
				)}
			</View>
		</SafeAreaView>
	);
}
