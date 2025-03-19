import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type ButtonProps = {
	onPress: () => void;
	text: string;
	textColor?: string;
	clsnm?: string;
	color1: string;
	color2: string;
	border?: string;
	opacity?: number;
	icon?: React.ReactNode;
};

export default function Button({
	onPress,
	text,
	textColor,
	clsnm,
	color1,
	color2,
	border,
	opacity,
	icon,
}: Readonly<ButtonProps>) {
	return (
		<TouchableOpacity
			className={`w-full ${clsnm}`}
			activeOpacity={opacity ?? 0.8}
			onPress={onPress}
		>
			<LinearGradient
				className={`p-5 items-center justify-center ${border} flex-row w-full`}
				style={{ borderRadius: 99 }}
				colors={[color1, color2]}
				start={{ x: 1, y: 0.5 }}
				end={{ x: 1, y: 1 }}
			>
				{icon && <View className='mr-4'>{icon}</View>}
				<Text className={`${textColor ?? 'text-white'} font-semibold text-xl`}>{text}</Text>
			</LinearGradient>
		</TouchableOpacity>
	);
}
