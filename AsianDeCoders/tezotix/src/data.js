import { useState, useEffect } from "react";
import poster from "./assets/oppenheimer.png";
import { fetchMoviesStorage } from "./utils/tzkt";

const searchResults = [
	{
		name: "PVR VEGA Bengaluru",
		state: "Bangalore",
		location:
			"PVR Cinemas, 4th and 5th Floor, Vega City Mall,172/1, Bannerghatta Main Road, JP Nagar 3rd Phase, Dollar Layout, Bengaluru, Karnataka 560076, India",
		activeMovies: [
			{
				id: 1,
				poster: poster,
				name: "Oppenheimer",
				description:
					"During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.",
				location: "INOX: Odeon, Connaught Place",
				screenNo: "5",
				price: 0.6,
				dates: [
					{
						date: "26 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "D3"],
							},
							{
								time: "19:00",
								booked: ["A1", "B2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "27 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "28 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "29 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
				],
			},
			{
				id: 2,
				poster: poster,
				name: "Oppenheimer",
				description:
					"During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.",
				location: "INOX: Odeon, Connaught Place",
				screenNo: "5",
				price: 0.6,
				dates: [
					{
						date: "26 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "D3"],
							},
							{
								time: "19:00",
								booked: ["A1", "B2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "27 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "28 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "29 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
				],
			},
			{
				id: 3,
				poster: poster,
				name: "Oppenheimer",
				description:
					"During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.",
				location: "INOX: Odeon, Connaught Place",
				screenNo: "5",
				price: 0.6,
				dates: [
					{
						date: "26 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "D3"],
							},
							{
								time: "19:00",
								booked: ["A1", "B2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "27 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "28 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "29 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
				],
			},
			{
				id: 1,
				poster: poster,
				name: "Oppenheimer",
				description:
					"During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.",
				location: "INOX: Odeon, Connaught Place",
				screenNo: "5",
				price: 0.6,
				dates: [
					{
						date: "26 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "D3"],
							},
							{
								time: "19:00",
								booked: ["A1", "B2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "27 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "28 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "29 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
				],
			},
		],
	},
	{
		name: "INOX Garuda Mall",
		state: "Bangalore",
		location:
			"Garuda Mall, 4th Floor, Magrath Rd, Ashok Nagar, Bengaluru, Karnataka 560025, India",
		activeMovies: [
			{
				id: 1,
				poster: poster,
				name: "Oppenheimer",
				description:
					"During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.",
				location: "INOX: Odeon, Connaught Place",
				screenNo: "5",
				price: 0.6,
				dates: [
					{
						date: "26 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "D3"],
							},
							{
								time: "19:00",
								booked: ["A1", "B2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "27 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "28 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "29 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
				],
			},
			{
				id: 2,
				poster: poster,
				name: "Oppenheimer",
				description:
					"During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.",
				location: "INOX: Odeon, Connaught Place",
				screenNo: "5",
				price: 0.6,
				dates: [
					{
						date: "26 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "D3"],
							},
							{
								time: "19:00",
								booked: ["A1", "B2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "27 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "28 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "29 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
				],
			},
			{
				id: 3,
				poster: poster,
				name: "Oppenheimer",
				description:
					"During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.",
				location: "INOX: Odeon, Connaught Place",
				screenNo: "5",
				price: 0.6,
				dates: [
					{
						date: "26 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "D3"],
							},
							{
								time: "19:00",
								booked: ["A1", "B2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "27 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "28 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "29 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
				],
			},
		],
	},
	{
		name: "Fun Cinemas, Sigma Mall",
		state: "Bangalore",
		location:
			"Cunningham Road, Vasantha Nagar, Grand Sigma Mall, Bengaluru, Karnataka 560052, India",
		activeMovies: [
			{
				id: 1,
				poster: poster,
				name: "Oppenheimer",
				description:
					"During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.",
				location: "INOX: Odeon, Connaught Place",
				screenNo: "5",
				price: 0.6,
				dates: [
					{
						date: "26 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "D3"],
							},
							{
								time: "19:00",
								booked: ["A1", "B2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "27 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "28 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "29 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
				],
			},
			{
				id: 2,
				poster: poster,
				name: "Oppenheimer",
				description:
					"During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.",
				location: "INOX: Odeon, Connaught Place",
				screenNo: "5",
				price: 0.6,
				dates: [
					{
						date: "26 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "D3"],
							},
							{
								time: "19:00",
								booked: ["A1", "B2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "27 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "28 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "29 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
				],
			},
			{
				id: 3,
				poster: poster,
				name: "Oppenheimer",
				description:
					"During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.",
				location: "INOX: Odeon, Connaught Place",
				screenNo: "5",
				price: 0.6,
				dates: [
					{
						date: "26 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "D3"],
							},
							{
								time: "19:00",
								booked: ["A1", "B2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "27 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "28 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
					{
						date: "29 Aug 2023",
						shows: [
							{
								time: "10:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "15:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "19:00",
								booked: ["A1", "A2", "A3"],
							},
							{
								time: "23:00",
								booked: ["A1", "A2", "A3"],
							},
						],
					},
				],
			},
		],
	},
];

function Data() {
	useEffect(() => {
		fetchData();
	}, []);

	const [searchResults, setSearchResults] = useState([]);

	const fetchData = async () => {
		try {
			const storage = await fetchMoviesStorage();

			const cityID = storage.cityIds;

			const movieDetails = storage.movieDetails;

			const theatreDetails = storage.theatreDetails;

			const cityDetails = storage.cityDetails;

			const movieID = storage.movieID;

			const theatreID = storage.theatreID;

			const Data = [];

			for (let i = 0; i < cityID; i++) {
				const data1 = [];
				const name = cityDetails[i].name;

				const theatreIds = storage.cityDetails[i].theatreIds;

				for (let x = 0; x < theatreID; x++) {
					const data2 = [];
					for (let j = 0; j < theatreIds.length; j++) {
						if (theatreIds[j] == x) {
							console.log(name, x);
							const theatreName = theatreDetails[x].name;
							const address = theatreDetails[x].address;
							const movieIds = theatreDetails[x].movieIds;

							console.log(name, theatreName, movieIds);

							for (let k = 0; k < movieID; k++) {
								for (let l = 0; l < movieIds.length; l++) {
									if (movieIds[l] == k) {
										const movieName = movieDetails[k].name;
										const description = movieDetails[k].description;
										const posterLink = movieDetails[k].posterLink;
										const screenNumber = movieDetails[k].screenNumber;
										const ticketPrice = movieDetails[k].ticketPrice;
										const startingDate = movieDetails[k].startingDate;
										const timeSlot = movieDetails[k].timeSlot;

										const fetchedObject = {
											movieName: movieName,
											description: description,
											posterLink: posterLink,
											screenNumber: screenNumber,
											ticketPrice: ticketPrice,
											startingDate: startingDate, //text
											timeSlot: timeSlot, //text
										};

										data2.push(fetchedObject);
									}
								}
							}

							const fetchedObject = {
								theatreName: theatreName,
								address: address,
								activeMovies: data2,
							};

							data1.push(fetchedObject);
						}
					}
				}

				const fetchedObject = {
					cityName: name,
					theatreDetails: data1,
				};

				Data.push(fetchedObject);
				setSearchResults(Data);
			}
		} catch (e) {
			throw e;
		}
	};
}

export default searchResults;
