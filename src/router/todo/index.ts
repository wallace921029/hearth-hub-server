import type { FastifyInstance } from "fastify";
import type { TodoDTO } from "../../types/dto/todo.ts";
import { fail, success } from "../../utils/common-result/index.ts";
import todoService from "../../service/todo/index.ts";

function todoRoutes(fastify: FastifyInstance) {
    /** get all todo tasks by user id */
    fastify.get('/', async (request, reply) => {
        const user = request.user
        try {
            const todos = await todoService.getAllTodoTasksByUserId(fastify, user.userId)
            return success(todos)
        } catch (error) {
            return fail(error instanceof Error ? error.message : String(error))
        }
    })

    /** insert todo task */
    fastify.post('/', async (request, reply) => {
        const body = request.body as TodoDTO;
        body.userId = request.user.userId

        // validate body
        if (!body.title || body.title.length > 255) {
            return fail('Title is required and must be less than 255 characters')
        }

        if (body.taskLevel < 1 || body.taskLevel > 4) {
            return fail('Task level must be between 1 and 4')
        }

        if (body.expiration && typeof body.expiration !== 'string') {
            return fail('Expiration must be a string')
        }

        try {
            const todoId = await todoService.insertTodoTask(fastify, body)

            if (!todoId) {
                return fail('Failed to insert todo task')
            }

            return success(todoId)
        } catch (error) {
            return fail(error instanceof Error ? error.message : String(error))
        }
    })

    /** update todo task by taskId*/
    fastify.put('/:todoId', async (request, reply) => {
        const todoId = Number((request.params as { todoId: string }).todoId)
        const body = request.body as TodoDTO;
        body.userId = request.user.userId

        // validate body
        if (!body.title || body.title.length > 255) {
            return fail('Title is required and must be less than 255 characters')
        }

        if (body.taskLevel < 1 || body.taskLevel > 4) {
            return fail('Task level must be between 1 and 4')
        }

        if (body.expiration && typeof body.expiration !== 'string') {
            return fail('Expiration must be a string')
        }

        try {
            const affectedRows = await todoService.updateTodoTask(fastify, todoId, body)

            if (affectedRows === 0) {
                return fail('Failed to update todo task')
            }

            return success(todoId)
        } catch (error) {
            return fail(error instanceof Error ? error.message : String(error))
        }
    })

    /** delete todo task by taskId */
    fastify.delete('/:todoId', async (request, reply) => {
        const todoId = Number((request.params as { todoId: string }).todoId)
        const user = request.user

        try {
            const affectedRows = await todoService.deleteTodoTask(fastify, user.userId, todoId)

            if (affectedRows === 0) {
                return fail('Failed to delete todo task')
            }

            return success(todoId)
        } catch (error) {
            return fail(error instanceof Error ? error.message : String(error))
        }
    })
}

export default todoRoutes;
