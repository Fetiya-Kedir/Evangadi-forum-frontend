import React, { useState, useContext, useEffect } from 'react';
import { AppState } from '../../App';
import style from './Home.module.css';
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import axios from '../../axiosConfig';
import { FaSearch } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { GrUserManager } from 'react-icons/gr';
import Footer from '../footer/Footer';

function Home() {
	const { user } = useContext(AppState);
	const [userdata, setuserdata] = useState([]);
	const [getuser, setgetuser] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userResponse = await axios.get('/users/getuser');
				const userData = userResponse.data;

				const questionResponse = await axios.get('/questions/getallquestions');
				const questionData = questionResponse.data;

				setgetuser(userData);
				setuserdata(questionData);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	// Filter and sort questions based on search input and timestamp
	const filteredQuestions = userdata
		.filter((question) =>
			question.title.toLowerCase().includes(search.toLowerCase())
		)
		.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by timestamp in descending order

	return (
		<div>
			<div>
				<Header />
			</div>
			<hr />
			<br />
			<div className={style.container}>
				<div className={style.header}>
					<Link className={style.link1} to="/question/">
						Ask Question
					</Link>
					<div className={style.welcome}>
						<h2>
							welcome: <span style={{ color: '#FE8082' }}>{user.username}</span>
						</h2>
					</div>
				</div>
				<br />
				<div className={style.question_header}>
					<h1>Questions</h1>
					<div className={style.search}>
						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search questions..."
							className={style.searchInput}
						/>
						<FaSearch className={style.searchIcon} />
					</div>
				</div>
				<br />
				<div className={style.quesion}>
					{filteredQuestions.map((question, index) => (
						<div key={index} className={style.questionContainer}>
							<div key={question.questionId}>
								<Link to={`/answer/${question.questionid}`}>
									<div className={style.quesion_container}>
										<div className={style.userQuesion}>
											<GrUserManager className={style.icon} size={70} />
											<h3 style={{ marginLeft: '15px' }}>
												{getuser.find((user) => user.userid === question.userid)
													?.username || 'Unknown'}
											</h3>
											<div className={style.title}>
												<h3>{question.title}</h3>
											</div>
										</div>
										<div className={style.arrow_icon}>
											<Link to={`/answer/${question.questionid}`}>
												<IoIosArrowForward size={30} />
											</Link>
										</div>
									</div>
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
			<br />
			<br />
			<Footer />
		</div>
	);
}

export default Home;
