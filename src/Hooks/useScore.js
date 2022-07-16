import { useEffect, useState } from "react";

const useScore = (score)=>{
    console.log('score',score);
    const [result, setResult] = useState('');
    const [grade, setGrade] = useState('');

    useEffect(() => {
        if (score >= 0 && score < 31) {
            setResult('Failed');
            setGrade('Poor');
        } else if (score >= 31 && score < 76) {
            setResult('Passed');
            setGrade('Average');
        } else if (score >= 76 && score < 101) {
            setResult('Passed');
            setGrade('Excellent');
        }
        else {
            setResult(' ');
            setGrade(' ');
        }
    }, [score]);
    
    return [result,grade];
}
export default useScore;