export const hiddenFields = [
    "id",
    "file",
    "file_type",
    "cover_art",
    "slug",
    "field_labels",
    "file_url",
    "tags_list",
];

export const importantFields = [
    "title",
    "description",
    "author_name",
    "uploaded_at",
    "category",
    "is_featured",
    "downloads_count"
];

export const getAllFields = (data) => {
    return Object.keys(data).filter(key => !hiddenFields.includes(key));
};

export const getPrimaryFields = (data) => {
    return getAllFields(data).filter(key => importantFields.includes(key));
};

export const getSecondaryFields = (data) => {
    return getAllFields(data).filter(key => !importantFields.includes(key));
};