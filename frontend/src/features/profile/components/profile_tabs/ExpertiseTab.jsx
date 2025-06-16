import { BaseTab } from "./BaseTab";
import { useAuth } from "../../../auth/contexts/useAuth.jsx";
import { Accordion } from "../../../../components/atoms/Accordion/Accordion";
import React, { useMemo } from 'react';
import {
    createColorVariants,
    getConsistentColor,
    getContrastTextColor
} from "../../../../utils/randomColor.js";

const PROFILE_TITLES = {
    MusicianProfile: "Musical Expertise",
    TheatreArtistProfile: "Theatrical Expertise",
    ArtistProfile: "Artistical Expertise",
    WriterProfile: "Writer Expertise",
    CraftsmanProfile: "Craftsman Expertise",
};

export const ExpertiseTab = () => {
    const { userData } = useAuth();

    const itemColorMap = useMemo(() => {
        const allItems = [];

        if (userData?.sub_profiles) {
            userData.sub_profiles.forEach(profile => {
                if (profile.content && typeof profile.content === 'object') {
                    Object.values(profile.content).forEach(value => {
                        if (Array.isArray(value)) {
                            value.forEach(item => {
                                const itemName = item?.name || item?.title;
                                if (itemName) allItems.push(itemName);
                            });
                        }
                    });
                }
            });
        }

        const colorMap = {};
        allItems.forEach(item => {
            colorMap[item] = createColorVariants(getConsistentColor(item));
        });

        return colorMap;
    }, [userData?.sub_profiles]);

    const getProfileTitle = (profileName) => {
        return PROFILE_TITLES[profileName] || profileName.replace('Profile', '');
    };

    const getBadgeStyle = (itemName) => {
        const colors = itemColorMap[itemName] || createColorVariants(getConsistentColor(itemName));
        const textColor = getContrastTextColor(colors.main);

        return {
            backgroundColor: colors.main,
            color: textColor,
            padding: '4px 10px',
            borderRadius: '12px',
            fontSize: '0.85rem',
            display: 'inline-block',
            margin: '2px 10px 2px 0',
            fontWeight: '500'
        };
    };

    const renderContent = (content) => {
        if (!content || typeof content !== 'object') {
            return <p className="text-gray-500">No details available.</p>;
        }

        return Object.entries(content).map(([key, value]) => {
            const displayValue = value ?? 'N/A';

            const sectionStyle = {
                marginBottom: '16px'
            };

            const titleStyle = {
                fontWeight: 'bold',
                marginBottom: '8px'
            };

            if (Array.isArray(displayValue) && displayValue.length > 0) {
                return (
                    <div key={key} style={sectionStyle}>
                        <h4 style={titleStyle} className="capitalize">{key.replace(/_/g, ' ')}:</h4>
                        <div className="card-section">
                            {displayValue.map((item, idx) => {
                                const itemName = item?.name || item?.title || 'Unnamed Item';
                                return (
                                    <span key={idx} style={getBadgeStyle(itemName)}>
                                        {itemName}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                );
            } else if (Array.isArray(displayValue) && displayValue.length === 0) {
                return (
                    <div key={key} style={sectionStyle}>
                        <h4 style={titleStyle}>{key.replace(/_/g, ' ')}:</h4>
                        <p className="text-gray-500">None specified</p>
                    </div>
                );
            } else if (typeof displayValue === 'object' && displayValue !== null) {
                return (
                    <div key={key} style={sectionStyle}>
                        <h4 style={titleStyle}>{key.replace(/_/g, ' ')}:</h4>
                        <pre className="bg-gray-100 rounded text-sm overflow-x-auto">
                          {JSON.stringify(displayValue, null, 2)}
                        </pre>
                    </div>
                );
            }

            return (
                <div key={key} style={sectionStyle}>
                    <h4 style={titleStyle} className="capitalize">{key.replace(/_/g, ' ')}:</h4>
                    <p className="card-section capitalize">{String(displayValue)}</p>
                </div>
            );
        });
    };

    const accordionItems = userData?.sub_profiles?.map((subProfile, index) => ({
        id: `subprofile-item-${index}`,
        title: getProfileTitle(subProfile.profile_name),
        content: renderContent(subProfile.content),
    })) || [];

    return (
        <BaseTab>
            {accordionItems.length > 0 ? (
                <Accordion items={accordionItems} />
            ) : (
                <div className="text-neutral-400 text-center mt-6">
                    No information available. Create new sub profile!
                </div>
            )}
        </BaseTab>
    );
};