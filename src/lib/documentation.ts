import path from 'node:path';
import fs from 'node:fs/promises';
import { authenticationJsonSchema } from '../schemas/authentication';
import { authenticationAckJsonSchema } from '../schemas/authentication_ack';

const rootProjectPath = path.resolve(__dirname, '../..');
const documentationSchemaPath = rootProjectPath + '/documentation/schemas';

function schemaGenerator(): Promise<void>[] {
  // Add here the new schema that needs to be generated
  const promises = [
    fs.writeFile(
      documentationSchemaPath + '/authentication.json',
      JSON.stringify(authenticationJsonSchema)
    ),
    fs.writeFile(
      documentationSchemaPath + '/authentication_ack.json',
      JSON.stringify(authenticationAckJsonSchema)
    ),
  ];
  return promises;
}

async function generateDocumentationSchemas() {
  console.log('generating new schemas documentation');
  try {
    const schemas = schemaGenerator();
    await Promise.all(schemas);
  } catch (err) {
    console.error(err);
  }

  setTimeout(() => process.exit(0), 2000);
}

generateDocumentationSchemas();
