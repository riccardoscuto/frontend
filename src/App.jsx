import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Layout from './layout/layout';

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="about" element={<About />} />
			</Route>
		</Routes>
	);
}
