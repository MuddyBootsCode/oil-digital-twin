import React, { useEffect } from "react";

const Home = (props) => {
  useEffect(() => (document.title = props.title), []);
  return <div>Home</div>;
};

export default Home;
