import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


function Dashboard() {
    const [questionsCount, setQuestionsCount] = useState(0);
    const [agreeCount, setAgreeCount] = useState(0);
    const [neutralCount, setNeutralCount] = useState(0);
    const [disagreeCount, setDisagreeCount] = useState(0);

    useEffect(() => {
        const fetchQuestionsCount = async () => {
            try {
                const questionRef = collection(db, 'questions');
                const snapshot = await getDocs(questionRef);
                setQuestionsCount(snapshot.size);
            } catch (error) {
                console.error('Error fetching questions count:', error);
            }
        };

        const fetchResponsesCount = async () => {
            try {
                const responseRef = collection(db, 'responses');
                const snapshot = await getDocs(responseRef);
                let agree = 0;
                let neutral = 0;
                let disagree = 0;

                snapshot.forEach((doc) => {
                    const response = doc.data().response;
                    if (response === '1') {
                        agree++;
                    } else if (response === '2') {
                        neutral++;
                    } else if (response === '3') {
                        disagree++;
                    }
                });

                setAgreeCount(agree);
                setNeutralCount(neutral);
                setDisagreeCount(disagree);
            } catch (error) {
                console.error('Error fetching responses count:', error);
            }
        };

        fetchQuestionsCount();
        fetchResponsesCount();
    }, []);

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="counts">
                <div className="count">
                    <h3>Number of Questions:</h3>
                    <p>{questionsCount}</p>
                </div>
                <div className="count">
                    <h3>Agree:</h3>
                    <p>{agreeCount}</p>
                </div>
                <div className="count">
                    <h3>Neutral:</h3>
                    <p>{neutralCount}</p>
                </div>
                <div className="count">
                    <h3>Disagree:</h3>
                    <p>{disagreeCount}</p>
                </div>
            </div>
        </div>
        
    );
}

export default Dashboard;