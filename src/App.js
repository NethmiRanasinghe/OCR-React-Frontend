import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider , Outlet} from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/LoginPage';
import NotFound from './Components/NotFound';
import ProtectedRoute from './Components/ProtectedRoute';
import Canvas from './Components/Annotation/Canvas';
import PatientsPage from './Components/Patients/PatientsPage';
import ImagesPage from './Pages/ImagesPage';
import AdminPage from './Pages/AdminPage';
import Requests from './Components/AdminPortal/Requests';
import Reviewers from './Components/AdminPortal/Reviewers';
import Manage from './Pages/Manage';
import PatientsTable from './Components/Patients/PatientsTable';
import PatientDetails from './Components/Patients/PatientDetails';
import RequestsTable from './Components/AdminPortal/RequestsTable';
import RequestDetails from './Components/AdminPortal/RequestDetails';
import ReviewersTable from './Components/AdminPortal/ReviewersTable';
import UserDetails from './Components/AdminPortal/UserDetails';
import UserProfile from './Components/UserProfile';
import ImagesSearch from './Components/ImagesSearch';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Outlet/>}>

        <Route index element={<LoginPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>

        <Route path='/adminportal' element={<ProtectedRoute allowed={[1]}><AdminPage/></ProtectedRoute>}>

            <Route path='/adminportal/requests' element={<Requests/>}>
              <Route index element={<RequestsTable/>}/>
              <Route path='/adminportal/requests/:id' element={<RequestDetails/>}/>
            </Route>

            <Route path='/adminportal/reviewers' element={<Reviewers/>}>
              <Route index element={<ReviewersTable/>}/>
              <Route path='/adminportal/reviewers/:id' element={<UserDetails/>}/>
            </Route>
        </Route>

        <Route path='/manage' element={<ProtectedRoute allowed={[1,2]}><Manage/></ProtectedRoute>}>
            <Route index element={<ImagesSearch/>}/>
            <Route path='/manage/images' element={<ImagesSearch/>}/>
            <Route path ='/manage/patients' element={<PatientsPage/>}>
                <Route  index element={<PatientsTable/>}></Route>
                <Route  index path="/manage/patients/all" element={<PatientsTable/>}></Route>
                <Route path="/manage/patients/:id" element={<PatientDetails/>}></Route>
            </Route>
        </Route>

        <Route path='/profile' element={<ProtectedRoute allowed={[1,2,3]}><UserProfile/></ProtectedRoute> }/>
        {/* <Route path='/upload' element={<ProtectedRoute allowed={[1,2]}><UploadPage/></ProtectedRoute> }/> */}
        <Route path='/annotation' element={<ProtectedRoute allowed={[1,2]}><Canvas/></ProtectedRoute>}/>
        <Route path='/patients' element={<ProtectedRoute allowed={[1,2]}><PatientsPage/></ProtectedRoute>}/>
        <Route path='/images' element={<ProtectedRoute allowed={[1,2]}><ImagesPage/></ProtectedRoute>}/>
         
        <Route path='/*' element={<NotFound/>}/>

      </Route>
    )
  )

  return (
      <RouterProvider router={router}/>
  );
}

export default App;