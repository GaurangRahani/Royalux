import swaggerJsDoc from "swagger-jsdoc"
import swaggerui from "swagger-ui-express"

const options={
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'rentroom Website Apis',
          version: '1.0.0',
        },
        servers:[{
            url: 'http://localhost:8000'
        }]
    },
    apis:['swagger.js']
}

const swaggerSpec=swaggerJsDoc(options);

const swaggerDocs=function swaggerDocs(app){
    app.use('/api-docs',swaggerui.serve,swaggerui.setup(swaggerSpec))
}
export {swaggerDocs}