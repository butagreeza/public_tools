import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';

export default function MainRoute() {
	return (
		<Routes>
			<Route index element={<Home />} />
		</Routes>
	);
}
