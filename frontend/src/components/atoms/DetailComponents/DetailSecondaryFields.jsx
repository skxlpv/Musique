import React from 'react';
import {formatValue} from "../../../utils/formatDetailValue.js";

const DetailSecondaryFields = ({secondaryFields, getFieldLabel, data}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            {secondaryFields.map((key) => (
                <div key={key}>
                    <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                        {getFieldLabel(key)}
                    </h3>
                    <p className="text-gray-300">
                        {formatValue(key, data[key])}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default DetailSecondaryFields;
