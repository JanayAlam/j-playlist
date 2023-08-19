import Alert from '@mui/material/Alert';
import { useStoreActions, useStoreState } from 'easy-peasy';
import styles from './alert-box.module.css';

const AlertBox = () => {
    const { data: feedbackState } = useStoreState((states) => states.feedback);
    const feedbackAction = useStoreActions((actions) => actions.feedback);

    /**
     * Removes the feedback from store.
     * @param {string} id The id of the feedback object.
     */
    const handleOnClose = (id) => {
        feedbackAction.removeFeedback(id);
    };

    return (
        <div className={styles.alertContainer}>
            {Object.keys(feedbackState).length > 0 &&
                Object.keys(feedbackState).map((id) => (
                    <Alert
                        onClose={() => handleOnClose(id)}
                        key={id}
                        className={styles.alertBox}
                        severity={feedbackState[id].type}
                    >
                        {feedbackState[id].msg}
                    </Alert>
                ))}
        </div>
    );
};

export default AlertBox;
