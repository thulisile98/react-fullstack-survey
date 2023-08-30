import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Questionnaires } from './Questionnaires.css';

export default function Questionnaire({
    setAgreeCount,
    setNeutralCount,
    setDisagreeCount
}) {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const questionRef = collection(db, 'questions');
                const snapshot = await getDocs(questionRef); 
                const questionList = snapshot.docs.map(doc => doc.data().question);
                setQuestions(questionList);
                setResponses(new Array(questionList.length).fill(null));
            } catch (error) {
                console.error('Error fetching questions: ', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleResponseChange = (index, value) => {
        const newResponses = [...responses];
        newResponses[index] = value;
        setResponses(newResponses);
    };

    const handleSubmit = async () => {
        try {
            const surveyRef = collection(db, 'survey');
            const surveyData = responses.map((response, index) => ({
                question: questions[index], 
                response: response
            }));
            await addDoc(surveyRef, { responses: surveyData });
            console.log('Survey data submitted successfully.');

            
            const agreeResponses = surveyData.filter(response => response.response === '1');
            const neutralResponses = surveyData.filter(response => response.response === '2');
            const disagreeResponses = surveyData.filter(response => response.response === '3');

          
            console.log('Agree Responses:', agreeResponses.length);
            console.log('Neutral Responses:', neutralResponses.length);
            console.log('Disagree Responses:', disagreeResponses.length);

            setAgreeCount(agreeResponses.length);
            setNeutralCount(neutralResponses.length);
            setDisagreeCount(disagreeResponses.length);


            navigate("/");
        } catch (error) {
            console.error('Error submitting survey data: ', error);
        }
    };

    return (
        <div className="container-table">
            <div className="checkScale">
                <h2>Indicate whether you  agree, neutral or disagree</h2>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Questions</th>
                        <th>Agree</th>
                        <th>Neutral</th>
                        <th>Disagree</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question, index) => (
                        <tr key={index}>
                            <td>{question}</td>
                            <td>
                                <input
                                    type="radio"
                                    name={`response_${index}`}
                                    value="1"
                                    checked={responses[index] === "1"}
                                    onChange={() => handleResponseChange(index, "1")}
                                />
                            </td>
                            <td>
                                <input
                                    type="radio"
                                    name={`response_${index}`}
                                    value="2"
                                    checked={responses[index] === "2"}
                                    onChange={() => handleResponseChange(index, "2")}
                                />
                            </td>
                            <td>
                                <input
                                    type="radio"
                                    name={`response_${index}`}
                                    value="3"
                                    checked={responses[index] === "3"}
                                    onChange={() => handleResponseChange(index, "3")}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-outline-danger" onClick={handleSubmit}>
                 Submit
            </button>
        
        </div>
    );
}
