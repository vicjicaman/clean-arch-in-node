import { asValue, AwilixContainer } from "awilix";
import { Connection, createConnection } from "typeorm";

async function connectWithRetry(): Promise<Connection> {
  console.log(process.env.TYPEORM_URL)
  try {
    return await createConnection({
      database: "clean-arch-demo",
      username: "postgres",
      password: "",
      logging: "all",

      synchronize: true,

      type: "postgres",
      url: process.env.TYPEORM_URL || "postgres://postgres@data:5432",
      entities: [__dirname + "/DTOs/*.ts"],
    });
  } catch (err) {
    console.error(
      "failed to connect to db on startup - retrying in 3 seconds ",
      err
    );
    await new Promise((resolve: any) => setTimeout(resolve, 3000));
    return connectWithRetry();
  }
}

export default async function registerDbConnection(
  container: AwilixContainer
): Promise<void> {
  const connection = await connectWithRetry();

  console.info("successfully established db connection");

  container.register({
    dbConnection: asValue(connection),
  });
}
