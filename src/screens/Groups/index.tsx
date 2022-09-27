import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";

import { Container } from "./styles";
import { Alert } from "react-native";

export function Groups() {
    return (
        <Container>
            <Header />

            <Highlight
                title="Turmas"
                subtitle="jogue com a sua turma"
            />

            <GroupCard
                title="Galera do ignite"
            />
        </Container>
    )
}