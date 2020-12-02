import React from "react";
import { View } from "react-native";
import { Text, Avatar, Card, IconButton, Paragraph, Title, Button, TextInput } from "react-native-paper";
import { api } from "../../services/api";


export const Comments = ({ route, navigation }) => {
  const [comments, setComments] = React.useState([]);
  const [comentario, setComentario] = React.useState('');
  const { itemId, otherParam } = route.params;
  React.useEffect(() => {

    getComments();
  }, []);

  async function getComments() {
    const response = await api.get(`/feeds/${itemId}/comments`);
    setComments(response.data);
  }

  async function Comment() {
    const response = await api.post(`/feeds/${itemId}/comments`,
      {
        "name": "SALV",
        "comment": comentario
      }
    )

    return response
  }


  return (
    <View style={{ flex: 1 }}>
      {comments.map((item) => {
        console.log(item)
        return (
          <Card.Content>
            <Title>{item.name}</Title>
            <Paragraph>{item.comment}</Paragraph>
          </Card.Content>
        )
      })}
      <TextInput onChangeText={(text) => {
        console.log(text)
        setComentario(text)
      }} />
      <Button onPress={() => {
        Comment()
        getComments()

      }}>Comentar</Button>
    </View>
  );
};
