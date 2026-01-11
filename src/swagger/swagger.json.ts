export const openApiSpec = {
   openapi: "3.0.0",
   info: {
      title: "Nutech Membership API",
      version: "1.0.0",
      description: "Module Membership API Documentation",
   },
   servers: [{ url: "http://localhost:3000" }, { url: "http://nutech.azkazk11.my.id" }],

   tags: [
      { name: "Auth", description: "Registration & Login" },
      { name: "Profile", description: "User Profile APIs" },
   ],

   paths: {
      "/auth/register": {
         post: {
            tags: ["Auth"],
            summary: "API Registration Public",
            description: "Registrasi user agar bisa login",
            requestBody: {
               required: true,
               content: {
                  "application/json": {
                     schema: { $ref: "#/components/schemas/RegisterRequest" },
                     example: {
                        email: "user@nutech-integrasi.com",
                        first_name: "User",
                        last_name: "Nutech",
                        password: "abcdef1234",
                     },
                  },
               },
            },
            responses: {
               200: {
                  description: "Request Successfully",
                  content: {
                     "application/json": {
                        schema: { $ref: "#/components/schemas/BasicResponse" },
                        example: {
                           status: 0,
                           message: "Registrasi berhasil silahkan login",
                           data: null,
                        },
                     },
                  },
               },
               400: {
                  description: "Bad Request",
                  content: {
                     "application/json": {
                        schema: { $ref: "#/components/schemas/BasicResponse" },
                        example: {
                           status: 102,
                           message: "Paramter email tidak sesuai format",
                           data: null,
                        },
                     },
                  },
               },
            },
         },
      },

      "/auth/login": {
         post: {
            tags: ["Auth"],
            summary: "API Login Public",
            description: "Login dan mendapatkan JWT",
            requestBody: {
               required: true,
               content: {
                  "application/json": {
                     schema: { $ref: "#/components/schemas/LoginRequest" },
                     example: {
                        email: "user@nutech-integrasi.com",
                        password: "abcdef1234",
                     },
                  },
               },
            },
            responses: {
               200: {
                  description: "Berhasil Login",
                  content: {
                     "application/json": {
                        schema: { $ref: "#/components/schemas/LoginResponse" },
                     },
                  },
               },
               400: {
                  description: "Bad Request",
                  content: {
                     "application/json": {
                        example: {
                           status: 102,
                           message: "Paramter email tidak sesuai format",
                           data: null,
                        },
                     },
                  },
               },
               401: {
                  description: "Unauthorized",
                  content: {
                     "application/json": {
                        example: {
                           status: 103,
                           message: "Username atau password salah",
                           data: null,
                        },
                     },
                  },
               },
            },
         },
      },

      "/profile": {
         get: {
            tags: ["Profile"],
            summary: "API Profile Private",
            security: [{ bearerAuth: [] }],
            responses: {
               200: {
                  description: "Request Successfully",
                  content: {
                     "application/json": {
                        schema: { $ref: "#/components/schemas/ProfileResponse" },
                     },
                  },
               },
               401: {
                  description: "Unauthorized",
                  content: {
                     "application/json": {
                        example: {
                           status: 108,
                           message: "Token tidak tidak valid atau kadaluwarsa",
                           data: null,
                        },
                     },
                  },
               },
            },
         },
      },

      "/profile/update": {
         put: {
            tags: ["Profile"],
            summary: "API Update Profile Private",
            security: [{ bearerAuth: [] }],
            requestBody: {
               required: true,
               content: {
                  "application/json": {
                     schema: { $ref: "#/components/schemas/UpdateProfileRequest" },
                  },
               },
            },
            responses: {
               200: {
                  description: "Request Successfully",
                  content: {
                     "application/json": {
                        schema: { $ref: "#/components/schemas/ProfileResponse" },
                     },
                  },
               },
               401: {
                  description: "Unauthorized",
                  content: {
                     "application/json": {
                        example: {
                           status: 108,
                           message: "Token tidak tidak valid atau kadaluwarsa",
                           data: null,
                        },
                     },
                  },
               },
            },
         },
      },

      "/profile/image": {
         put: {
            tags: ["Profile"],
            summary: "API Upload Profile Image Private",
            security: [{ bearerAuth: [] }],
            requestBody: {
               required: true,
               content: {
                  "multipart/form-data": {
                     schema: {
                        type: "object",
                        properties: {
                           file: {
                              type: "string",
                              format: "binary",
                           },
                        },
                     },
                  },
               },
            },
            responses: {
               200: {
                  description: "Request Successfully",
                  content: {
                     "application/json": {
                        schema: { $ref: "#/components/schemas/ProfileResponse" },
                     },
                  },
               },
               400: {
                  description: "Bad Request",
                  content: {
                     "application/json": {
                        example: {
                           status: 102,
                           message: "Format Image tidak sesuai",
                           data: null,
                        },
                     },
                  },
               },
               401: {
                  description: "Unauthorized",
                  content: {
                     "application/json": {
                        example: {
                           status: 108,
                           message: "Token tidak tidak valid atau kadaluwarsa",
                           data: null,
                        },
                     },
                  },
               },
            },
         },
      },
      "/banner": {
         get: {
            tags: ["Information"],
            summary: "API Banner Public",
            description: "Digunakan untuk mendapatkan list banner",
            responses: {
               200: {
                  description: "Request Successfully",
                  content: {
                     "application/json": {
                        schema: { $ref: "#/components/schemas/BannerListResponse" },
                        example: {
                           status: 0,
                           message: "Sukses",
                           data: [
                              {
                                 banner_name: "Banner 1",
                                 banner_image: "https://nutech-integrasi.app/dummy.jpg",
                                 description: "Lerem Ipsum Dolor sit amet",
                              },
                           ],
                        },
                     },
                  },
               },
            },
         },
      },

      "/services": {
         get: {
            tags: ["Information"],
            summary: "API Services Private",
            description: "Digunakan untuk mendapatkan list Service / Layanan PPOB",
            security: [{ bearerAuth: [] }],
            responses: {
               200: {
                  description: "Request Successfully",
                  content: {
                     "application/json": {
                        schema: { $ref: "#/components/schemas/ServiceListResponse" },
                     },
                  },
               },
               401: {
                  description: "Unauthorized",
                  content: {
                     "application/json": {
                        example: {
                           status: 108,
                           message: "Token tidak tidak valid atau kadaluwarsa",
                           data: null,
                        },
                     },
                  },
               },
            },
         },
      },

      "/balance": {
         get: {
            tags: ["Transaction"],
            summary: "API Balance Private",
            description: "Digunakan untuk mendapatkan informasi saldo terakhir user",
            security: [{ bearerAuth: [] }],
            responses: {
               200: {
                  description: "Get Balance / Saldo Berhasil",
                  content: {
                     "application/json": {
                        schema: { $ref: "#/components/schemas/BalanceResponse" },
                     },
                  },
               },
               401: {
                  description: "Unauthorized",
                  content: {
                     "application/json": {
                        example: {
                           status: 108,
                           message: "Token tidak tidak valid atau kadaluwarsa",
                           data: null,
                        },
                     },
                  },
               },
            },
         },
      },

      "/topup": {
         post: {
            tags: ["Transaction"],
            summary: "API Topup Private",
            description: "Digunakan untuk melakukan top up saldo user",
            security: [{ bearerAuth: [] }],
            requestBody: {
               required: true,
               content: {
                  "application/json": {
                     schema: { $ref: "#/components/schemas/TopupRequest" },
                     example: {
                        top_up_amount: 1000000,
                     },
                  },
               },
            },
            responses: {
               200: {
                  description: "Request Successfully",
                  content: {
                     "application/json": {
                        schema: { $ref: "#/components/schemas/BalanceResponse" },
                        example: {
                           status: 0,
                           message: "Top Up Balance berhasil",
                           data: {
                              balance: 2000000,
                           },
                        },
                     },
                  },
               },
               400: {
                  description: "Bad Request",
                  content: {
                     "application/json": {
                        example: {
                           status: 102,
                           message: "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
                           data: null,
                        },
                     },
                  },
               },
               401: {
                  description: "Unauthorized",
                  content: {
                     "application/json": {
                        example: {
                           status: 108,
                           message: "Token tidak tidak valid atau kadaluwarsa",
                           data: null,
                        },
                     },
                  },
               },
            },
         },
      },

      "/transaction": {
         post: {
            tags: ["Transaction"],
            summary: "API Transaction Private",
            description: "Digunakan untuk melakukan transaksi layanan",
            security: [{ bearerAuth: [] }],
            requestBody: {
               required: true,
               content: {
                  "application/json": {
                     schema: { $ref: "#/components/schemas/TransactionRequest" },
                     example: {
                        service_code: "PULSA",
                     },
                  },
               },
            },
            responses: {
               200: {
                  description: "Transaksi Berhasil",
                  content: {
                     "application/json": {
                        schema: { $ref: "#/components/schemas/TransactionResponse" },
                     },
                  },
               },
               400: {
                  description: "Bad Request",
                  content: {
                     "application/json": {
                        example: {
                           status: 102,
                           message: "Service ataus Layanan tidak ditemukan",
                           data: null,
                        },
                     },
                  },
               },
               401: {
                  description: "Unauthorized",
                  content: {
                     "application/json": {
                        example: {
                           status: 108,
                           message: "Token tidak tidak valid atau kadaluwarsa",
                           data: null,
                        },
                     },
                  },
               },
            },
         },
      },

      "/transaction/history": {
         get: {
            tags: ["Transaction"],
            summary: "API History Private",
            description: "Digunakan untuk mendapatkan history transaksi",
            security: [{ bearerAuth: [] }],
            parameters: [
               {
                  name: "offset",
                  in: "query",
                  schema: { type: "integer", example: 0 },
                  required: false,
               },
               {
                  name: "limit",
                  in: "query",
                  schema: { type: "integer", example: 3 },
                  required: false,
               },
            ],
            responses: {
               200: {
                  description: "Get History Transaksi berhasil",
                  content: {
                     "application/json": {
                        schema: { $ref: "#/components/schemas/TransactionHistoryResponse" },
                     },
                  },
               },
               401: {
                  description: "Unauthorized",
                  content: {
                     "application/json": {
                        example: {
                           status: 108,
                           message: "Token tidak tidak valid atau kadaluwarsa",
                           data: null,
                        },
                     },
                  },
               },
            },
         },
      },
   },

   components: {
      securitySchemes: {
         bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
         },
      },

      schemas: {
         RegisterRequest: {
            type: "object",
            required: ["email", "first_name", "last_name", "password"],
            properties: {
               email: { type: "string", format: "email" },
               first_name: { type: "string" },
               last_name: { type: "string" },
               password: { type: "string", minLength: 8 },
            },
         },

         LoginRequest: {
            type: "object",
            required: ["email", "password"],
            properties: {
               email: { type: "string", format: "email" },
               password: { type: "string", minLength: 8 },
            },
         },

         BasicResponse: {
            type: "object",
            properties: {
               status: { type: "number" },
               message: { type: "string" },
               data: { nullable: true },
            },
         },

         LoginResponse: {
            type: "object",
            properties: {
               status: { type: "number", example: 0 },
               message: { type: "string", example: "Login Sukses" },
               data: {
                  type: "object",
                  properties: {
                     token: { type: "string" },
                  },
               },
            },
         },

         ProfileResponse: {
            type: "object",
            properties: {
               status: { type: "number" },
               message: { type: "string" },
               data: {
                  type: "object",
                  properties: {
                     email: { type: "string" },
                     first_name: { type: "string" },
                     last_name: { type: "string" },
                     profile_image: { type: "string" },
                  },
               },
            },
         },

         UpdateProfileRequest: {
            type: "object",
            properties: {
               first_name: { type: "string" },
               last_name: { type: "string" },
            },
         },
         Banner: {
            type: "object",
            properties: {
               banner_name: { type: "string" },
               banner_image: { type: "string", format: "uri" },
               description: { type: "string" },
            },
         },

         Service: {
            type: "object",
            properties: {
               service_code: { type: "string" },
               service_name: { type: "string" },
               service_icon: { type: "string", format: "uri" },
               service_tariff: { type: "number" },
            },
         },

         BannerListResponse: {
            type: "object",
            properties: {
               status: { type: "number", example: 0 },
               message: { type: "string", example: "Sukses" },
               data: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Banner" },
               },
            },
         },

         ServiceListResponse: {
            type: "object",
            properties: {
               status: { type: "number", example: 0 },
               message: { type: "string", example: "Sukses" },
               data: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Service" },
               },
            },
         },
         BalanceResponse: {
            type: "object",
            properties: {
               status: { type: "number", example: 0 },
               message: { type: "string", example: "Get Balance Berhasil" },
               data: {
                  type: "object",
                  properties: {
                     balance: { type: "number", example: 1000000 },
                  },
               },
            },
         },

         TopupRequest: {
            type: "object",
            required: ["top_up_amount"],
            properties: {
               top_up_amount: {
                  type: "number",
                  minimum: 0,
                  example: 1000000,
               },
            },
         },

         TransactionRequest: {
            type: "object",
            required: ["service_code"],
            properties: {
               service_code: {
                  type: "string",
                  example: "PULSA",
               },
            },
         },

         TransactionResponse: {
            type: "object",
            properties: {
               status: { type: "number", example: 0 },
               message: { type: "string", example: "Transaksi berhasil" },
               data: {
                  type: "object",
                  properties: {
                     invoice_number: { type: "string" },
                     service_code: { type: "string" },
                     service_name: { type: "string" },
                     transaction_type: { type: "string", example: "PAYMENT" },
                     total_amount: { type: "number" },
                     created_on: {
                        type: "string",
                        format: "date-time",
                     },
                  },
               },
            },
         },

         TransactionHistoryResponse: {
            type: "object",
            properties: {
               status: { type: "number", example: 0 },
               message: { type: "string", example: "Get History Berhasil" },
               data: {
                  type: "object",
                  properties: {
                     offset: { type: "number", example: 0 },
                     limit: { type: "number", example: 3 },
                     records: {
                        type: "array",
                        items: {
                           type: "object",
                           properties: {
                              invoice_number: { type: "string" },
                              transaction_type: { type: "string" },
                              description: { type: "string" },
                              total_amount: { type: "number" },
                              created_on: {
                                 type: "string",
                                 format: "date-time",
                              },
                           },
                        },
                     },
                  },
               },
            },
         },
      },
   },
};
