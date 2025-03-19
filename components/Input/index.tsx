import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native';
import React from 'react';

type InputProps = {
	label?: string;
	placeholder: string;
	secureTextEntry?: boolean;
	onChangeText: (value: string) => void;
	keyboardType?: KeyboardTypeOptions;
	clsnm?: string;
	icon?: React.ReactNode;
	iconClsnm?: string;
};

export default function Input({
	label,
	placeholder,
	secureTextEntry,
	onChangeText,
	keyboardType,
	clsnm,
	icon,
	iconClsnm,
}: Readonly<InputProps>) {
	return (
		<View className='flex gap-2'>
			{/* {label && <Text className='text-black-100 font-poppins-medium'>{label}</Text>} */}
			<View
				className={`flex-row items-center w-full border border-[#DEDEDE] rounded-2xl h-16 ${clsnm}`}
			>
				{icon && <View className={`${iconClsnm}`}>{icon}</View>}
				<TextInput
					className={`flex-1 text-xl`}
					placeholder={placeholder}
					onChangeText={onChangeText}
					keyboardType={keyboardType}
					secureTextEntry={secureTextEntry}
				/>
			</View>
		</View>
	);
}
