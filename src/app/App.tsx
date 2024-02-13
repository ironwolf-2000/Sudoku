import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { GamePage, MainPage } from '@/pages';
import { PATHS } from './const';
import './app.scss';
import { RootState } from './store';

const router = createBrowserRouter([
    {
        path: PATHS.MAIN,
        element: <MainPage />,
    },
    {
        path: PATHS.GAME,
        element: <GamePage />,
    },
]);

export const App = () => {
    const { withOverlay } = useSelector((state: RootState) => state.appSettings);

    useEffect(() => {
        if (withOverlay) {
            document.body.classList.add('with-overlay');
        } else {
            document.body.classList.remove('with-overlay');
        }
    }, [withOverlay]);

    return <RouterProvider router={router} />;
};
