import { useEffect } from 'react';

const useScrollLock = (shouldLock: boolean) => {
  useEffect(() => {
    document.body.style.overflow = shouldLock ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [shouldLock]);
};

export default useScrollLock;
