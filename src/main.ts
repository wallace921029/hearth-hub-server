import Fastify from "fastify";
import registerRoutes from "./router/index.js";
import mysql from "@fastify/mysql";
import dotenv from "dotenv";
import jwt from "@fastify/jwt";
import verifyTokenDecorator from "./decorators/verify-token.ts";

dotenv.config();

const fastify = Fastify({ logger: false });

verifyTokenDecorator(fastify);

fastify.register(registerRoutes, { prefix: "/api" });
fastify.register(mysql, {
  promise: true,
  connectionString: `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}/${process.env.DATABASE_NAME}`,
});
fastify.register(jwt, {
  secret: process.env.JWT_SECRET || "super-secret-key",
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server running at http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
