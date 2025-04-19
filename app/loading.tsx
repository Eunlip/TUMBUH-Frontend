import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default function Loading() {
	const [dots, setDots] = useState<string>('');

	useEffect(() => {
		let increasing = true;
		const interval = setInterval(() => {
			setDots((prev) => {
				if (increasing) {
					// Jika bertambah, tambahkan titik
					if (prev.length < 3) {
						return prev + '.';
					} else {
						increasing = false;
						return prev.slice(0, -1);
					}
				} else if (prev.length > 0) {
					// Jika menurun, kurangi titik
					return prev.slice(0, -1);
				} else {
					increasing = true; // Ubah arah ke bertambah
					return prev + '.';
				}
			});
		}, 400);

		return () => clearInterval(interval);
	}, []);

	return (
		<View className='items-center justify-center flex-1 gap-3 bg-white'>
			<Text className='text-3xl font-poppins-bold text-green'>Sebentar ya {dots}</Text>
		</View>
	);
}
