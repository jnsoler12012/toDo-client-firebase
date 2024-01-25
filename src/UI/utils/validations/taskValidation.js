import * as yup from 'yup';

export default () => (
    yup
        .object()
        .shape({
            name: yup.string().required('Name required').test('Size', 'Name Must be to 3 to 10 characters', val => val.length >= 3 || val.length <= 10),
            description: yup.string().required('Description required').test('Size', 'Description words can not be 1 characters less, must be 3 words', val => (/^[\w]{1,}(\s[\w]+)*$/).test(val)),
            type: yup.string().required('Type required'),
            state: yup.mixed().oneOf(['Pending', 'OnProgress', 'Completed']),
            priority: yup.mixed().oneOf(['Urgent', 'OnTime']),
        })
        .required()
)