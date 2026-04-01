import { useState, useEffect } from 'react';
import Router from './components/Router';
import { AuthProvider } from './firebase/AuthContext';
import { ToastProvider } from './components/Toast';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link && link.href && link.href.startsWith(window.location.origin)) {
        e.preventDefault();
        const newPath = new URL(link.href).pathname;
        window.history.pushState({}, '', newPath);
        setCurrentPath(newPath);
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  return (
    <AuthProvider>
      <ToastProvider>
        <Router currentPath={currentPath} />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
