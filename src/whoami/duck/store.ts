import { DocumentMeta } from 'core/store'

interface User extends DocumentMeta {
  firstName: string
  lastName: string
  email: string
}

export interface Iam extends User {}

export interface Store {
  authenticated: boolean
  iam: Iam | {}
  err: any
}

const storeDefault: Store = {
  authenticated: false,
  iam: {},
  err: {},
}

export default storeDefault
