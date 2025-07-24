import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'https://doppler-dev-g283.marble.live/',
  documents: ['src/services/*.ts'],
  generates: {
    './src/gql/': {
      preset: 'client'
    }
  }
}
 
export default config
