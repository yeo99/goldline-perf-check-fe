import React, { useEffect, useState } from 'react'
import HeaderNav from '../../components/HeaderNav/HeaderNav'
import { Container } from 'react-bootstrap'
import LoginHeader from '../../components/LoginHeader/LoginHeader'
import PageTitle from '../../components/PageTitle/PageTitle'
import { createAxios } from '../../api/axiosInstance'
import Form from 'react-bootstrap/Form';
import './Check.scss'

function Check() {
	const [question, setQuestion] = useState(null);

	const [highClassCategory, setHighClassCategory] = useState([]);
	const [selectedHighClass, setSelectedHighClass] = useState(null);

	const [middleClassCategory, setMiddleClassCategory] = useState([]);
	const [selectedMiddleClass, setSelectedMiddleClass] = useState([]);

	const [lowClassCategory, setLowClassCategory] = useState([]);
	const [selectedLowClass, setSelectedLowClass] = useState([]);

	const [lowestClassCategory, setLowestClassCategory] = useState([]);
	const [selectedLowestClass, setSelectedLowestClass] = useState([]);

	// 대분류 선택시 중분류 API 요청
	const handleHighClassChange = (e) => {
		const selectedValue = e.target.value;
		setSelectedHighClass(selectedValue);

		createAxios.get(`/facilities/middle-class/${selectedValue}`)
			.then(response => {
				if (response.data && response.data.length > 0) {
					setMiddleClassCategory(response.data)
				} else {
					fetchQuestionAsCategory(selectedValue)
				}
			})
	}

	// 중분류 선택시 소분류 API 요청
	const handleMiddleClassChange = (e) => {
		const selectedValue = e.target.value;
		setSelectedMiddleClass(selectedValue);

		createAxios.get(`/facilities/low-class/${selectedValue}`)
			.then(response => {
				if (response.data && response.data.length > 0) {
					setLowClassCategory(response.data)
				} else {
					fetchQuestionAsCategory(selectedValue)
				}
			})
	}
	
	// 소분류 선택시 세분류 API 요청
	const handleLowClassChange = (e) => {
		const selectedValue = e.target.value;
		setSelectedLowClass(selectedValue);

		createAxios.get(`/facilities/lowest-class/${selectedValue}`)
			.then(response => {
				if (response.data && response.data.length > 0) {
					setLowestClassCategory(response.data)
					fetchQuestionAsCategory(selectedValue)
				}
			})
	}

	// 검사지를 가져옴
	const fetchQuestionAsCategory = async (category) => {
		try {
			
		} catch(error) {

		}
	}

	useEffect(() => {
		// 대분류 코드 API 요청
		createAxios.get('/facilities/high-class/')
			.then(response => {
				setHighClassCategory(response.data)
			})
			.catch(error => {
				console.error('Error fetching high class categories:', error);
			})
	}, []);

	return (
		<div className='check-page-container'>
			<LoginHeader></LoginHeader>
			<HeaderNav></HeaderNav>
			<Container>
				<div className='inner-container'>
					<div className='select-container'>
						<PageTitle pageTitle="평가 작성"></PageTitle>
						<div className='select-wrap'>
							<div className='category-title'>대분류</div>
							<Form.Select onChange={handleHighClassChange}>
								<option value="" disabled selected>대분류를 선택해주세요</option>
								{highClassCategory.map(item => (
									<option key={item.id} value={item.id}>
										{item.facility_code}
									</option>
								))}
							</Form.Select>
						</div>

						{middleClassCategory.length > 0 && (
							<div className='select-wrap'>
								<div className='category-title'>중분류</div>
								<Form.Select onChange={handleMiddleClassChange}>
									<option value="" disabled selected>중분류를 선택해주세요</option>
									{middleClassCategory.map(item => (
										<option key={item.id} value={item.id}>
											{item.facility_code}
										</option>
									))}
								</Form.Select>
							</div>
						)}

						{lowClassCategory.length > 0 && (
							<div className='select-wrap'>
								<div className='category-title'>소분류</div>
								<Form.Select onChange={handleLowClassChange}>
									<option value="" disabled selected>소분류를 선택해주세요</option>
									{lowClassCategory.map(item => (
										<option key={item.id} value={item.id}>
											{item.facility_code}
										</option>
									))}
								</Form.Select>
							</div>
						)}

						{lowestClassCategory.length > 0 && (
							<div className='select-wrap'>
								<div className='category-title'>세분류</div>
								<Form.Select>
									<option value="" disabled selected>세분류를 선택해주세요</option>
									{lowestClassCategory.map(item => (
										<option key={item.id} value={item.id}>
											{item.facility_code}
										</option>
									))}
								</Form.Select>
							</div>
						)}
					</div>

				</div>
			</Container>
		</div>
	)
}

export default Check