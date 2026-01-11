export const openApiSpec = {
   openapi: "3.0.0",
   info: {
      title: "Nutech API",
      version: "1.0.0",
      description: "Pure JSON Swagger for Express + TypeScript",
   },
   servers: [
      {
         url: "http://localhost:3000",
      },
      {
         url: "http://nutech.azkazk11.my.id",
      },
   ],
   paths: {
      "/auth/hello": {
         get: {
            tags: ["Health"],
            summary: "Hello world endpoint",
            responses: {
               200: {
                  description: "Success",
                  content: {
                     "application/json": {
                        schema: {
                           type: "object",
                           properties: {
                              message: {
                                 type: "string",
                                 example: "Hello, World!",
                              },
                           },
                        },
                     },
                  },
               },
            },
         },
      },

      "/auth/register": {
         post: {
            tags: ["Auth"],
            summary: "Register user",
            requestBody: {
               required: true,
               content: {
                  "application/json": {
                     schema: {
                        $ref: "#/components/schemas/RegisterRequest",
                     },
                  },
               },
            },
            responses: {
               201: {
                  description: "User registered successfully",
                  content: {
                     "application/json": {
                        schema: {
                           $ref: "#/components/schemas/ApiResponse",
                        },
                     },
                  },
               },
               400: { description: "Bad request" },
               500: { description: "Internal server error" },
            },
         },
      },

      "/auth/login": {
         post: {
            tags: ["Auth"],
            summary: "Login user",
            requestBody: {
               required: true,
               content: {
                  "application/json": {
                     schema: {
                        $ref: "#/components/schemas/LoginRequest",
                     },
                  },
               },
            },
            responses: {
               200: {
                  description: "Login success",
                  content: {
                     "application/json": {
                        schema: {
                           $ref: "#/components/schemas/ApiResponse",
                        },
                     },
                  },
               },
               401: { description: "Unauthorized" },
               500: { description: "Internal server error" },
            },
         },
      },

      "/banners": {
         get: {
            tags: ["Banner"],
            summary: "Get all banners",
            responses: {
               200: {
                  description: "Success",
                  content: {
                     "application/json": {
                        schema: {
                           $ref: "#/components/schemas/ApiResponse",
                        },
                     },
                  },
               },
               500: { description: "Internal server error" },
            },
         },
      },
   },

   components: {
      schemas: {
         RegisterRequest: {
            type: "object",
            required: ["email", "password"],
            properties: {
               email: {
                  type: "string",
                  example: "user@mail.com",
               },
               password: {
                  type: "string",
                  example: "password123",
               },
               name: {
                  type: "string",
                  example: "John Doe",
               },
            },
         },

         LoginRequest: {
            type: "object",
            required: ["email", "password"],
            properties: {
               email: {
                  type: "string",
                  example: "user@mail.com",
               },
               password: {
                  type: "string",
                  example: "password123",
               },
            },
         },

         ApiResponse: {
            type: "object",
            properties: {
               status: {
                  type: "number",
                  example: 0,
               },
               message: {
                  type: "string",
                  example: "Success",
               },
               data: {
                  nullable: true,
                  example: {},
               },
            },
         },
      },
   },
};
