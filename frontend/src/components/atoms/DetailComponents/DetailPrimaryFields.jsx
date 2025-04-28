import React from 'react';
import {formatValue} from "../../../utils/formatDetailValue.js";

const DetailPrimaryFields = ({primaryFields, getFieldLabel, data}) => {
    return (
        <div className="space-y-4 mt-8">
            {primaryFields.map(key => (
                key !== 'title' && key !== 'category' && (
                    <div key={key}>
                        <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                            {getFieldLabel(key)}
                        </h3>
                        <p className="text-gray-300">
                            {formatValue(key, data[key])}
                        </p>
                    </div>
                )
            ))}
        </div>
    );
};

export default DetailPrimaryFields;
