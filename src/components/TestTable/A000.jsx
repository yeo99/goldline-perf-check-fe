import React from 'react'

function A000() {
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

	
  return (
    <div className='check-page-table-container'>
      A000
    </div>
  )
}

export default A000