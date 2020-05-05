import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const TITLE = "Koompi play | Quiz";

const Start = () => (
  <React.Fragment>
    <Helmet>
      <title>{TITLE}</title>
    </Helmet>
    <div id="home">
      <section id="section">
        <h1 className=" header-text text-center text-white">Quiz App</h1>
        <ul>
          <li id="button">
            <Link to="/quiz">
              <button id="play-button" className="bg-teal-400 w-full text-white font-bold py-2 px-4 mt-48 h-12 rounded-full">
                Play{" "}
              </button>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  </React.Fragment>
);

export default Start;
