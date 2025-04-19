import { MateriBelajar } from '@/types/materi';

export const dummyMateri: MateriBelajar[] = [
	{
		id: 1,
		title: 'Selada',
		image:
			'https://images.unsplash.com/photo-1556781366-336f8353ba7c?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		description:
			'Selada adalah sayuran populer dengan beragam varietas seperti selada bibit, romawi, hijau, dan merah. Untuk tumbuh dengan baik, selada memerlukan sinar matahari cukup, tanah subur, dan penyiraman teratur. Kandungan serat, vitamin, dan mineral dalam selada memberikan manfaat kesehatan untuk pencernaan, jantung, dan tulang.',
		video: [
			{
				id: 1,
				title: 'Selada Dalam Masakan',
				url: 'https://www.youtube.com/watch?v=example1',
				thumbnail:
					'https://images.unsplash.com/photo-1556781366-336f8353ba7c?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			},
		],
		article: [
			{
				id: 1,
				author: 'John Doe',
				date: new Date('2023-10-01'),
				title: 'Selada',
				content:
					'Selada adalah sayuran populer dengan beragam varietas seperti selada bibit, romawi, hijau, dan merah. Untuk tumbuh dengan baik, selada memerlukan sinar matahari cukup, tanah subur, dan penyiraman teratur. Kandungan serat, vitamin, dan mineral dalam selada memberikan manfaat kesehatan untuk pencernaan, jantung, dan tulang.',
			},
		],
		quiz: [
			{
				id: 1,
				title: 'Selada',
				url: 'https://www.example.com/quiz1',
			},
		],
	},
];
