import mainAxios from "../mainAxios";


export default ({ data, context }) => {
    console.log("RSERT PASSWORD")
    const { email, password } = data
    return mainAxios({
        context,
        props: {
            url: "/auth/resetPassword",
            method: "POST",
            payload: {
                email,
                password
            }
        }
    }
    );
}