const Sequelize = require("sequelize");
const Umzug = require("umzug");
const config = require("./config");
const sequelize = new Sequelize(config.db);
/* eslint no-console: ["error", { allow: ["log"] }] */

// migration arguments
const migrationArgs = process.argv[2];

const umzug = new Umzug({
    storage: "sequelize",
    storageOptions: {
        sequelize: sequelize
    },
    migrations: {
        params: [
            sequelize.getQueryInterface(), // queryInterface
            sequelize.constructor, // DataTypes
            () => {
                throw new Error(
                    'Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.'
                );
            }
        ],
        path: "./migrations",
        pattern: /\.js$/
    },

    logging: function () {
        console.log.apply(null, arguments);
    }
});
let migrationCommand;

console.log(`${migrationArgs.toUpperCase()} BEGIN`);

switch (migrationArgs) {
    case "up":
        migrationCommand = umzug.up();
        break;

    case "down":
        migrationCommand = umzug.down({ to: 0 });
        break;
}

migrationCommand
    .then(() => {
        console.log("====")
        const successMsg = `${migrationArgs.toUpperCase()} DONE`;
        console.log(successMsg);
        console.log("=".repeat(successMsg.length));
    })
    .catch(err => {
        console.log("====")
        const errorMsg = `${migrationArgs.toUpperCase()} ERROR`;
        console.log(errorMsg);
        console.log("=".repeat(errorMsg.length));
        console.log(err);
        console.log("=".repeat(errorMsg.length));
    })
    .then(() => Promise.resolve())
    .then(() => process.exit(0));
