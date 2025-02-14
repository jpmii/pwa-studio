import React from 'react';
import { FormattedMessage } from 'react-intl';
import { func, shape, string } from 'prop-types';
import { X as CloseIcon } from 'react-feather';

import { useEditModal } from '@magento/peregrine/lib/talons/CheckoutPage/PaymentInformation/useEditModal';

import Button from '../../Button';
import Icon from '../../Icon';
import { Portal } from '../../Portal';
import { mergeClasses } from '../../../classify';
import CreditCard from './creditCard';

import editModalOperations from './editModal.gql';

import defaultClasses from './editModal.css';

const EditModal = props => {
    const { classes: propClasses, onClose } = props;

    const classes = mergeClasses(defaultClasses, propClasses);

    const talonProps = useEditModal({ onClose, ...editModalOperations });

    const {
        selectedPaymentMethod,
        isLoading,
        handleUpdate,
        handleClose,
        handlePaymentSuccess,
        handleDropinReady,
        updateButtonClicked,
        resetUpdateButtonClicked,
        handlePaymentError
    } = talonProps;

    const actionButtons = !isLoading ? (
        <div className={classes.actions_container}>
            <Button
                onClick={handleClose}
                priority="low"
                disabled={updateButtonClicked}
            >
                <FormattedMessage
                    id={'global.cancelButton'}
                    defaultMessage={'Cancel'}
                />
            </Button>
            <Button
                onClick={handleUpdate}
                priority="high"
                disabled={updateButtonClicked}
            >
                <FormattedMessage
                    id={'global.updateButton'}
                    defaultMessage={'Update'}
                />
            </Button>
        </div>
    ) : null;

    const paymentMethod =
        selectedPaymentMethod === 'braintree' ? (
            <div className={classes.body}>
                <CreditCard
                    onDropinReady={handleDropinReady}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentError={handlePaymentError}
                    resetShouldSubmit={resetUpdateButtonClicked}
                    shouldSubmit={updateButtonClicked}
                />
                {actionButtons}
            </div>
        ) : (
            <div>
                <FormattedMessage
                    id={'checkoutPage.paymentMethodStatus'}
                    defaultMessage={
                        'The selected method is not supported for editing.'
                    }
                    values={{ selectedPaymentMethod }}
                />
            </div>
        );

    return (
        <Portal>
            <aside className={classes.root_open}>
                <div className={classes.header}>
                    <span className={classes.header_text}>
                        <FormattedMessage
                            id={'checkoutPage.editPaymentInformation'}
                            defaultMessage={'Edit Payment Information'}
                        />
                    </span>
                    <button
                        className={classes.close_button}
                        onClick={handleClose}
                    >
                        <Icon src={CloseIcon} />
                    </button>
                </div>
                {paymentMethod}
            </aside>
        </Portal>
    );
};

export default EditModal;

EditModal.propTypes = {
    classes: shape({
        root: string,
        root_open: string,
        body: string,
        header: string,
        header_text: string,
        actions_container: string,
        close_button: string
    }),
    onClose: func.isRequired
};
