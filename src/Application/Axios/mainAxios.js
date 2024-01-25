export default ({ context, props }) => {

    const { url, method, payload } = props
    const { mainContext, setMainContext } = context

    console.log("!!!!!!!!!!!! PETICION HECHA AXIOS MAIN")
    let response = {
        data: null,
        error: null
    }
    return (async () => {
        setMainContext((prevState) => ({
            ...prevState,
            loading: true
        }))

        try {
            const petitionResponse = await mainContext?.services?.axios.request({
                data: payload,
                method,
                url,
            });
            console.log(petitionResponse);

            response.data = petitionResponse?.data
        } catch (error) {
            console.log(error);
            if (error?.code && !error.response?.data)
                response.error = {
                    message: error?.message,
                    path: ''
                }
            else
                response.error = error?.response?.data
        } finally {
            console.log(response)
            if (response?.error?.data)
                console.log(response?.error?.data);

            setMainContext((prevState) => ({
                ...prevState,
                reload: false,
                reloadType: false,
                loading: false,
                notification: {
                    type: (response?.error ? "WARNING" : "SUCCESS"),
                    message: (response?.error?.data ?
                        response?.error?.data.reduce((prev, next) => {
                            return prev += `${(Object.keys(next).reduce(attr => (attr === 'message') && next[attr]))} __ `
                        }, '')
                        : response?.data ?
                            response?.data?.message :
                            `${response?.error?.message} - ${response?.error?.path}`)

                }
            }))
        }

        return response;
    })();
}