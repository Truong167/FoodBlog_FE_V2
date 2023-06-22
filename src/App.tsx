import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import  Auth  from './pages/Auth/Auth'

function App() {
  return (
			<Router>
				<Routes>
					<Route path="/login" element={<Auth authRoute='login' />} />
					<Route path="/register" element={<Auth authRoute='register' />} />
				</Routes>
			</Router>
  );
}

export default App;
