export const mapObjectToArray = (obj) => {
    const arr = [];
    if (Object.keys(obj).length === 0) return arr;
    Object.keys(obj).forEach((key) => {
        arr.push(obj[key]);
    });
    return arr;
};
