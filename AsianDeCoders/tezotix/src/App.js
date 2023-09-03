import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'

import Home from './screens/Home';
import Account from './screens/Account';
import Admin from './screens/Admin';
import TheatreSearch from './screens/TheatreSearch';
import MovieDetail from './screens/MovieDetail';

const AppendHeaderFooter = ({ Comp }) => {
    return (
        <>
            <Header />
            <Comp />
            <Footer />
        </>
    )
}

function App() {

    const [loading, setLoading] = useState(false);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <AppendHeaderFooter Comp={Home} />,
        },
        {
            path: "/search",
            element: <AppendHeaderFooter Comp={TheatreSearch} />,
        },
        {
            path: "/account",
            element: <AppendHeaderFooter Comp={Account} />,
        },
        {
            path: "/admin",
            element: <AppendHeaderFooter Comp={Admin} />,
        },
        {
            path: "/movie/:id",
            element: <AppendHeaderFooter Comp={MovieDetail} />,
        },
    ]);

    return (
        <div className="bg-primaryBg flex flex-col text-primaryblack font-primary pt-[20px] min-h-screen">

            <ToastContainer />

            {
                loading
                    ? <div className="w-full h-full flex-1 grid place-content-center">
                        {/* <Loader varient="full" theme='light' /> */}
                        <p className='text-primaryBlack/50 text-xl font-medium mt-3'>Loading...</p>
                    </div>
                    : <RouterProvider router={router} />
            }

            <ScrollToTop />
        </div>
    )
}

export default App;