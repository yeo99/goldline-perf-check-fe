import React, { useEffect, useState } from 'react'
import HeaderNav from '../../components/HeaderNav/HeaderNav'
import { Container } from 'react-bootstrap'
import LoginHeader from '../../components/LoginHeader/LoginHeader'
import PageTitle from '../../components/PageTitle/PageTitle'
import { createAxios } from '../../api/axiosInstance'
import Form from 'react-bootstrap/Form';
import './Check.scss'
import Table from 'react-bootstrap/Table'

function Check() {
	const [question, setQuestion] = useState(null);

	const [highClassCategory, setHighClassCategory] = useState([]);
	const [middleClassCategory, setMiddleClassCategory] = useState([]);
	const [lowClassCategory, setLowClassCategory] = useState([]);
	const [lowestClassCategory, setLowestClassCategory] = useState([]);
	
	const [selectedHighClass, setSelectedHighClass] = useState(null);
	const [selectedMiddleClass, setSelectedMiddleClass] = useState(null);
	const [selectedLowClass, setSelectedLowClass] = useState(null);
	const [selectedLowestClass, setSelectedLowestClass] = useState(null);

	const [railWayStation, setRailWayStation] = useState([]);	// 노선명 리스트
	const [railWaySection, setRailWaySection] = useState([]);	// 구간명 리스트

	const [finalSelectedFacilityName, setFinalSelectedFacilityName] = useState(null);
	const [finalSelectedFacilityCode, setFinalSelectedFacilityCode] = useState(null);

	// 대분류 선택시 중분류 API 요청
	const handleHighClassChange = (e) => {
		const selectedValue = e.target.value;
		setSelectedHighClass(selectedValue);
		// 나머지 하위 분류 상태 초기화
		setSelectedMiddleClass(null);
    	setSelectedLowClass(null);
    	setSelectedLowestClass(null);
    	setMiddleClassCategory([]);
    	setLowClassCategory([]);
    	setLowestClassCategory([]);

		createAxios.get(`/facilities/middle-class/${selectedValue}`)
			.then(response => {
				if (response.data && response.data.length > 0) {
					setMiddleClassCategory(response.data)
					// setSelectedMiddleClass(response.data[0].facility_code)
					setFinalSelectedFacilityName(response.data[0].facility_code);
					setFinalSelectedFacilityCode(response.data[0].id);
				} else {
					fetchQuestionAsCategory(finalSelectedFacilityName, finalSelectedFacilityCode);
				}
			})
	}

	// 중분류 선택시 소분류 API 요청
	const handleMiddleClassChange = (e) => {
		const selectedValue = e.target.value;
		setSelectedMiddleClass(selectedValue);
		// 나머지 하위 분류 상태 초기화
		setSelectedLowClass(null);
    	setSelectedLowestClass(null);
    	setLowClassCategory([]);
    	setLowestClassCategory([]);

		createAxios.get(`/facilities/low-class/${selectedValue}`)
			.then(response => {
				if (response.data && response.data.length > 0) {
					setLowClassCategory(response.data)
					// setSelectedLowClass(response.data[0].facility_code)
					setFinalSelectedFacilityName(response.data[0].facility_code)
					setFinalSelectedFacilityCode(response.data[0].id)
				} else {
					fetchQuestionAsCategory(finalSelectedFacilityName, finalSelectedFacilityCode);
				}
			})
	}
	
	// 소분류 선택시 세분류 API 요청
	const handleLowClassChange = (e) => {
		const selectedValue = e.target.value;
		setSelectedLowClass(selectedValue);
		// 나머지 하위 분류 상태 초기화
		setLowestClassCategory([])
		setSelectedLowestClass(null)
		createAxios.get(`/facilities/lowest-class/${selectedValue}`)
			.then(response => {
				if (response.data && response.data.length > 0) {
					setLowestClassCategory(response.data)
					// setSelectedLowestClass(response.data[0].facility_code)
					setFinalSelectedFacilityName(response.data[0].facility_code)
					setFinalSelectedFacilityCode(response.data[0].id)
				} else {
					fetchQuestionAsCategory(finalSelectedFacilityName, finalSelectedFacilityCode);
				}
			})
	}

	// 세분류 변경시
	const handleLowestClassChange = (e) => {
		const selectedValue = e.target.value;
		setSelectedLowestClass(selectedValue);
		
		const selectedLowestClassItem = lowestClassCategory.find(item => item.id === selectedValue);
		if (selectedLowestClassItem) {
			setFinalSelectedFacilityName(selectedLowestClassItem.facility_code);
			setFinalSelectedFacilityCode(selectedLowestClassItem.id);
		}
	
		fetchQuestionAsCategory(finalSelectedFacilityName, finalSelectedFacilityCode);
	}

	// 노션명 API 요청
	const handleRailwayStation = () => {
		createAxios.get('/railway/stations')
			.then(response => {
				setRailWayStation(response.data)
			})
	}

	// 검사지를 가져옴
	const fetchQuestionAsCategory = (finalSelectedFacilityName, finalSelectedFacilityCode) => {
		console.log(finalSelectedFacilityName)
		console.log(finalSelectedFacilityCode)
		try {
			console.log('검사지')
		} catch(error) {

		}
	}
	// const fetchQuestionsForCategory = async (category) => {
	// 	try {
	// 		const response = await fetch(`${process.env.PUBLIC_URL}/${category}.json`);
	// 		if (response.ok) {
	// 			const data = await response.json();
	// 			setQuestions(data);
	// 		} else {
	// 			console.error("Failed to fetch questions for category:", category);
	// 		}
	// 	} catch (error) {
	// 		console.error("Error fetching questions for category:", category, error);
	// 	}
	// }

	useEffect(() => {
		// 대분류 코드 API 요청
		createAxios.get('/facilities/high-class/')
			.then(response => {
				setHighClassCategory(response.data)
			})
			.catch(error => {
				console.error('Error fetching high class categories:', error);
			})
	}, [selectedHighClass]);

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
								<Form.Select onChange={handleLowestClassChange}>
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
				<div className='question-container'>
					<div className='facility-table'>
						<Table bordered>
							<tbody>
								<tr>
									<td rowSpan={4}>시설개요</td>
								</tr>
								<tr>
									<td>노선명</td>
									<td>2</td>
									<td rowSpan={4}>시설명</td>
									<td rowSpan={3}>잠자고싶다</td>
								</tr>
								<tr>
									<td>구간명</td>
									<td>5</td>
								</tr>
								<tr>
									<td>시설분류코드</td>
									<td>8</td>
								</tr>
							</tbody>
    				</Table>
					</div>
					<div className='check-result-table'>
						<Table bordered>
							<thead>
								<tr>
									<th colSpan={7} style={{textAlign:'center'}}>평가결과</th>
								</tr>
								<tr>
									<th>평가부문</th>
									<th>평가항목</th>
									<th>평가기준</th>
									<th>점수</th>
									<th>평가결과(M)</th>
									<th>중요도(F)</th>
									<th>평가지수(M*F)</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td rowSpan={7}>안전성</td>
									<td rowSpan={5}>물리적 상태평가 결과</td>
									<td>불량</td>
									<td>1</td> 
									<td rowSpan={5}></td>
									<td rowSpan={5}></td>
									<td rowSpan={5}></td>
								</tr>
								<tr>
									<td>미흡</td>
									<td>2</td>
								</tr>
								<tr>
									<td>보통</td>
									<td>3</td>
								</tr>
								<tr>
									<td>양호</td>
									<td>4</td>
								</tr>
								<tr>
									<td>우수</td>
									<td>5</td>
								</tr>
								<tr>
									<td rowSpan={2}>내진성능</td>
									<td>내진성능 무</td>
									<td>1</td>
									<td rowSpan={2}></td>
									<td rowSpan={2}></td>
									<td rowSpan={2}></td>
								</tr>
								<tr>
									<td>내진성능 유(내진성능 불필요 포함)</td>
									<td>5</td>
								</tr>
								<tr>
									<td rowSpan={10}>내구성</td>
									<td rowSpan={5}>열차 통과 톤수(누적)</td>
									<td>10억톤 이상</td>
									<td>1</td>
									<td rowSpan={5}></td>
									<td rowSpan={5}></td>
									<td rowSpan={5}></td>
								</tr>
								<tr>
									<td>8억톤 ~ 10억톤 미만</td>
									<td>2</td>
								</tr>
								<tr>
									<td>6억톤 ~ 8억톤 미만</td>
									<td>3</td>
								</tr>
								<tr>
									<td>3억톤 ~ 6억톤 미만</td>
									<td>4</td>
								</tr>
								<tr>
									<td>3억톤 미만</td>
									<td>5</td>
								</tr>
								<tr>
									<td rowSpan={5}>경과연수</td>
									<td>내용연수의 100% 이상</td>
									<td>1</td>
									<td rowSpan={5}></td>
									<td rowSpan={5}></td>
									<td rowSpan={5}></td>
								</tr>
								<tr>
									<td>내용연수의 75% ~ 100% 미만</td>
									<td>2</td>
								</tr>
								<tr>
									<td>내용연수의 50% ~ 75% 미만</td>
									<td>3</td>
								</tr>
								<tr>
									<td>내용연수의 25% ~ 50% 미만</td>
									<td>4</td>
								</tr>
								<tr>
									<td>내용연수의 25% 미만</td>
									<td>5</td>
								</tr>
								<tr>
									<td rowSpan={3}>사용성</td>
									<td rowSpan={3}>재해 발생 횟수(5년 이내)</td>
									<td>2회 이상</td>
									<td>1</td>
									<td rowSpan={3}></td>
									<td rowSpan={3}></td>
									<td rowSpan={3}></td>
								</tr>
								<tr>
									<td>1회</td>
									<td>3</td>
								</tr>
								<tr>
									<td>발생 없음</td>
									<td>5</td>
								</tr>
							</tbody>
						</Table>
					</div>
				</div>
			</Container>
		</div>
	)
}

export default Check