import { ArtworksTab } from "../features/profile/components/profile_tabs/ArtworksTab";
import { ExpertiseTab } from "../features/profile/components/profile_tabs/ExpertiseTab";
import { StatisticsTab } from "../features/profile/components/profile_tabs/StatisticsTab";
import { ActivityTab } from "../features/profile/components/profile_tabs/ActivityTab";
import { FriendsTab} from "../features/profile/components/profile_tabs/FriendsActivityTab";
import { AwardsTab } from "../features/profile/components/profile_tabs/AwardsTab";

const profileTabs = {
    artworks: {
        name: "Artworks",
        content: <ArtworksTab/>,
    },
    expertise: {
        name: "Expertise",
        content: <ExpertiseTab/>,
    },
    statistics: {
        name: "Statistics",
        content: <StatisticsTab/>,
    },
    activity: {
        name: "Activity",
        content: <ActivityTab/>,
    },
    friends_activity: {
        name: "Friends",
        content: <FriendsTab/>,
    },
    awards: {
        name: "Awards",
        content: <AwardsTab/>
    }
};

export const profileOptions = profileTabs;