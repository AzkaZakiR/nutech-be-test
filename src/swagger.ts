import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
   definition: {
      openapi: "3.0.0",
      info: {
         title: "Nutech API",
         version: "1.0.0",
         description: "API documentation for Nutech Express App",
      },
      servers: [
         {
            url: "http://localhost:3000",
         },
         {
            url: "https://nutech.azkazk11.my.id",
         },
      ],
   },
   apis: ["./src/routes/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
