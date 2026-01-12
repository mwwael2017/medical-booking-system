import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import DoctorsPage from './pages/Doctors';
import Booking from './pages/Booking';

// Admin Imports
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminBookings from './pages/admin/Bookings';
import AdminDoctors from './pages/admin/Doctors';
import Specialties from './pages/admin/Specialties';
import { Patients, Reports, Settings } from './pages/admin/OtherPages';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <div className="App flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Home />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/doctors" element={
          <div className="App flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <DoctorsPage />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/booking" element={
          <div className="App flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Booking />
            </main>
            <Footer />
          </div>
        } />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="doctors" element={<AdminDoctors />} />
          <Route path="specialties" element={<Specialties />} />
          <Route path="patients" element={<Patients />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

