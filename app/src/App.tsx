import MainRoute from "./routes"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <MainRoute/>
      <ToastContainer/>
    </>
  )
}

export default App
