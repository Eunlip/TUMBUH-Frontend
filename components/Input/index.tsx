import { KeyboardTypeOptions, TextInput, View } from 'react-native';

type InputProps = Readonly<{
	label?: string;
	placeholder: string;
	placeholderTextColor?: string;
	secureTextEntry?: boolean;
	onChangeText: (value: string) => void;
	keyboardType?: KeyboardTypeOptions;
	clsnm?: string;
	leftIcon?: React.ReactNode;
	iconClsnm?: string;
	value: string;
	rightIcon?: React.ReactNode;
	selectionColor?: string;
	textSize?: string;
	textColor?: string;
}>;

export default function Input({
	label,
	placeholder,
	placeholderTextColor,
	secureTextEntry,
	onChangeText,
	keyboardType,
	clsnm,
	leftIcon,
	iconClsnm,
	value,
	rightIcon,
	selectionColor,
	textSize,
	textColor,
}: InputProps) {
	return (
		<View className='flex gap-2'>
			{/* Optional Label */}
			{/* {label && <Text className='text-black-100 font-poppins-medium'>{label}</Text>} */}
			<View className={`flex-row items-center w-full border rounded-2xl ${clsnm}`}>
				{/* Left Icon */}
				{leftIcon && <View className={`${iconClsnm}`}>{leftIcon}</View>}
				{/* Text Input */}
				<TextInput
					className={`flex-1 ${textColor ?? 'text-black'} ${textSize ?? 'text-xl'} mr-7`}
					placeholder={placeholder}
					placeholderTextColor={placeholderTextColor ?? '#CFCFCF'}
					onChangeText={onChangeText}
					keyboardType={keyboardType}
					secureTextEntry={secureTextEntry}
					value={value}
					selectionColor={selectionColor}
				/>
				{/* Right Icon */}
				{rightIcon && <View className='absolute right-5'>{rightIcon}</View>}
			</View>
		</View>
	);
}
