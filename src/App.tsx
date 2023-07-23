import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';
import HomePage from './pages/home/HomePage';
import RecipeDetailPage from './pages/recipe-detail/RecipeDetailPage';
import AddRecipePage from './pages/create-recipe/AddRecipePage';
import EditProfilePage from './pages/edit-profile';
import EditRecipePage from './pages/edit-recipe';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Auth authRoute='login' />} />
				<Route path="/register" element={<Auth authRoute='register' />} />

				<Route element={<PrivateRoutes />}>
					<Route path="/" element={<HomePage />} />
				</Route>

				<Route element={<PrivateRoutes />}>
					<Route path="/detail/:id" element={<RecipeDetailPage />} />
				</Route>

				<Route element={<PrivateRoutes />}>
					<Route path="create-recipe" element={<AddRecipePage />} />
				</Route>

				<Route element={<PrivateRoutes />}>
					<Route path="edit-recipe/:id" element={<EditRecipePage />} />
				</Route>

				<Route element={<PrivateRoutes />}>
					<Route path="edit-profile" element={<EditProfilePage />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
