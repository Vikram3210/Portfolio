// components/Home.jsx
import React from "react";
import Hero from "./Hero";
import Projects from "./Projects";
import Skills from "./Skills";
import { useAuth } from "../context/AuthContext";
import "./Home.css";

function Home() {
  const { user } = useAuth();
  const userId = user?.id;

  return (
    <div className="home-container">
      <Hero user={user} />
      <div className="container">
        <div className="home-content">
          <Projects previewCount={3} userId={userId} />
          <div className="section-divider"></div>
          <Skills userId={userId} />
        </div>
      </div>
    </div>
  );
}

export default Home;
