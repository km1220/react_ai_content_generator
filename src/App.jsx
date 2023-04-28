import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './layouts/MainLayout';

import Loading from '@components/LoadingPage';
const MainPage = lazy(() => import('@pages/MainPage'));
const TitlePage = lazy(() => import('@pages/TitlePage'));
const OutlinePage = lazy(() => import('@pages/OutlinePage'));
const IntroductionPage = lazy(() => import('@pages/article/IntroductionPage'));
const BodyContentPage = lazy(() => import('@pages/article/BodyContentPage'));
const ConclusionPage = lazy(() => import('@pages/article/ConclusionPage'));
const FinalPreviewPage = lazy(() => import('@pages/article/FinalPreviewPage'));

import TestComponent from './test.component';


function App() {
	console.log(import.meta.env)
	return (
		<Suspense fallback={<Loading />}>
			<Router>
				<MainLayout>
					<Routes>
						<Route path="/" index element={<Navigate to={"/step1"} replace />} />
						<Route path="/step1" element={<MainPage />} />
						<Route path="/step2" element={<TitlePage />} />
						<Route path="/step3" element={<OutlinePage />} />
						<Route path="/step4" element={<IntroductionPage />} />
						<Route path="/step5" element={<BodyContentPage />} />
						<Route path="/step6" element={<ConclusionPage />} />
						<Route path="/final" element={<FinalPreviewPage />} />
						
						<Route path="/test" element={<TestComponent />} />
						<Route path="*" element={<Navigate to={"/"} replace />} />
					</Routes>
					<ToastContainer
						position="top-right"
						autoClose={3000} hideProgressBar={false} newestOnTop={true} rtl={false}
						closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="light"
						style={{ width: 'fit-content', whiteSpace: 'nowrap' }}
					/>
				</MainLayout>
			</Router>
		</Suspense >
	);
}

export default App;
