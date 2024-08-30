import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { createContext, useEffect, useState, useCallback } from 'react';
import axios from './axiosConfig';
import Answer from './pages/answer/Answer';
import Question from './pages/question/Question';
export const AppState = createContext();
function App() {
	const [user, setuser] = useState([]);
	const token = localStorage.getItem('token');
	const navigate = useNavigate();

	const checkUser = useCallback(async () => {
		try {
			const { data } = await axios.get('/users/check', {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			});
			setuser(data);
		} catch (error) {
			console.log(error.response);
			navigate('/login');
		}
	}, [token, navigate]);

	useEffect(() => {
		checkUser();
	}, [checkUser]);

	return (
		<AppState.Provider value={{ user, setuser }}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/question" element={<Question />} />
				<Route path="/answer/:questionid" element={<Answer />} />
			</Routes>
		</AppState.Provider>
	);
}

export default App;
