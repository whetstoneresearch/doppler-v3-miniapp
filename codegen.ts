import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'https://doppler-v3-indexer-dev.ponder-dev.com/',
  documents: ['src/services/*.ts'],
  generates: {
    './src/gql/': {
      preset: 'client'
    }
  }
}
 
export default config
