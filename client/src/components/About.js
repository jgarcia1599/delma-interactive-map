import React from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
export default function componentName() {
  return (
    <>
      <Nav isHome={false} />
      <div id="aboutPageContentWrapper">
        <h1>About</h1>
        <h2>Putting Delma Island in Context</h2>
        <p className="paragraphsAbout">
          The first known writing about Delma Island, situated between Abu Dhabi
          and Qatar, is the Gazetteer of the Persian Gulf, Oman and Central
          Arabia, compiled by John Gordon Lorimar in 1908 for the British
          government.
        </p>
        <p className="blockQuote">
          <em>
            An island off the coast of Abu Dhabi territory in Trucial 'Omān , a
            little to the south of an imaginary line connecting Abu Dhabi Town
            with the entrance of Khor-al- 'Odaid and rather more than twice the
            distance from the former that it is from the latter. Dalmah is
            elliptical in shape, with its longer axis running north and south,
            and it has a narrow projection at its southern end. Its length is 5
            and its breadth 2½ miles, and the surface, except for a very low,
            narrow plain at the south end, is hilly, the highest point being 244
            feet above sea level. Plenty of brackish water is obtainable from
            wells, and there are deposits of red oxide of iron which are not at
            present considered worth removal. A small settlement of about 15
            families of the Qubaisāt section of the Bani Yās tribe exists on the
            west side of the southern plain; the inhabitants wade for pearls in
            winter, besides diving for them in summer, and are keepers of goats.
            Dalmah is a place of some importance at the end of the pearl season,
            when a temporary bazaar of some 10 shops springs up, and a number of
            persons engaged in the pearl trade meet there to settle their
            accounts. Among these are the majority of the Indian traders on the
            coast of Trucial 'Omān , who come here to recover debts and make
            purchases of pearls. Several pearl banks exist in the vicinity,
            among which are:—Umm-as-Sulsul and Manyōkh, 8 and 5 miles
            respectively to the north; Hawād Bin-Musammih, 9 miles to the
            south-east; Abu Dastūr 4 miles to the. southwest; and, besides
            several others which are nearer, Hālat Dalmah 27 miles to the
            north-west. Dalmah belongs to the Shaikh of Abu Dhabi.
          </em>
        </p>
        <p className="paragraphsAbout">
          The history of Delma Island is much older than that. Pottery
          discovered at excavations led by archeologist Mark Beech for Abu
          Dhabi’s Department of Culture and Tourism, reflect history going back
          7,000 years. For more about the ancient history of Delma, we recommend
          these links:
        </p>

        <h2>About Dhakira</h2>

        <p className="paragraphsAbout">
          Dhakira is a center for applied heritage studies. Based at NYU-Abu
          Dhabi the research group is working in close cooperation with heritage
          communities, local authorities, international NGOs and
          intergovernmental organisations. Dhakira is distinctive in its
          emphasis on an interdisciplinary research environment which links
          theory and practice. The Center challenges artificial divisions, such
          as those between tangible and intangible heritage as well as natural
          and cultural heritage, and provides the framework, tools and platform
          to empower civil societies to become curators of their own heritage
          and custodians of their cultural memory.
        </p>

        <h2>Research Partners</h2>

        <p className="paragraphsAbout">
          This project would not be possible without the support of New York
          University Abu Dhabi’s Heritage Studies program and the ongoing
          research efforts of professors at both NYUAD and Zayed University as
          well as undergraduate student research collaborators.
        </p>

        <h2>Delma Island Project Team</h2>

        <p className="paragraphsAbout">
          <strong>Robert Parthesius:</strong> Director of Dhakira Center for
          Heritage Studies
          <br></br>
          <br></br>
          <strong>Head Researcher:</strong> Salama Al Qubaisi <br></br>
          <br></br>
          <strong>Editor and Archivist: </strong>
          Emily Broad<br></br>
          <br></br>
          <strong>Design and Development Team: </strong> Emily Broad, Steven
          Wyks and Junior Garcia <br></br>
          <br></br>
          <strong>Faculty Supervisor:</strong> Alia Yunis<br></br> <br></br>
          <strong>NYUAD Dhakira Team Contributors:</strong> Felix Beck, Jonathan
          Sharfman, Adham Chakohi <br></br>
          <br></br>Very special thanks to NYUAD librarians Lauren Kata and
          Taylor Hixson.<br></br>
          <br></br> We also thank all the families and businesses that have
          welcomed us to Delma Island and shared their stories with us.
        </p>

        <h2>Photography</h2>

        <p className="paragraphsAbout">
          The photographs found on this site come from staff and students
          affiliated with NYUAD’s Heritage Program. The photographs were taken
          on research ventures to Delma Island or on field trips to the island.
          The main contributors to this content are: Alia Yunis, Alexis
          Mountcastle, Robert Parthesius, Felix Beck, and Jonathan Sharfman.
        </p>

        <h2>Oral Histories</h2>

        <p className="paragraphsAbout">
          Unless otherwise noted, the oral history audio used in this project is
          from interviews conducted in Arabic by Salama Al Qubaisi. The Arabic
          audio was then translated and transcribed into English by Alia Yunis.
        </p>

        <h2>Terms and Conditions </h2>
        <p className="paragraphsAbout">
          To learn more about our comment policy, our privacy policy and image
          rights and reproductions, please see Terms and Conditions.
        </p>
      </div>
      <Footer></Footer>
    </>
  );
}
