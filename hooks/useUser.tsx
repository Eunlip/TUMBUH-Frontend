import { API_URL } from '@/context/AuthContext';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface UserDetail {
	id: string;
	username: string;
	email: string;
	[key: string]: any; // Extendable for additional user properties
}

const useUserDetail = () => {
	const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUserDetail = async () => {
			try {
				setLoading(true);
				setError(null);

				const response = await axios.get(`${API_URL}/user`);
				const data: UserDetail = response.data;
				setUserDetail(data);
			} catch (err: any) {
				setError(err.response?.data?.message ?? err.message ?? 'An error occurred');
			} finally {
				setLoading(false);
			}
		};

		fetchUserDetail();
	}, []);

	return { userDetail, loading, error };
};

export default useUserDetail;
