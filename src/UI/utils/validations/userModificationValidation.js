import * as yup from 'yup';

export default () => {

    return (
        yup
            .object()
            .shape({
                email: yup.string().required('Email required').email('Must be a email string').min(2, 'Min length 4'),
                name: yup.string().required('Name required').min(4, 'Min length 4').max(20, 'Max length 20'),
                password: yup.string().required('Password required if is gonna be changed').matches(/^[a-zA-Z0-9* ]{1,20}$/, 'Password max 20 digis with no special characters'),
                imageRef: yup.string().required('Imageref required'),
            })
            .required()
    )
}