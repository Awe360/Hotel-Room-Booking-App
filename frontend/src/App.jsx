import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import BookingScreen from './pages/BookingScreen'
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import HomeScreen from "./pages/HomeScreen";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import ProfileScreen from "./pages/ProfileScreen";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar"; 
import ContactPage from "./pages/ContactPage";
import AboutUsPage from "./pages/AboutUsPage";
import PrivateRoute from "./components/PrivateRoute";
import UnAutherized from './pages/UnAutherized'
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();
  
	// Redirect to admin dashboard if admin is authenticated
	if (isAuthenticated && user.isVerified && user.role === 'admin') {
	  return <Navigate to='/admin' replace />;
	}
	
	// Redirect to home if the user is authenticated and verified
	if (isAuthenticated && user.isVerified && user.role === 'user') {
	  return <Navigate to='/home' replace />;
	}
  
	return children;
  };
function App() {
	const { isCheckingAuth, checkAuth } = useAuthStore();
	const{user}=useAuthStore();
	const storedUser = localStorage.getItem('user'); 
    const role = storedUser ? JSON.parse(storedUser).role : null; 
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;

	return (
		<div  className="relative ">
			
			<Navbar role={user?.role} />  
			<Routes>
			<Route path='/getroombyid/:roomid/:fromDate/:toDate' element={<ProtectedRoute><BookingScreen /></ProtectedRoute>} />
				<Route path='/signup' element={
					<RedirectAuthenticatedUser><SignUpPage /></RedirectAuthenticatedUser>} />
				
				<Route path="/profile" element={
					<ProtectedRoute><ProfileScreen role={user?.role} /></ProtectedRoute>} />
				
                <Route path='/home' element={<HomeScreen/>}/>


					{role==='admin'? (<><Route path="/admin" element={
					<ProtectedRoute><AdminPage/></ProtectedRoute>}/>
					</>):(<>
						<Route path='/' element={<HomeScreen/>}/>
						<Route path='/contact' element={<ContactPage  />}/>
					</>)}
					{role==='user' && <Route path='/admin' element={<UnAutherized/>}/>}
					{role==='user' && <Route path='/dashboard' element={<UnAutherized/>}/>}
				 <Route path='/login' element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} />
				<Route path='/verify-email' element={<EmailVerificationPage />} />
				<Route path='/forgot-password' element={<RedirectAuthenticatedUser><ForgotPasswordPage /></RedirectAuthenticatedUser>} />
				<Route path='/reset-password/:token' element={<RedirectAuthenticatedUser><ResetPasswordPage /></RedirectAuthenticatedUser>} />
				<Route path='/about' element={<AboutUsPage/>}/>
				<Route path='*' element={<HomeScreen/>}/>
				
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;