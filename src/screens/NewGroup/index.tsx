import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";

import { Container, Content, Icon } from "./styles";
import { createNewGroup } from "@storage/group/groupCreate";

export function NewGroup() {
    const [group, setGroup] = useState('');

    const navigation = useNavigation();

    async function handleNew() {
        try {
            await createNewGroup(group);
            navigation.navigate("players", { group })
        } catch (error) {
            console.log(error);
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