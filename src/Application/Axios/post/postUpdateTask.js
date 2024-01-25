import mainAxios from "../mainAxios";


export default ({ data, id, context }) => {
    console.log("Create user sign up")
    const { name, type, description, state, expireDate, priority, category } = data
    const { idRequester, idRequested } = id

    return mainAxios({
        context,
        props: {
            url: `/task/update/${idRequested}`,
            method: "POST",
            payload: {
                name, type, description, state, expireDate, priority, category, idRequester
            }
        }
    }
    );
}