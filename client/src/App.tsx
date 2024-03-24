import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/drivers')
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
    </div>
  );
}
