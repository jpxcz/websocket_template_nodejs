import path from 'node:path';
import fs from 'node:fs';
import { authenticationJsonSchema } from './schemas/authentication';

const rootProjectPath = path.resolve(__dirname, '..');

export async function generateDocumentationSchemas() {
  const documentationSchemaPath = rootProjectPath + '/documentation/schemas';
  try {
    await fs.writeFile.__promisify__(
      documentationSchemaPath + '/authentication.json',
      JSON.stringify(authenticationJsonSchema)
    );
  } catch (err) {
    console.error(err);
  }

  console.log(authenticationJsonSchema);
}

function writeFile(filePath: string, content: string) {}
