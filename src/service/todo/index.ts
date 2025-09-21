import type { FastifyInstance } from "fastify";
import type { TodoDTO } from "../../types/dto/todo.ts";
import type { RowDataPacket } from "@fastify/mysql";
import type { Todo } from "../../types/po/todo.ts";

interface TodoRow extends Todo, RowDataPacket {

}

async function getAllTodoTasksByUserId(fastify: FastifyInstance, id: number) {
    const connection = await fastify.mysql.getConnection()
    const [result, fields] = await connection.query<TodoRow[]>(
        'SELECT * FROM todos WHERE user_id = ?',
        [id]
    )

    return result
}

async function insertTodoTask(fastify: FastifyInstance, todo: TodoDTO) {
    const connection = await fastify.mysql.getConnection()
    await connection.query('INSERT INTO todos (title, content, task_level, expiration) VALUES (?, ?, ?, ?)', [
        todo.title,
        todo.content ?? null,
        todo.task_level,
        todo.expiration ?? null,
    ])

    return true
}

export default {
    insertTodoTask
}
