import { useEffect } from "react";
import { fetchData } from "./utils/api";

const App = () => {
  const apiTesting = () => {
    fetchData("/movie/popular").then((res) => console.log(res));
  };

  useEffect(() => {
    apiTesting();
  }, []);

  return (
    <div>
      <div>App</div>
    </div>
  );
};

export default App;
