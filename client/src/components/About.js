import React from 'react';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Nav";
export default function componentName() {
  return (
    <>
        <Nav isHome={false}/>
        <div id="aboutPageContentWrapper">
          <h1>About</h1>
          <h2>About The Delma Island Project</h2>
          <p className="paragraphsAbout">The Delma Island Project is a free web-based platform that presents Delma Island’s history, with focus on the 80s to the present. Developed by the Dhakira Center for Heritage Studies at New York University Abu Dhabi, the Delma Island Project centers around oral histories gathered from the island. These stories are presented through a map-based, multimedia presentation that allows you to explore the island as you navigate through the site. </p>

          <h2>About Dhakira</h2>

          <p className="paragraphsAbout">Dhakira is a center for applied heritage studies. Based at NYU-Abu Dhabi the research group is working in close cooperation with heritage communities, local authorities, international NGOs and intergovernmental organisations. Dhakira is distinctive in its emphasis on an interdisciplinary research environment which links theory and practice. The Center challenges artificial divisions, such as those between tangible and intangible heritage as well as natural and cultural heritage, and provides the framework, tools and platform to empower civil societies to become curators of their own heritage and custodians of their cultural memory.</p>

          <h2>Research Partners</h2>

          <p className="paragraphsAbout">This project would not be possible without the support of New York University Abu Dhabi’s Heritage Studies program and the ongoing research efforts of professors at both NYUAD and Zayed University as well as undergraduate student research collaborators. Alia Yunis, Professor of Film Studies, and Salama Al Qubaisi of Delma Island spearheaded this project. This website was developed and designed by Steven Wyks and Junior Francisco Garcia, both are undergraduate students at NYU Abu Dhabi.</p>
          
          <h2>Photography</h2>
          
          <p className="paragraphsAbout">The photographs found on this site come from staff and students affiliated with NYUAD’s Heritage Program. The photographs were taken on research ventures to Delma Island or on field trips to the island. The main contributors to this content are: Alia Yunis, Alexis Mountcastle, Robert Parthesius, Felix Beck, and Jonathan Sharfman.</p>
          
          <h2>Oral Histories</h2>
          
          <p className="paragraphsAbout">Unless otherwise noted, the oral history audio used in this project is from interviews conducted in Arabic by Salama Al Qubaisi. The Arabic audio was then translated and transcribed into English by Alia Yunis.</p>
          
          <h2>Terms and Conditions </h2>
          <p className="paragraphsAbout">To learn more about our comment policy, our privacy policy and image rights and reproductions, please see Terms and Conditions.</p>
        </div>
    </>
  );
}
