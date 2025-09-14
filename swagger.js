// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Metaflow Verdict Engine API',
      version: '1.1.0',
      description: 'Founder-grade cockpit for verdict routing, milestone syncing, and capital deployment'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local development server'
      }
    ]
  },
  apis: ['./routes/*.js'] // Adjust if your routes are nested deeper
};

const specs = swaggerJsdoc(options);

export function swaggerDocs(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log('📚 Swagger docs available at http://localhost:3000/docs');
}