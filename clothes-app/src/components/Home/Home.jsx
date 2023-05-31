import { useEffect } from "react";

useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch]);