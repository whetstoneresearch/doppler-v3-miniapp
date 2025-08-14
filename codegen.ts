import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'http://localhost:42069',
  documents: ['src/services/*.ts'],
  generates: {
    './src/gql/': {
      preset: 'client'
    }
  }
}
 
export default config
