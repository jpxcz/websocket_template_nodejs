import path from 'node:path';
import fs from 'node:fs/promises';
import { authenticationJsonSchema } from '../schemas/authentication';

const rootProjectPath = path.resolve(__dirname, '../..');

async function generateDocumentationSchemas() {
  const documentationSchemaPath = rootProjectPath + '/documentation/schemas';
  try {
    await fs.writeFile(
      documentationSchemaPath + '/authentication.json',
      JSON.stringify(authenticationJsonSchema)
    );
  } catch (err) {
    console.error(err);
  }

  setTimeout(() => process.exit(0), 2000);
}

generateDocumentationSchemas();
