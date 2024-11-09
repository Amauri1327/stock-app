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

    
    async function update(data: ProductDatabase){
        const statement = await database.prepareAsync(
            "UPDATE products SET name = $name, quantity = $quantity, description = $description WHERE id = $id"
        )

        try {
          await statement.executeAsync({
                $id: data.id,
                $name: data.name,
                $quantity: data.quantity,
                $description: data.description
            })
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync
        }

    }


    async function searchByName(name: string) {
        try {
            const query = "SELECT * FROM products WHERE name LIKE ?"

            const response = await database.getAllAsync<ProductDatabase>(query, `%${name}%`)
            return response
        } catch (error) {
            throw error
        }
    }


    return { create, searchByName, update }
}