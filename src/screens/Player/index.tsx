import { useState, useEffect, useRef } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { PlayerCard } from '@components/PlayerCard';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';

import { Container, Form, HeaderList, NumbersOfPlayers } from './styles';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { AppError } from '@utils/AppError';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';

type RouteParams = {
    group: string;
}

export function Players() {
    const [team, setTeam] = useState('Time a');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const [newPlayerName, setNewPlayerName] = useState('');

    const route = useRoute();
    const { group } = route.params as RouteParams;
    const navigation = useNavigation();
    const newPlayerNameInputRef = useRef<TextInput>(null);

    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert("Nova pessoa", "Informe o nome da pessoa para adicionar");
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try {
            await playerAddByGroup(newPlayer, group);

            newPlayerNameInputRef.current?.blur();

            setNewPlayerName('');
            fetchPlayersByTeam();
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert("Nova pessoa", error.message);
            } else {
                Alert.alert("Nova pessoa", "Não foi possivel adicionar");
                console.log(error);
            }
        }
    }

    async function fetchPlayersByTeam() {
        try {
            const playersByTeams = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeams);
        } catch (error) {
            console.log(error);
            Alert.alert("Pessoas", "Não foi possível carregar as pessoas desse time");
        }
    }

    async function handleRemovePlayer(playerName: string) {
        try {
            await playerRemoveByGroup(playerName, group);
            fetchPlayersByTeam();
        } catch (error) {
            console.log(error);
            Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa');
        }
    }

    async function groupRemove() {
        try {
            await groupRemoveByName(group);
            navigation.navigate('groups');
        } catch (error) {
            console.log(error);
            Alert.alert("Grupo", "Não foi possível remover esse grupo!");
        }
    }

    async function handleGroupRemove() {
        Alert.alert(
            "Remover",
            "Deseja remover o grupo :",
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', onPress: () => groupRemove() }
            ]
        )
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team])

    return (
        <Container>
            <Header showBackButton />

            <Highlight
                title={group}
                subtitle="adicione a galera e separe os times"
            />

            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />
                <ButtonIcon
                    icon="add"
                    onPress={handleAddPlayer}
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
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <PlayerCard
                        name={item.name}
                        onRemove={() => handleRemovePlayer(item.name)}
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
                onPress={handleGroupRemove}
            />
        </Container>
    )
}