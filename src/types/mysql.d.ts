import {MySQLConnection, MySQLPool, MySQLPromiseConnection, MySQLPromisePool} from '@fastify/mysql'


// if you passed promise = true
declare module 'fastify' {
    interface FastifyInstance {
        mysql: MySQLPromisePool
    }
}

// if you passed promise = true, type = 'connection'
declare module 'fastify' {
    interface FastifyInstance {
        mysql: MySQLPromiseConnection
    }
}