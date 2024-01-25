import mainAxios from "../mainAxios";


export default ({ data, context }) => {
    console.log("Create user sign up")
    const { name, color, idRequester } = data
    return mainAxios({
        context,
        props: {
            url: "/category/create",
            method: "POST",
            payload: {
                name, color, idRequester
            }
        }
    }
    );
}