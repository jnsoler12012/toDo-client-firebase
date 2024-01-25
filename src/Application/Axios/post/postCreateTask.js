import mainAxios from "../mainAxios";


export default ({ data, id, context }) => {
    console.log("Create user sign up")
    const { name, type, description, state, expireDate, priority, category } = data
    const { idRequester } = id

    return mainAxios({
        context,
        props: {
            url: "/task/create",
            method: "POST",
            payload: {
                name, type, description, state, expireDate, priority, category, idRequester
            }
        }
    }
    );
}