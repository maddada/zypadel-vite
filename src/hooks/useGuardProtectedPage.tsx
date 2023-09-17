import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useGuardProtectedPage() {
    const [isOnline, setIsOnline] = useState(true);
    useEffect(() => {
    }, []);
    return isOnline;
  }