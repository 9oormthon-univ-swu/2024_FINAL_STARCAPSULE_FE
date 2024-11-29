export const recordObjects = [
    'christmas_tree',
    'gingerbread_house',
    'lamplight',
    'santa_sleigh',
];
export const guestObjects = ['moon', 'santa', 'snowflake', 'snowman'];

export const isGuestObject = (objectName) => {
    return guestObjects.includes(objectName);
};
