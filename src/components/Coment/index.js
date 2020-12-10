import React from "react";
import { Text } from "react-native";
import { api } from "../../services/api";

export default function ListComment({ feed }) {
    const [comments, setComents] = React.useState([]);

    React.useEffect(() => {
        async function getComment() {
            const response = await api.get(`/feeds/${feed}/comments`);
            setComents(response.data);
            /* console.log("=", response.data); */
        }

        getComment();
    }, []);
    return (
        <>
            <Text>
                <Text style={{ fontWeight: "bold" }}>{comments[0]?.name} </Text>
                {comments[0]?.comment}
            </Text>
            <Text>
                <Text style={{ fontWeight: "bold" }}>{comments[1]?.name} </Text>
                {comments[1]?.comment}
            </Text>
        </>
    );
}