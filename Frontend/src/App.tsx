
import { BrowserRouter, Route,  Routes, useParams } from 'react-router-dom'
import './App.css'
import ViewData from './Components/ViewData'
import EditData from './Components/EditData'

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<ViewData />}/>
          <Route path="/edit/:id" element={<EditDataWrapper />} />       
           </Routes>
        </BrowserRouter>
    </>
  )
}

const EditDataWrapper = () => {
  const { id } = useParams<{ id: string }>();
  return <EditData id={parseInt(id!, 10)} />;
};

export default App
