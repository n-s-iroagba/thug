import {
  faUsers,
  faGifts,
  faDollar,
  faFighterJet,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";

import { ReactNode } from "react";
import { CelebrityClubMembership } from "../components/CelebrityClubMembership";
import CelebritySouvenirs from "../components/CelebritySouvenir";
import CelebrityTours from "../components/CelebrityTours";

import CelebrityEvent from "../components/CelebrityEvent";
import { Job } from "../types/Job";
import Charities from "../components/Charities";

const returnCelebrityDashboardNavItems = (
  job: Job,
  clickHandler: (component: ReactNode) => void
) => {
  return {
    navItems: [
      // {
      //   title: `My chat with ${
      //     job.celebrity.stageName || job.celebrity.firstName
      //   }`,
      //   icon: faUsersRays,
      //   component: <ChatMessages chat={job.chat} />,
      // },
      {
        title: `${
          job.celebrity.stageName || job.celebrity.firstName
        }'s fan Club Packages`,
        icon: faUsers,
        component: (
          <CelebrityClubMembership
            name={job.celebrity.stageName || job.celebrity.firstName}
            packages={job.clubMemberships}
          />
        ),
      },
      {
        title: `Souvenirs from ${
          job.celebrity.stageName || job.celebrity.firstName
        } I can Claim`,
        icon: faGifts,
        component: (
          <CelebritySouvenirs
            name={job.celebrity.stageName || job.celebrity.firstName}
            souvenirs={job.souvenirs}
          />
        ),
      },
      {
        title: `${
          job.celebrity.stageName || job.celebrity.firstName
        }'s Charity Campaigns Can support`,
        icon: faDollar,
        component: (
          <Charities
            name={job.celebrity.stageName || job.celebrity.firstName}
            campaigns={job.charities}
          />
        ),
      },
      {
        title: `${
          job.celebrity.stageName || job.celebrity.firstName
        }'s Exclusive Personalised Tours Packages`,
        icon: faFighterJet,
        component: (
          <CelebrityTours
            name={job.celebrity.stageName || job.celebrity.firstName}
            tours={job.tours}
          />
        ),
      },
      {
        title: `${
          job.celebrity.stageName || job.celebrity.firstName
        }'s Events I am to attend`,
        icon: faLocation,
        component: <CelebrityEvent events={job.events} />,
      },
    ],
    clickHandler: clickHandler,
  };
};
export default returnCelebrityDashboardNavItems;
