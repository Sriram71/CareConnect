// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import InterviewPage from './pages/InterviewPage';
// import ReportPage from './pages/ReportPage';

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-100">
//         <nav className="bg-blue-600 text-white p-4">
//           <div className="container mx-auto flex justify-between items-center">
//             <h1 className="text-xl font-bold">CareConnect</h1>
//             <div className="space-x-4">
//               <Link to="/" className="hover:underline">Home</Link>
//               <Link to="/interview" className="hover:underline">Interview</Link>
//               <Link to="/report" className="hover:underline">Report</Link>
//             </div>
//           </div>
//         </nav>
//         <main className="container mx-auto p-4">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/interview" element={<InterviewPage />} />
//             <Route path="/report" element={<ReportPage />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import InterviewPage from './pages/InterviewPage';
// import ReportPage from './pages/ReportPage';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <div className="appContainer">
//         <nav className="navbar">
//           <div className="navInner">
//             <h1 className="brand">CareConnect</h1>

//             <div className="navLinks">
//               <Link to="/" className="navLink">Home</Link>
//               <Link to="/interview" className="navLink">Interview</Link>
//               <Link to="/report" className="navLink">Report</Link>
//             </div>
//           </div>
//         </nav>

//         <main className="mainContent">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/interview" element={<InterviewPage />} />
//             <Route path="/report" element={<ReportPage />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InterviewPage from './pages/InterviewPage';
import ReportPage from './pages/ReportPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="appContainer">
        <nav className="navbar">
          <div className="navInner">

            <NavLink to="/" className="brand">
              <div className="brandIcon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 21C12 21 4 14 4 8.5C4 5.5 6.5 3 9.5 3C11 3 12 4 12 4C12 4 13 3 14.5 3C17.5 3 20 5.5 20 8.5C20 14 12 21 12 21Z" />
                </svg>
              </div>
              <div className="brandLabel">
                <span className="brandName">CareConnect</span>
                <span className="brandTagline">Patient care platform</span>
              </div>
            </NavLink>

            <div className="navLinks">
              <NavLink
                to="/"
                end
                className={({ isActive }) => `navLink${isActive ? ' active' : ''}`}
              >
                Home
              </NavLink>
              {/* <NavLink
                to="/interview"
                className={({ isActive }) => `navLink${isActive ? ' active' : ''}`}
              >
                Interview
              </NavLink> */}
              <NavLink
                to="/report"
                className={({ isActive }) => `navLink${isActive ? ' active' : ''}`}
              >
                Report
              </NavLink>
            </div>

          </div>
        </nav>

        <main className="mainContent">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/report" element={<ReportPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;