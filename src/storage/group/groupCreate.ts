import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";

import { groupsGetAll } from "./groupGetAll";

export async function createNewGroup(groupName: string) {
    try {
        const storadGroups = await groupsGetAll();
        const groupAlreadyExists = storadGroups.includes(groupName);
        if (groupAlreadyExists) {
            throw new AppError("Já existe um grupo cadastrado com esse nome.");
        }
        const storage = JSON.stringify([...storadGroups, groupName]);
        await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    } catch (error) {
        throw error;
    }
}