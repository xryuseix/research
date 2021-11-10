/** @format */

import React from "react";
import { Link, Redirect } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      {/* <Link to="/research/calc" >電卓</Link> */}
      <Redirect to="/research/calc" >電卓</Redirect>
    </div>
  );
};

export default Home;
