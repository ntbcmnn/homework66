import './App.css';
import Layout from './Components/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from './Containers/Home/Home.tsx';
import AddMeal from './Containers/AddMeal/AddMeal.tsx';
import EditMeal from './Containers/EditMeal/EditMeal.tsx';

const App = () => <>
  <Layout>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/home/add" element={<AddMeal/>}/>
      <Route path="home/:mealId/edit" element={<EditMeal/>}/>
      <Route path="*" element={<h2>Page not found</h2>}/>
    </Routes>
  </Layout>
</>;

export default App;