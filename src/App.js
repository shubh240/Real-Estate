import React, { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/index";
import Spinner from './component/Spinner';
import { useSelector } from 'react-redux';
import { onMessage } from 'firebase/messaging';
import { messaging } from './firebase';
import { TOAST_SUCCESS } from './utils/common.service';
  
const App = () => {
  const { isLoading } = useSelector((state) => state.master);

  useEffect(() => {
    onMessage(messaging, (payload) => {
        // const toastOptions = {
        //   icon: <img width="40px" height="40px" src={PUBLIC_URL + "/assets/images/svg/popup-logo-core.svg"} alt="logo" />,
        //   style: {
        //     border: '1px solid #00cfc8',
        //     color: '#000',
        //   },
        //   autoClose: 15000,
        //   position: "top-center",
        // };
        // toast(notiMessage, toastOptions);
      TOAST_SUCCESS(payload.notification.body)
    });
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {/* <ScrollProvider> */}
        <Router basename='/'>
          <Routes />
        </Router>
      {/* </ScrollProvider> */}
    </>
  );
}


export default App;
