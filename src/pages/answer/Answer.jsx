import style from './Answer.module.css';
import Header from '../header/Header';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../axiosConfig';
import { AppState } from '../../App';
import Footer from '../footer/Footer';
import { FaArrowRight } from 'react-icons/fa';
import { GrUserManager } from 'react-icons/gr';

export default function Answer() {
	const { user } = useContext(AppState);
	const [answers, setAnswers] = useState([]);
	const [newAnswer, setNewAnswer] = useState('');
	const answerDom = useRef();
	const { questionid } = useParams();
	const [question, setQuestion] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch all answers related to the questionid
				const response = await axios.get(`/answers/getallanswer/${questionid}`);
				const sortedAnswers = response.data.sort(
					(a, b) => new Date(b.timestamp) - new Date(a.timestamp)
				);
				setAnswers(sortedAnswers);

				// Fetch all questions and find the specific question by questionid
				const questionResponse = await axios.get('/questions/getallquestions');
				console.log('Question Response Data:', questionResponse.data); // Debugging line

				// Convert questionid from useParams() to a number for comparison
				const numericQuestionId = Number(questionid); // Convert the URL param to a number

				// Find the single question matching the numeric questionid
				let singleQuestion = questionResponse.data.find(
					(question) => Number(question.questionid) === numericQuestionId // Ensure comparison is between numbers
				);

				if (!singleQuestion) {
					console.warn(
						'No question found with the given questionid:',
						numericQuestionId
					); // Debugging line
				}
				setQuestion(singleQuestion || {}); // Set question or an empty object if not found
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [questionid]);


	async function handleSubmit(e) {
		e.preventDefault();

		const answerValue = answerDom.current.value;

		if (!answerValue) {
			alert('Please provide all required information');
			return;
		}

		try {
			await axios.post(`/answers/postanswer/${questionid}`, {
				answer: answerValue,
				userid: user.userid,
			});
			alert('Answer posted successfully!');

			// Refresh answers after posting a new one
			const response = await axios.get(`/answers/getallanswer/${questionid}`);
			const sortedAnswers = response.data.sort(
				(a, b) => new Date(b.timestamp) - new Date(a.timestamp)
			);
			setAnswers(sortedAnswers);
			setNewAnswer('');
		} catch (error) {
			console.error('Error posting answer:', error);
		}
	}

	return (
		<div>
			<Header />
			<div className={style.title}>
				<h1>QUESTION</h1>
				<br />
				{question && Object.keys(question).length > 0 ? (
					<>
						<h2 className={style.Question1}>
							<FaArrowRight size={12} />
							{question.title}
						</h2>
						<h3 className={style.Question1} style={{ padding: '10px 0' }}>
							<FaArrowRight size={12} />
							{question.description}
						</h3>
					</>
				) : (
					<p>Loading question...</p>
				)}
				<hr />
				<h2 className={style.answersFromCommunity}>
					Answers From the Community
				</h2>
				<hr />
				<ul>
					<br />
					<div className={style.answer_container}>
						{answers.length > 0 ? (
							answers.map((answer) => (
								<div key={answer.answerid}>
									<div className={style.circle}>
										<GrUserManager className={style.icon} size={70} />
									</div>
									<li className={style.userAnswer}>
										<h2>{answer.username}</h2>
										<div>
											<h4>{answer.answer}</h4>
										</div>
									</li>
								</div>
							))
						) : (
							<p>No answers yet.</p>
						)}
					</div>
				</ul>
			</div>
			<div className={style.answer}>
				<div className={style.answer_public_question}>
					<h2>Answer The Top Question</h2>
					<br />
					<Link className={style.link} to="/">
						Go to Question Page
					</Link>
				</div>
				<br />
				<div className={style.answer_form}>
					<form onSubmit={handleSubmit}>
						<textarea
							ref={answerDom}
							onChange={(e) => setNewAnswer(e.target.value)}
							value={newAnswer}
							rows="7"
							placeholder="Your answer"
						></textarea>
						<br />
						<button className={style.btn} type="submit">
							Post your Answer
						</button>
					</form>
				</div>
			</div>
			<br />
			<br />
			<Footer />
		</div>
	);
}
