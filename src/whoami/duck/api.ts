import { auth, firestore } from 'core/firebase'
import { Iam } from './store'

const COLLECTION_PATH = 'USERS'
export const COLLECTION_REF = firestore.collection(COLLECTION_PATH)

export async function signUp(email: string, password: string) {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password)
    return { res: userCredential.user?.uid }
  } catch (err) {
    return { err: err.code }
  }
}

export async function set(user: Iam) {
  try {
    await COLLECTION_REF.doc(user.id).set(user)
    return { res: user }
  } catch (err) {
    return { err }
  }
}
