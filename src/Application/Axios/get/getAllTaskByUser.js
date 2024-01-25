import mainAxios from "../mainAxios";


export default ({ data, context }) => {
    console.log("GET ALL DATA", data)
    const { categories, state, idRequester } = data
    return mainAxios({
        context,
        props: {
            url: "/task/getAllByUser",
            method: "POST",
            payload: {
                categories, state, idRequester
            }
        }
    }
    );
}