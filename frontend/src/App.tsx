import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SurveyForm from './components/SurveyForm';
import AdminLogin from './components/AdminLogin';
import SurveyList from './components/SurveyList';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        <nav className="bg-white shadow p-4 mb-6">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">Survey App</h1>
            <div className="space-x-4">
              <Link to={ROUTES.HOME} className="text-gray-600 hover:text-blue-600">Home</Link>
              <Link to={ROUTES.ADMIN_LOGIN} className="text-gray-600 hover:text-blue-600">Admin</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path={ROUTES.HOME} element={<SurveyForm />} />
          <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLogin />} />
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<SurveyList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
