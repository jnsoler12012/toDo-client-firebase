import mainAxios from "../mainAxios";

export default ({ data, userId, context }) => {
    console.log("POOSOSOSOSOOSOSOS")
    const { idTask } = data
    const { idUserRequester } = userId

    console.log( idUserRequester);

    return mainAxios({
        context,
        props: {
            url: `/task/delete/${idTask}`,
            method: "POST",
            payload: {
                idUserRequester
            }
        }
    }
    );
}