import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/App.const';
import { Button } from '@components/Button';

export const MainPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(PATHS.GAME);
    };

    return (
        <main>
            <Button onClick={handleClick}>Play</Button>
        </main>
    );
};
