import React, { useEffect, useState } from 'react'
import HeaderNav from '../../components/HeaderNav/HeaderNav'
import { Container } from 'react-bootstrap'
import LoginHeader from '../../components/LoginHeader/LoginHeader'
import PageTitle from '../../components/PageTitle/PageTitle'
import { createAxios } from '../../api/axiosInstance'
import Form from 'react-bootstrap/Form';
import './Check.scss'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { sumOfArray } from '../../utils/sumAllArrayElements'

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

	// 평가 결과를 담는 객체
	const [evaluationResults, setEvaluationResults] = useState({
		stabilityEvaluation: [],
		durabilityEvaluation: [],
		usabilityEvaluation: [],
	});

	// 평가지수 값을 담는다
	const [evaluationIndices, setEvaluationIndices] = useState({
		stabilityIndex: [],
		durabilityIndex: [],
    	usabilityIndex: []
	})
	
	// 중요도 값을 담는다
	const [importances, setImportances] = useState({
		stabilityImportance: [],
		durabilityImportance: [],
		usabilityImportance: []
	});

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
			
		} catch(error) {

		}
	}

	const calculateEvaluationIndex = (category, index, evaluationValue, importanceValue) => {
		const result = evaluationValue * importanceValue;
		
		setEvaluationIndices(prevIndices => {
			let currentIndices = Array.isArray(prevIndices[category]) 
								 ? [...prevIndices[category]] 
								 : new Array(index + 1).fill(0);
			currentIndices[index] = result;
			return { ...prevIndices, [category]: currentIndices };
		});
	};

	const handleEvaluationChange = (category, index, value) => {
		const numericValue = Number(value);
	
		setEvaluationResults(prevState => {
			let updatedState = {...prevState};
			if (!updatedState[category]) {
				updatedState[category] = [];
			}
			updatedState[category][index] = numericValue;
			return updatedState;
		});
	
		// 이 부분이 중요합니다. 중요도가 설정되어 있을 때만 평가지수를 갱신해야 합니다.
		if (importances[category] && importances[category][index] !== undefined) {
			// 바로 평가지수도 갱신
			calculateEvaluationIndex(category, index, numericValue, importances[category][index]);
		}
	};
	
	const handleImportanceChange = (category, index, value) => {
		const numericValue = Number(value);
		
		if (numericValue > 100) {
			alert("개별 중요도는 100을 초과할 수 없습니다.");
			return;
		}
		
		let currentCategoryImportances = [...importances[category]];
		currentCategoryImportances[index] = numericValue;
		
		const currentImportanceSum = currentCategoryImportances.reduce((acc, curr) => acc + curr, 0);
		
		if (currentImportanceSum <= 100) {
			setImportances(prev => ({...prev, [category]: currentCategoryImportances}));
		} else {
			alert("중요도의 합은 100을 넘을 수 없습니다.");
			return;
		}
	
		// 평가지수 계산 및 저장
		// 평가 결과가 이미 설정되어 있다면 평가지수를 업데이트합니다.
		if (evaluationResults[category] && evaluationResults[category][index] !== undefined) {
			calculateEvaluationIndex(category, index, evaluationResults[category][index], numericValue);
		}
	};

	useEffect(() => {
		// 대분류 코드 API 요청
		createAxios.get('/facilities/high-class/')
			.then(response => {
				setHighClassCategory(response.data)
			})
			.catch(error => {
				console.error('Error fetching high class categories:', error);
			})

		// 평가 결과, 중요도 핸들링 코드
		let newEvaluationIndex = {};
		for (let key in evaluationResults) {
			newEvaluationIndex[key] = evaluationResults[key] * importances[key];
		}

		// 평가지수 갱신 로직
		const updatedEvaluationIndices = { ...evaluationIndices };

		for (let key in evaluationResults) {
			// categoryKey 변환 예: stabilityEvaluation -> stabilityIndex
			const categoryKey = key.replace('Evaluation', 'Index');
			
			updatedEvaluationIndices[categoryKey] = evaluationResults[key].map((result, index) => {
				const importanceKey = categoryKey.replace('Index', 'Importance');
				return result * (importances[importanceKey][index] || 0);
			});
		}
		
			setEvaluationIndices(updatedEvaluationIndices);

		// 평가지수 변경
		let totalEvaluationIndex = Object.values(newEvaluationIndex).reduce((acc, curr) => acc + curr, 0);
		// alert(JSON.stringify(evaluationResults));
		// alert(JSON.stringify(importances))
		// alert(JSON.stringify(evaluationIndices))
	}, [selectedHighClass, evaluationResults, importances, evaluationResults]);

	return (
		<div className='check-page-container'>
			<LoginHeader></LoginHeader>
			<HeaderNav></HeaderNav>
			<Container>
				<div className='inner-container'>
					<div className='select-container'>
						<PageTitle pageTitle="평가 작성"></PageTitle>
						<div className='select-wrap'>
							<div className='category-title'><b>대분류</b></div>
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
								<div className='category-title'><b>중분류</b></div>
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
								<div className='category-title'><b>소분류</b></div>
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
								<div className='category-title'><b>세분류</b></div>
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
						<PageTitle pageTitle="성능평가 체크리스트"></PageTitle>
						<Table bordered>
							<tbody>
								<tr>
									<td rowSpan={4}><b>시설개요</b></td>
								</tr>
								<tr>
									<td><b>노선명</b></td>
									<td>양촌역</td>
									<td rowSpan={4}><b>시설명</b></td>
									<td rowSpan={3}>구조물(공통)</td>
								</tr>
								<tr>
									<td><b>구간명</b></td>
									<td>양촌역-구래역</td>
								</tr>
								<tr>
									<td><b>구간명</b></td>
									<td>A000</td>
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
									<td rowSpan={7}><b>안전성</b></td>
									<td rowSpan={5}>물리적 상태평가 결과</td>
									<td>불량</td>
									<td>1</td> 
									<td rowSpan={5}>
										<select onChange={(e) => handleEvaluationChange("stabilityEvaluation", 0, e.target.value)}>
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
											<option>5</option>
										</select>
									</td>
									<td rowSpan={5}>
									<input
										type="number"
										min="0"
										max="100"
										className='importance-input'
										value={importances.stabilityImportance[0] || ""}
										onChange={(e) => handleImportanceChange("stabilityImportance", 0, e.target.value)}
									/>
									</td>
									<td rowSpan={5}>{evaluationIndices.stabilityIndex[0]}</td>
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
									<td rowSpan={2}>
										<select onChange={(e) => handleEvaluationChange("stabilityEvaluation", 1, e.target.value)}>
											<option>1</option>
											<option>5</option>
										</select>
									</td>
									<td rowSpan={2}>
									<input
										type="number"
										min="0"
										max="100"
										className='importance-input'
										value={importances.stabilityImportance[1] || ""}
										onChange={(e) => handleImportanceChange("stabilityImportance", 1, e.target.value)}
									/>
									</td>
									<td rowSpan={2}>{evaluationIndices.stabilityIndex[1]}</td>
								</tr>
								<tr>
									<td>내진성능 유(내진성능 불필요 포함)</td>
									<td>5</td>
								</tr>
								<tr>
									<td rowSpan={10}><b>내구성</b></td>
									<td rowSpan={5}>열차 통과 톤수(누적)</td>
									<td>10억톤 이상</td>
									<td>1</td>
									<td rowSpan={5}>
										<select onChange={(e) => handleEvaluationChange("durabilityEvaluation", 0, e.target.value)}>
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
											<option>5</option>
										</select>
									</td>
									<td rowSpan={5}>
										<input
											type="number"
											min="0"
											max="100"
											className='importance-input'
											value={importances.durabilityImportance[0] || ""}
											onChange={(e) => handleImportanceChange("durabilityImportance", 0, e.target.value)}
										/>
									</td>
									<td rowSpan={5}>{evaluationIndices.durabilityIndex[0]}</td>
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
									<td rowSpan={5}>
										<select onChange={(e) => handleEvaluationChange("durabilityEvaluation", 1, e.target.value)}>
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
											<option>5</option>
										</select>
									</td>
									<td rowSpan={5}>
										<input
											type="number"
											min="0"
											max="100"
											className='importance-input'
											value={importances.durabilityImportance[1] || ""}
											onChange={(e) => handleImportanceChange("durabilityImportance", 1, e.target.value)}
										/>
									</td>
									<td rowSpan={5}>{evaluationIndices.durabilityIndex[1]}</td>
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
									<td rowSpan={3}><b>사용성</b></td>
									<td rowSpan={3}>재해 발생 횟수(5년 이내)</td>
									<td>2회 이상</td>
									<td>1</td>
									<td rowSpan={3}>
										<select onChange={(e) => handleEvaluationChange("usabilityEvaluation", 0, e.target.value)}>
											<option>1</option>
											<option>3</option>
											<option>5</option>
										</select>
									</td>
									<td rowSpan={3}>
										<input
											type="number"
											min="0"
											max="100"
											className='importance-input'
											value={importances.usabilityImportance[0] || ""}
											onChange={(e) => handleImportanceChange("usabilityImportance", 0, e.target.value)}
										/>
									</td>
									<td rowSpan={3}>{evaluationIndices.usabilityIndex[0]}</td>
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
					<div className='result-container'>
						<div className='check-result-score-table'>
							<PageTitle pageTitle="종합평가결과"></PageTitle>
							<Table bordered>
								<thead>
									<tr>
										<th>부문</th>
										<th>평가지수 합계</th>
										<th>부문 중요도</th>
										{/* 중복같다. 문의드려야 함 */}
										{/* <th>평가지수</th> */}
										<th>평가결과 합계</th>
										<th>종합평가지수</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><b>안정성(SF)</b></td>
										<td>{sumOfArray(evaluationIndices.stabilityIndex)}</td>
										<td>{sumOfArray(importances.stabilityImportance)}</td>
										<td>{sumOfArray(evaluationResults.stabilityEvaluation)}</td>
										<td rowSpan={3}>{
											sumOfArray(evaluationIndices.stabilityIndex)+
											sumOfArray(evaluationIndices.durabilityIndex)+
											sumOfArray(evaluationIndices.usabilityIndex)
										}</td>
									</tr>
									<tr>
										<td><b>내구성(D)</b></td>
										<td>{sumOfArray(evaluationIndices.durabilityIndex)}</td>
										<td>{sumOfArray(importances.durabilityImportance)}</td>
										<td>{sumOfArray(evaluationResults.durabilityEvaluation)}</td>
									</tr>
									<tr>
										<td><b>사용성(S)</b></td>
										<td>{sumOfArray(evaluationIndices.usabilityIndex)}</td>
										<td>{sumOfArray(importances.usabilityImportance)}</td>
										<td>{sumOfArray(evaluationResults.usabilityEvaluation)}</td>
									</tr>
								</tbody>
							</Table>
							<div className='check-comment'>
								<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      					  {/* <Form.Label>평가의견 및 기타사항</Form.Label> */}
									<div className='category-title'><b>평가의견 및 기타사항</b></div>
      					  <Form.Control as="textarea" rows={3} />
      					</Form.Group>
							</div>
						</div>
						<div className='check-button-container'>
							<Button className='check-button'>평가 제출</Button>
						</div>
					</div>
				</div>
			</Container>
		</div>
	)
}

export default Check