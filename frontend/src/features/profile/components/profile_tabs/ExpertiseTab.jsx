import { BaseTab } from "./BaseTab";
import { useAuth } from "../../../auth/contexts/useAuth";
import { Accordion } from "../../../../components/atoms/Accordion/Accordion";
import React from 'react';

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
        if (!content || typeof content !== 'object') {
            return <p>No details available.</p>;
        }

        return Object.entries(content).map(([key, value]) => {
            const displayValue = value ?? 'N/A';

            if (Array.isArray(displayValue) && displayValue.length > 0) {
                return (
                    <div key={key} className="mb-4">
                        <h3 className="text-md font-semibold capitalize mb-1">
                            {key.replace(/_/g, ' ')}:
                        </h3>
                        <ul className="list-disc space-y-1 pl-5">
                            {displayValue.map((item, idx) => (
                                <li key={`${key}-${idx}`}>
                                    {item?.name || item?.title || 'Unnamed Item'}
                                    {item?.founded && ` (Founded: ${item.founded})`}
                                    {item?.description && ` - ${item.description}`}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            } else if (Array.isArray(displayValue) && displayValue.length === 0) {
                return (
                    <div key={key} className="mb-4">
                        <h3 className="text-md font-semibold capitalize mb-1">
                            {key.replace(/_/g, ' ')}:
                        </h3>
                        <p className="ml-4 italic">None specified</p>
                    </div>
                );
            } else if (typeof displayValue === 'object' && displayValue !== null) {
                return (
                    <div key={key} className="mb-4">
                        <h3 className="text-md font-semibold capitalize mb-1">
                            {key.replace(/_/g, ' ')}:
                        </h3>
                        <pre className="ml-4 text-sm p-2 rounded overflow-x-auto">
                            {JSON.stringify(displayValue, null, 2)}
                        </pre>
                    </div>
                );
            }

            return (
                <div key={key} className="mb-4">
                    <h3 className="text-md font-semibold capitalize mb-1">
                        {key.replace(/_/g, ' ')}:
                    </h3>
                    <p className="ml-4">{String(displayValue)}</p>
                </div>
            );
        });
    };

    const accordionItems = userData?.sub_profiles?.map((subProfile, index) => ({
        id: `subprofile-item-${index}`,
        title: getProfileTitle(subProfile.profile_name),
        content: <React.Fragment>{renderContent(subProfile.content)}</React.Fragment>,
    })) || [];

    return (
        <BaseTab tabTitle="Expertise">
            {accordionItems.length > 0 ? (
                <Accordion
                    items={accordionItems}
                    allowMultipleOpen={false}
                />
            ) : (
                <div className="card card-section p-8 text-center text-gray-500">
                    No information available. Create new sub profile!
                </div>
            )}
        </BaseTab>
    );
};