// const redis = require("redis");

// const client = redis
//   .createClient({
//     host: "localhost",
//     port: 6379,
//     password: "redispassword123",
//   })
//   .on("ready", () => {
//     console.log("connected to redis");
//   });
// const setCache = (key, value) => {
//   console.log(`${key}`);
//   client.set(key, value, "EX", 60 * 60);
// };

// const getCache = async (key) => {
//   return new Promise((resolve, reject) => {
//     client.get(key, (err, data) => {
//       if (err) reject("error");
//       resolve(data);
//     });
//   });
// };
// const removeCache = (key) => {
//   return new Promise((resolve, reject) => {
//     client.del(key, function (err, succeeded) {
//       if (err) reject(err);
//       if (succeeded) {
//         resolve("success");
//       }
//     });
//   });
// };
// module.exports = {
//   client: client,
//   setCache: setCache,
//   getCache: getCache,
//   removeCache: removeCache,
// };
