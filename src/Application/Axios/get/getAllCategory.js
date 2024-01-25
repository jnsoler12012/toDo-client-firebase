import mainAxios from "../mainAxios";



export default ({ context }) => {
    console.log("GET ALL CATEGORY")

    return mainAxios({
        context,
        props: {
            url: "/category/getAll",
            method: "GET",
        }
    }
    );
}