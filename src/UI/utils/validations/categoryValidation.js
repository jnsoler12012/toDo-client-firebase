import * as yup from 'yup';

export default () => (
    yup
        .object()
        .shape({
            name: yup.string().required('Name required').test('Size', 'Name must be only 3 to 9 characters', val => {
                console.log(val.length);
                return val.length >= 3 && val.length <= 9
            }),
            color: yup.string().required('Color required')
        })
        .required()
)