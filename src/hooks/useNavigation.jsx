import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    }

    return handleNavigation;
}

export default useNavigation;
