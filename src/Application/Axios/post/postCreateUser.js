import mainAxios from "../mainAxios";


export default ({ data, context }) => {
    console.log("Create user sign up")
    const { email, password, name, imageRef } = data
    return mainAxios({
        context,
        props: {
            url: "/auth/signup",
            method: "POST",
            payload: {
                email, password, name, imageRef
            }
        }
    }
    );
}