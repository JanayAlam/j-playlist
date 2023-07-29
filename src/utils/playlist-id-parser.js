import _ from 'lodash';

/**
 * Extract playlist if the given string is a link.
 * @param {String} str The string value from which the playlist id will be extract.
 * @returns {String | null} The playlist id or null if the string invalid.
 */
export const getPlaylistIdFromString = (str) => {
    str = _.trim(str);
    if (_.startsWith(str, 'PL')) {
        return str;
    } else if (str.toLowerCase().includes('youtube.com/playlist?list=')) {
        let splittedString = _.split(str, 'list=', 2)[1];
        splittedString = _.split(splittedString, '&', 1)[0];
        if (_.startsWith(splittedString, 'PL')) {
            return splittedString;
        }
    }
    return null;
};
