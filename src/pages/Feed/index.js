import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  Button,
  View,
  ScrollView,
  TextInput,
  Text,
} from "react-native";
import axios from "axios";
import LazyImage from "../../components/LazyImage";
import { AsyncStorage } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Post,
  Header,
  Avatar,
  Name,
  Description,
  Loading,
} from "./styles";
import { api } from "../../services/api";

export const Feed = () => {
  const [error, setError] = useState("");
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [viewable, setViewable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [text, setText] = useState("");
  const [comentarios, setComentarios] = useState([]);

  const [likes, setLikes] = useState([]);

  const MAX_LENGTH = 250;

  const navigation = useNavigation();

  async function Like(postId) {
    const response = await api.post('/likes',
      {
        "curtida": "1",
        "postId": postId
      }
    )
    return response
  }

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (pageNumber === total) return;
    if (loading) return;

    setLoading(true);
    //http://localhost:3000/feed?_expand=author&_limit=4&_page=1
    //utilizar server.js no jsonserver
    //https://5fa103ace21bab0016dfd97e.mockapi.io/api/v1/feed?page=1&limit=4
    //utilizar o server2.js no www.mockapi.io
    api.get('/feeds/1/likes')
      .then((response) => {
        const totalItems = response.headers["x-total-count"];
        const data = response.data;

        setLoading(false);
        setTotal(Math.floor(totalItems / 4));
        setPage(pageNumber + 1);
        setLikes(shouldRefresh ? data : [...likes, ...data]);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(true);
      });

    api
      .get(`/feeds?page=${pageNumber}&limit=4`)
      .then((response) => {
        const totalItems = response.headers["x-total-count"];
        const data = response.data;

        setLoading(false);
        setTotal(Math.floor(totalItems / 4));
        setPage(pageNumber + 1);
        setFeed(shouldRefresh ? data : [...feed, ...data]);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(true);
      });
  }

  async function refreshList() {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }

  const onGet = (id) => {
    try {
      const value = AsyncStorage.getItem(id);

      if (value !== null) {
        // We have data!!
        setComentarios(value);
      }
    } catch (error) {
      // Error saving data
    }
  };

  const onSave = async (id) => {
    try {
      await AsyncStorage.setItem(id, text);
      setComentarios([...comentarios, { id: id, text: text }]);
    } catch (error) {
      // Error saving data
    }
  };

  useEffect(() => {
    loadPage();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Post>
        <Header>
          <Avatar source={{ uri: item?.author?.avatar }} />
          <Name>{item?.author?.name}</Name>
        </Header>

        <LazyImage
          aspectRatio={item?.aspectRatio}
          shouldLoad={viewable.includes(item?.id)}
          smallSource={{ uri: item?.small }}
          source={{ uri: item?.image }}
        />

        <View style={{ flexDirection: "row" }}>
          <>
            <AntDesign name="heart" size={30} style={{ padding: 10 }} onPress={() => Like(item.id)} /><Text>item</Text>
          </>
          <AntDesign
            name="wechat"
            size={30}
            style={{ padding: 10 }}
            onPress={() =>
              navigation.navigate("Comentários do Instagram", {
                itemId: item.id,
                otherParam: "anything you want here",
                postId: item.id
              })
            }
          />
        </View>

        <Description style={{ flexDirection: "column" }}>
          <Name>{item?.description}</Name>
        </Description>
        {/* {comentarios.map((comentario) => {
          return (
            <Description style={{ flexDirection: "column" }}>
              <View>
                <Text>aqui porra</Text>
              </View>
            </Description>
          );
        })} */}

        {/* <TextInput
          multiline={true}
          onChangeText={(text) => setText(text)}
          placeholder={"Comentários"}
          style={[styles.text]}
          maxLength={MAX_LENGTH}
          value={text}
        /> */}

        {/* <Button
          title="Salvar"
          onPress={() => {
            setComentarios([...comentarios, { id: item.id, text: text }]);

            setText("");
          }}
          accessibilityLabel="Salvar"
        ></Button> */}
      </Post>
    );
  };

  const handleViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }) => item.id));
  }, []);

  return (
    <Container>
      <FlatList
        key="list"
        data={feed}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListFooterComponent={loading && <Loading />}
        onViewableItemsChanged={handleViewableChanged}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 10,
        }}
        showsVerticalScrollIndicator={false}
        onRefresh={refreshList}
        refreshing={refreshing}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadPage()}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    lineHeight: 33,
    color: "#333333",
    padding: 16,
    paddingTop: 16,
    minHeight: 170,
    borderTopWidth: 1,
    borderColor: "rgba(212,211,211, 0.3)",
  },
});
