import { action } from 'easy-peasy';
import Feedback from '../../utils/Feedback';

const feedbackModel = {
    // states
    data: {},
    // actions
    addFeedback: action(
        /**
         * Add feedback to the feedback state.
         * @param {Object} state Feedback's states provided by easy peasy.
         * @param {string} payload A feedback object { type: '', msg: '' }.
         */
        (state, payload) => {
            const feedbackObj = new Feedback(payload.type, payload.msg);
            state.data[feedbackObj.getId()] = feedbackObj.getFeedbackObj();
        }
    ),
    removeFeedback: action(
        /**
         * Remove feedback from the feedback state.
         * @param {Object} state Feedback's states provided by easy peasy.
         * @param {String} payload The feedback's id.
         */
        (state, payload) => {
            delete state.data[payload];
        }
    ),
};

export default feedbackModel;
