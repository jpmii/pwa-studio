import React from 'react';
import { shape, string } from 'prop-types';
import { useIntl } from 'react-intl';
import { usePostcode } from '@magento/peregrine/lib/talons/Postcode/usePostcode';

import { mergeClasses } from '../../classify';
import Field from '../Field';
import TextInput from '../TextInput';
import defaultClasses from './postcode.css';

const Postcode = props => {
    const { classes: propClasses, fieldInput, label, ...inputProps } = props;

    const classes = mergeClasses(defaultClasses, propClasses);
    const postcodeProps = {
        classes,
        ...inputProps
    };

    const { formatMessage } = useIntl();

    const fieldLabel =
        label ||
        formatMessage({
            id: 'postcode.label',
            defaultMessage: 'ZIP / Postal Code'
        });

    usePostcode({ fieldInput });

    return (
        <Field
            id={fieldInput}
            label={fieldLabel}
            classes={{ root: classes.root }}
        >
            <TextInput {...postcodeProps} field={fieldInput} />
        </Field>
    );
};

export default Postcode;

Postcode.defaultProps = {
    fieldInput: 'postcode'
};

Postcode.propTypes = {
    classes: shape({
        root: string
    }),
    fieldInput: string,
    label: string
};
