import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Layout } from "../../../components/StyleComponents";
import SQLiteDB, { User } from "../../../constants/SQLiteDB";
import { Button } from "@rneui/base";
import { ScrollView } from "react-native-gesture-handler";
import * as Crypto from "expo-crypto";

export default function index() {
  const [users, setUsers] = React.useState<User[]>([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await SQLiteDB.getAllUsers();
      setUsers(data);
    }

    fetchData();
  }, []);
  return (
    <Layout.Container>
      <Text>SQLite example</Text>
      <Button
        title={"Add user"}
        onPress={() => {
          const UUID = Crypto.randomUUID();
          SQLiteDB.insertUser(`Aadil`, `${UUID}@gmail.com`, "1234567890");
        }}
      />
      <Text className="text-white text-xl font-bold">All the users</Text>
      <ScrollView
        className="flex-grow"
        contentContainerStyle={{
          rowGap: 10,
          paddingVertical: 10,
        }}
      >
        {users.map((user) => (
          <View
            className="border-b-2 border-t-2 border-gray-300 p-4 bg-gray-200/70"
            key={user.id}
          >
            <Text>{user.name}</Text>
            <Text>{user.email}</Text>
            <Text>{user.password}</Text>
          </View>
        ))}
      </ScrollView>
    </Layout.Container>
  );
}
