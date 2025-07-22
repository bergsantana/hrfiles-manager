export default () => ({
  database: {
    uri: process.env.DATABASE_URI,
  },
  port: parseInt(process.env.PORT || '5432', 10),
});
