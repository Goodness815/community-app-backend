export default {
  // MongoDB configuration
  mongoURI:
    process.env.MONGO_URI ||
    "mongodb+srv://sewogoodness111:7b3Can2mxqBmLVmj@communityforumcluster.pshhysn.mongodb.net/?retryWrites=true&w=majority&appName=communityForumCluster",

  // JWT configuration
  jwtSecret:
    process.env.JWT_SECRET ||
    "t6w9z$C&F)J@NcRfUjWnZr4u7x!A%D*G-KaPdSgVkYp2s5v8y/B?E(H+MbQeThWm",
  jwtLifetime: process.env.JWT_LIFETIME || "30d",

  // Port configuration
  port: process.env.PORT || 5000,
};
