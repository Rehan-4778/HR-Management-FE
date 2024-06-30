import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

export function useDispatchThunk(thunk) {
  const dispatch = useDispatch();
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [thunk, dispatch]
  );

  return [runThunk, isloading, error];
}
