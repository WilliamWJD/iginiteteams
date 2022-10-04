import { useState, useEffect, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";

import { Container } from "./styles";
import { FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { groupsGetAll } from "@storage/group/groupGetAll";

export function Groups() {
    const [groups, setGroups] = useState<string[]>([]);

    const navigation = useNavigation();

    function handleNewGroup() {
        navigation.navigate("new");
    }

    async function getAllGroups() {
        try {
            const data = await groupsGetAll();
            setGroups(data);
        } catch (error) {
            console.log(error);
        }
    }

    function handleOpenGroup(group: string) {
        navigation.navigate('players', { group })
    }

    useFocusEffect(useCallback(() => {
        getAllGroups();
    }, []));

    return (
        <Container>
            <Header />

            <Highlight
                title="Turmas"
                subtitle="jogue com a sua turma"
            />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <GroupCard
                        title={item}
                        onPress={() => handleOpenGroup(item)}
                    />
                )}
                ListEmptyComponent={() => <ListEmpty message="😀 Que tal cadastrar a primeira turma?" />}
                contentContainerStyle={groups.length === 0 && { flex: 1 }}
                showsVerticalScrollIndicator={false}
            />

            <Button
                title="Criar nova turma"
                onPress={handleNewGroup}
            />
        </Container>
    )
}