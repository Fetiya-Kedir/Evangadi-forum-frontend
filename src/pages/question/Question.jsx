import React, { useContext, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../axiosConfig';
import { AppState } from '../../App';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { RxDotFilled } from 'react-icons/rx';
import style from './Question.module.css';

export default function Question() {
	const navigate = useNavigate();
	const titleDom = useRef();
	const descriptionDom = useRef();
	const { user } = useContext(AppState);

	async function handleSubmit(e) {
		e.preventDefault();

		const titleValue = titleDom.current.value;
		const descriptionValue = descriptionDom.current.value;

		if (!titleValue || !descriptionValue) {
			alert('Please provide all required information');
			return;
		}

		try {
			await axios.post('/questions/postquestion', {
				title: titleValue,
				description: descriptionValue,
				userid: user.userid,
			});
			alert('Question posted successfully');
			navigate('/');
		} catch (error) {
			alert('Something went wrong');
			console.log(error);
		}
	}

	return (
		<div className={style.container}>
			<Header />
			<div className={style.questionIntro}>
				<h1>How to Ask a Great Question</h1>
				<ul>
					<li>
						<RxDotFilled className={style.icon} />
						<p>Summarize your problem with a concise title.</p>
					</li>
					<li>
						<RxDotFilled className={style.icon} />
						<p>Provide a detailed description of the issue.</p>
					</li>
					<li>
						<RxDotFilled className={style.icon} />
						<p>Explain what you tried and what you expected to happen.</p>
					</li>
					<li>
						<RxDotFilled className={style.icon} />
						<p>Review your question before posting.</p>
					</li>
				</ul>
			</div>

			<div className={style.askFormContainer}>
				<h2>Ask a Public Question</h2>
				<Link className={style.backLink} to="/">
					Back to Home
				</Link>
				<form onSubmit={handleSubmit} className={style.askForm}>
					<input
						ref={titleDom}
						type="text"
						placeholder="Title"
						className={style.titleInput}
					/>
					<textarea
						ref={descriptionDom}
						rows="7"
						placeholder="Describe your question here..."
						className={style.descriptionTextarea}
					/>
					<button className={style.submitBtn} type="submit">
						Post Your Question
					</button>
				</form>
			</div>
			<Footer />
		</div>
	);
}
