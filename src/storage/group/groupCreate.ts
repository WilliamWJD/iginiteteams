import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfit";

import { groupsGetAll } from "./groupGetAll";

export async function createNewGroup(groupName: string) {
    try {
        const storadGroups = await groupsGetAll();
        const storage = JSON.stringify([...storadGroups, groupName]);
        await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    } catch (error) {
        throw error;
    }
}