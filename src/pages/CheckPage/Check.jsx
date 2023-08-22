import React, { useEffect, useState } from 'react'
import HeaderNav from '../../components/HeaderNav/HeaderNav'
import { Container } from 'react-bootstrap'
import LoginHeader from '../../components/LoginHeader/LoginHeader'
import PageTitle from '../../components/PageTitle/PageTitle'
import { createAxios } from '../../api/axiosInstance'
import Form from 'react-bootstrap/Form';
import './Check.scss'

function Check() {
	const [answerSheet, setAnswerSheet] = useState(null);
	const [highClassCategory, setHighClassCategory] = useState([]);
	const [selectedHighClass, setSelectedHighClass] = useState(null);

	const [middleClassCategory, setMiddleClassCategory] = useState([]);
	const [selectedMiddleClass, setSelectedMiddleClass] = useState([]);

	const [lowClassCategory, setLowClassCategory] = useState([]);
	const [selectedLowClass, setSelectedLowClass] = useState([]);

	const handleHighClassChange = (e) => {
		const selectedValue = e.target.value;
		setSelectedHighClass(selectedValue);

		createAxios.get(`/facilities/middle-class/${selectedValue}`)
			.then(response => {
				setMiddleClassCategory(response.data)
			})
	}

	const handleMiddleClassChange = (e) => {
		const selectedValue = e.target.value;
		setSelectedMiddleClass(selectedValue);

		createAxios.get(`/facilities/low-class/${selectedValue}`)
			.then(response => {
				setLowClassCategory(response.data)
			})
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
								{highClassCategory.map(item => (
									<option key={item.id} value={item.id}>
										{item.facility_code}
									</option>
								))}
							</Form.Select>
						</div>

						<div className='select-wrap'>
							<div className='category-title'>중분류</div>
							{/* <Form.Select onChange={handleMiddleClassChange} disabled={!selectedHighClass}> */}
							<Form.Select onChange={handleMiddleClassChange} disabled={!selectedHighClass}>
								{!selectedHighClass && <option>대분류를 먼저 선택해주세요</option>}
								{middleClassCategory.map(item => (
									<option key={item.id} value={item.id}>
										{item.facility_code}
									</option>
								))}
							</Form.Select>
						</div>

						<div className='select-wrap'>
							<div className='category-title'>소분류</div>
							<Form.Select disabled={!selectedMiddleClass}>
								{!selectedMiddleClass && <option>중분류를 먼저 선택해주세요</option>}
								{lowClassCategory.map(item => (
									<option key={item.id} value={item.id}>
										{item.facility_code}
									</option>
								))}
							</Form.Select>
						</div>
					</div>

				</div>
			</Container>
		</div>
	)
}

export default Check