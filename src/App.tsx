import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Auth authRoute='login' />} />
				<Route path="/register" element={<Auth authRoute='register' />} />

				<Route element={<PrivateRoutes />}>
					<Route path="/" element={<HomePage />} />
				</Route>

				<Route element={<PrivateRoutes/>}>
					<Route path="/detail/:id" element={<RecipeDetailPage />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
