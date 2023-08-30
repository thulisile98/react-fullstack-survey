import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from "../firebase";
import { addDoc, collection ,getDocs,deleteDoc, doc,updateDoc} from 'firebase/firestore';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCancel, faEdit } from '@fortawesome/free-solid-svg-icons';
import  {AddQuestions} from './AddQuestions.css';


export default function AddQuestion() {
  
  
    const initialState = {
        question: ""
    };

    const [data, setData] = useState(initialState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (editingQuestion !== null) {
       
            if (data.question.trim() === "") {
                alert("Question cannot be empty.");
                return;
            }
    
            try {
                const questionRef = collection(db, "questions");
                const querySnapshot = await getDocs(questionRef);
                const matchedQuestionDoc = querySnapshot.docs.find(
                    (doc) => doc.data().question === editingQuestion
                );
    
                if (matchedQuestionDoc) {
                    const questionDocRef = doc(db, "questions", matchedQuestionDoc.id);
                    await updateDoc(questionDocRef, {
                        question: data.question,
                    });
    
                    const updatedQuestions = questions.map((q) =>
                        q === editingQuestion ? data.question : q
                    );
    
                    setQuestions(updatedQuestions);
                    setEditingQuestion(null); 
                    setData(initialState); 
                }
            } catch (error) {
                console.error("Error updating question:", error);
            }
        } else {
           
            if (data.question.trim() === "") {
                alert("Question cannot be empty.");
                return;
            }
    
            try {
                const questionRef = collection(db, "questions");
                await addDoc(questionRef, { question: data.question });
    
                setData(initialState);
                // navigate("/");
            } catch (error) {
                console.error("Error adding question: ", error);
            }
        }
    };
    

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const questionRef = collection(db, 'questions');
                const snapshot = await getDocs(questionRef); 
                const questionList = snapshot.docs.map(doc => doc.data().question);
                setQuestions(questionList);
            } catch (error) {
                console.error('Error fetching questions: ', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleDelete = async (question) => {
        try {
            const querySnapshot = await getDocs(collection(db, 'questions'));
            const matchedQuestionDoc = querySnapshot.docs.find(doc => doc.data().question === question);
            
            if (matchedQuestionDoc) {
                const questionDocRef = doc(db, 'questions', matchedQuestionDoc.id);
                await deleteDoc(questionDocRef);
    
              
                const updatedQuestions = questions.filter(q => q !== question);
                setQuestions(updatedQuestions);
            }
        } catch (error) {
            console.error('Error deleting question: ', error);
        }
    };

    const [editingQuestion, setEditingQuestion] = useState(null);

    const handleEdit = (questionToEdit) => {
        setEditingQuestion(questionToEdit);
        setData({ question: questionToEdit }); 
    };
    

  


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2>ADD QUESTIONNAIRES</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter question"
                                name="question"
                                value={data.question}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary mx-2"><FontAwesomeIcon icon={faAdd}  /></button>
                        <Link to={"/"} className="btn btn-outline-primary mx-2"><FontAwesomeIcon icon={faCancel} /></Link>
                    </form>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6 offset-md-3 border rounded p-4 shadow">
                    <h2>Questions</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((question, index) => (
                                <tr key={index}> 
                                    <td>{question}</td>
                                    <td>
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() => handleEdit(question)}
                                        
                                        ><FontAwesomeIcon icon={faEdit} /> 
                                        </button>
                                    </td>
                                    <td>
                    
                                  <Button variant="outlined" startIcon={<DeleteIcon />}  onClick={() => handleDelete(question)}>
                                         
                                      </Button>               
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

