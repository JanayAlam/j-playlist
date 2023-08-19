import { v4 as uuid } from 'uuid';

const getValidType = (type) => {
    const validTypes = ['error', 'info', 'success', 'warning'];
    if (validTypes.includes(type)) return type;
    return 'info';
};

class Feedback {
    constructor(type, msg) {
        this._id = uuid().slice(0, 8);
        this._type = getValidType(type);
        this._msg = msg || '';
    }

    getId() {
        return this._id;
    }

    getType() {
        return this._type;
    }

    getMessage() {
        return this._msg;
    }

    getFeedbackObj() {
        return {
            id: this._id,
            type: this._type,
            msg: this._msg,
        };
    }
}

export default Feedback;
