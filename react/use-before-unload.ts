import { useCallback, useEffect } from 'react';

interface BeforeUnloadHandler {
  (e: BeforeUnloadEvent): string | void;
  intercept?: boolean;
}

export const useBeforeUnload = (shouldIntercept: boolean) => {
  const handleBeforeUnload: BeforeUnloadHandler = useCallback((e: BeforeUnloadEvent) => {
    if (handleBeforeUnload.intercept) {
      e.preventDefault;
      e.returnValue = '';
      return '';
    }
  }, []);

  useEffect(() => {
    handleBeforeUnload.intercept = shouldIntercept;
    window.addEventListener('beforeunload', handleBeforeUnload, { capture: true });
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload, { capture: true });
    };
  }, [handleBeforeUnload, shouldIntercept]);

  const setIntercept = useCallback(
    (intercept: boolean) => {
      handleBeforeUnload.intercept = intercept;
    },
    [handleBeforeUnload],
  );

  return setIntercept;
};

export default useBeforeUnload;
