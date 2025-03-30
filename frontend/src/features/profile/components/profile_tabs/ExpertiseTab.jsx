import { BaseTab } from "./BaseTab";
import { useAuth } from "../../../auth/contexts/useAuth";

// Add profile title mapping
const PROFILE_TITLES = {
    MusicianProfile: "Musical Expertise",
    TheatreArtistProfile: "Theatrical Expertise",
    ArtistProfile: "Artistical Expertise",
    WriterProfile: "Writer Expertise",
    CraftsmanProfile: "Craftsman Expertise",
};

export const ExpertiseTab = () => {
    const { userData } = useAuth();

    const getProfileTitle = (profileName) => {
        return PROFILE_TITLES[profileName] || profileName.replace('Profile', '');
    };

    const renderContent = (content) => {
        return Object.entries(content).map(([key, value]) => {
            if (Array.isArray(value)) {
                return (
                    <div key={key} className="mb-4">
                        <h3 className="text-lg font-semibold capitalize mb-2">
                            {key.replace(/_/g, ' ')}:
                        </h3>
                        <div className="space-y-2">
                            {value.map((item, idx) => (
                                <div key={`${key}-${idx}`} className="ml-4">
                                    {item.name || item.title}
                                    {item.founded && ` (Founded: ${item.founded})`}
                                    {item.description && ` - ${item.description}`}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }

            return (
                <div key={key} className="mb-4">
                    <h3 className="text-lg font-semibold capitalize mb-2">
                        {key.replace(/_/g, ' ')}:
                    </h3>
                    <p className="ml-4">{value}</p>
                </div>
            );
        });
    };

    return (
        <BaseTab tabTitle="Expertise">
            <div className="space-y-6">
                {userData.sub_profiles.map((subProfile, index) => (
                    <div key={subProfile.id || index} className="card p-4">
                        <h1 className="text-h3 badge-warning font-bold mb-4">
                            {getProfileTitle(subProfile.profile_name)}
                        </h1>
                        {renderContent(subProfile.content)}
                    </div>
                ))}
            </div>
        </BaseTab>
    );
};