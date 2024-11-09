import { useSQLiteContext } from "expo-sqlite";

export type ProductDatabase = {
    id: number
    name: string;
    quantity: number;
    description: string;
}

export function useProductDatabase(){
    const database = useSQLiteContext()


    async function create(data: Omit<ProductDatabase, "id">){
        const statement = await database.prepareAsync(
            "INSERT INTO products (name, quantity, description) VALUES ($name, $quantity, $description)"
        )

        try {
            const result = await statement.executeAsync({
                $name: data.name,
                $quantity: data.quantity,
                $description: data.description
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return { insertedRowId }
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync
        }

    }




    return { create }
}