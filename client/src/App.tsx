import { useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/drivers')
  }, [])

  return (
    <div className="App">
    </div>
  );
}
