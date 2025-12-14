import MainRouter from "./router/mainRouter";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
    <MainRouter />
    <ToastContainer autoClose={3000} position="top-right" />
    </>
  )
}

export default App