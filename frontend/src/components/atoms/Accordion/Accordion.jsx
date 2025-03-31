import React, { useState } from 'react';
import {AccordionItem} from "./AccordionItem";

export const Accordion = ({
                              items = [],
                              allowMultipleOpen = false,
                              defaultOpenId = null,
                              defaultOpenIds = [],
                          }) => {
    const initialOpenState = allowMultipleOpen ? defaultOpenIds : (defaultOpenId !== null ? [defaultOpenId] : []);
    const [openItems, setOpenItems] = useState(new Set(initialOpenState));

    const handleItemClick = (itemId) => {
        setOpenItems((prevOpenItems) => {
            const newOpenItems = new Set(prevOpenItems);

            if (allowMultipleOpen) {
                if (newOpenItems.has(itemId)) {
                    newOpenItems.delete(itemId);
                } else {
                    newOpenItems.add(itemId);
                }
            } else {
                if (newOpenItems.has(itemId)) {
                    newOpenItems.clear();
                } else {
                    newOpenItems.clear();
                    newOpenItems.add(itemId);
                }
            }
            return newOpenItems;
        });
    };

    return (
        <div className="w-full">
            {items.map((item) => (
                <AccordionItem
                    key={item.id}
                    itemKey={item.id}
                    title={item.title}
                    content={item.content}
                    isOpen={openItems.has(item.id)}
                    onClick={() => handleItemClick(item.id)}
                />
            ))}
        </div>
    );
};