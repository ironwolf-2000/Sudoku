import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { MainPage } from './pages';
import { PATHS } from './App.const';

export const App = () => {
    const router = createBrowserRouter([
        {
            path: PATHS.BASE,
            element: <MainPage />,
        },
        {
            path: PATHS.GAME,
            element: undefined,
        },
    ]);

    return <RouterProvider router={router} />;
};
