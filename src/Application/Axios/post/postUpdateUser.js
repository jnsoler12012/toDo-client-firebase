import mainAxios from "../mainAxios";


export default ({ data, id, context }) => {
    console.log("POOSOSOSOSOOSOSOS")
    const { email, password, name, imageRef } = data
    const { idRequester, idRequired } = id

    return mainAxios({
        context,
        props: {
            url: `/user/update/${idRequired}`,
            method: "POST",
            payload: {
                email, password, name, imageRef, idRequester
            }
        }
    }
    );
}