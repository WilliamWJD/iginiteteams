import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";

import { AppError } from "@utils/AppError";

import { Container, Content, Icon } from "./styles";
import { createNewGroup } from "@storage/group/groupCreate";

export function NewGroup() {
    const [group, setGroup] = useState('');

    const navigation = useNavigation();

    async function handleNew() {
        if (group.trim().length === 0) {
            return Alert.alert("Novo Grupo", "Informe o nome da turma.");
        }

        try {
            await createNewGroup(group);
            navigation.navigate("players", { group })
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert("Novo Grupo", error.message);
            } else {
                Alert.alert("Novo Grupo", "Não foi possível criar um novo grupo.");
                console.log(error);
            }
        }
    }

    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />
                <Highlight
                    title="Nova turma"
                    subtitle="Crie a turma para adicionar as pessoas"
                />

                <Input
                    placeholder="Nome da turma"
                    onChangeText={setGroup}
                    value={group}
                />

                <Button
                    title="Criar"
                    onPress={handleNew}
                />
            </Content>
        </Container>
    )
}