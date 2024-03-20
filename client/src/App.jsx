import { Routes, Route } from "react-router-dom";

import "./App.css";

import { UsersProvider } from "./contexts/UsersContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";


//PAGES
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";

// INNER APP VIEWS
import AdminView from "./pages/views/AdminView";
import HealthView from "./pages/views/HealthView";
import ProfileView from "./pages/views/ProfileView";
import ProfileDetails from "./pages/views/ProfileDetails";
import ProfileEdit from "./pages/views/ProfileEdit";
import SchedulesView from "./pages/views/SchedulesView";
import SchoolView from "./pages/views/SchoolView";
import HobbiesView from "./pages/views/HobbiesView";
import FamilyView from "./pages/views/FamilyView";
import EditChildDetailsView from "./pages/views/EditChildDetailsView";

function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          <Route
            path="app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<SchedulesView />} />
            <Route path="schedules" element={<SchedulesView />} />
            <Route path="profile" element={<ProfileView />}>
              <Route index element={<ProfileDetails />} />
              <Route path="edit" element={<ProfileEdit />} />
            </Route>
            <Route path="admin" element={<AdminView />} />
            <Route path="family" element={<FamilyView />} />
            <Route path="school" element={<SchoolView />} />
            <Route path="health" element={<HealthView />} />
            <Route path="hobbies" element={<HobbiesView />} />
            <Route path="edit-child-details/:id" element={<EditChildDetailsView />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </UsersProvider>
    </AuthProvider>
  );
}

export default App;
