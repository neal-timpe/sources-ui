import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@patternfly/react-core';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { removeMessage, undoAddSource } from '../../redux/actions/providers';
import { paths } from '../../Routes';
import { refreshPage } from './refreshPage';

const UndoButton = ({ messageId, history, values }) => {
    const dispatch = useDispatch();
    const notifications = useSelector(({ notifications }) => notifications);

    return (
        <Button variant="link" isInline onClick={() => {
            const notification = notifications.find(({ customId }) => customId === messageId);

            if (notification) {
                dispatch(removeMessage(notification.id));
            }

            dispatch(undoAddSource(values));

            const isOnWizard = history.location.pathname === paths.sourcesNew;

            if (isOnWizard) {
                refreshPage(history);
            } else {
                history.push(paths.sourcesNew);
            }
        }}>
            <FormattedMessage
                id="sources.undo"
                defaultMessage="Undo"
            />
        </Button>
    );};

UndoButton.propTypes = {
    history: PropTypes.any.isRequired,
    messageId: PropTypes.number.isRequired,
    values: PropTypes.object.isRequired
};

export default withRouter(UndoButton);