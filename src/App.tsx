import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { GamePage, MainPage } from './pages';
import { PATHS } from './App.const';

export const App = () => {
    const router = createBrowserRouter([
        {
            path: PATHS.BASE,
            element: <MainPage />,
        },
        {
            path: PATHS.GAME,
            element: <GamePage />,
        },
    ]);

    return <RouterProvider router={router} />;
};
