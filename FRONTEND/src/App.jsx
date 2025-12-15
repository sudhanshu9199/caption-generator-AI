import { useDispatch } from "react-redux";
import MainRouter from "./router/MainRouter";
import { ToastContainer } from 'react-toastify';
import { useEffect } from "react";
import { checkAuth } from "./Redux/Slice/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <>
    <MainRouter />
    <ToastContainer autoClose={3000} position="top-right" />
    </>
  )
}

export default App