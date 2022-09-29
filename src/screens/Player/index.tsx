import { useState } from 'react';
import { FlatList } from 'react-native';

import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { PlayerCard } from '@components/PlayerCard';

import { Container, Form, HeaderList, NumbersOfPlayers } from './styles';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

export function Players() {
    const [team, setTeam] = useState('Time a');
    const [players, setPlayers] = useState(['William', 'Marcos', 'Vitor', 'Edvaldo', 'Teste', 'Elivelton', 'Karolaine', 'Narcisio', 'Robersval', 'Neymar', 'Ronaldo']);

    return (
        <Container>
            <Header showBackButton />

            <Highlight
                title="Nome da turma"
                subtitle="adicione a galera e separe os times"
            />

            <Form>
                <Input
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                />
                <ButtonIcon
                    icon="add"
                />
            </Form>

            <HeaderList>
                <FlatList
                    data={['Time a', 'Time b']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />
                <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
            </HeaderList>

            <FlatList
                data={players}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <PlayerCard
                        name={item}
                        onRemove={() => { }}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <ListEmpty
                        message="Não há pessoas nesse time."
                    />
                )}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    players.length === 0 && { flex: 1 }
                ]}

            />
            <Button
                title="Remover Turma"
                type="SECONDARY"
            />
        </Container>
    )
}