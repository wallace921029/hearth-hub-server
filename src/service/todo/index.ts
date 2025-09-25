import type { FastifyInstance } from "fastify";
import type { TodoDTO } from "../../types/dto/todo.ts";
import type { RowDataPacket } from "@fastify/mysql";
import type { Todo } from "../../types/po/todo.ts";
import type { ResultSetHeader } from "mysql2";

interface TodoRow extends Todo, RowDataPacket { }

async function getAllTodoTasksByUserId(fastify: FastifyInstance, userId: number) {
    try {
        const [result, fields] = await fastify.mysql.query<TodoRow[]>(
            'SELECT * FROM todos WHERE user_id = ?',
            [userId]
        )
        return result
    } catch (error) {
        throw error
    }
}

async function insertTodoTask(fastify: FastifyInstance, todo: TodoDTO) {
    try {
        const [result] = await fastify.mysql.query<ResultSetHeader>('INSERT INTO todos (user_id, title, content, task_level, expiration) VALUES (?, ?, ?, ?, ?)', [
            todo.userId,
            todo.title,
            todo.content ?? null,
            todo.taskLevel,
            todo.expiration ?? null,
        ])
        return result.insertId
    } catch (error) {
        throw error
    }
}

/** update todo task by taskId*/
async function updateTodoTask(fastify: FastifyInstance, todoId: number, todo: TodoDTO) {
    try {
        const [result] = await fastify.mysql.query<ResultSetHeader>('UPDATE todos SET title = ?, content = ?, task_level = ?, expiration = ? WHERE id = ?', [
            todo.title,
            todo.content ?? null,
            todo.taskLevel,
            todo.expiration ?? null,
            todoId
        ])
        return result.affectedRows
    } catch (error) {
        throw error
    }
}

/** delete todo task by taskId */
async function deleteTodoTask(fastify: FastifyInstance, userId: number, todoId: number) {
    try {
        // check if todo task exists
        const [todoRows] = await fastify.mysql.query<TodoRow[]>('SELECT * FROM todos WHERE id = ?', [todoId])
        if (todoRows.length === 0) {
            return 0
        }

        // check if todo task belongs to user
        if (todoRows[0]?.user_id !== userId) {
            return 0
        }

        // delete todo task
        const [result] = await fastify.mysql.query<ResultSetHeader>('DELETE FROM todos WHERE id = ?', [todoId])
        return result.affectedRows
    } catch (error) {
        throw error
    }
}

export default {
    getAllTodoTasksByUserId,
    insertTodoTask,
    updateTodoTask,
    deleteTodoTask
}
