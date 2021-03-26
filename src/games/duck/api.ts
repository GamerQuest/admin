import { cloud, firestore } from 'core/firebase'

const COLLECTION_PATH = 'GAMES'
export const COLLECTION_REF = firestore.collection(COLLECTION_PATH)
const CLOUD_REF = cloud.ref()

export async function setDocument(game: any) {
  try {
    await COLLECTION_REF.doc(game.id).set({ ...game })
    return { res: 200 }
  } catch (err) {
    return { err }
  }
}

export async function uploadImage(content: { content: string, key: string, gameId: string }[]) {
  try {
    const res = await Promise.allSettled(
      content.map(({ content, key, gameId }) => {
        const now = new Date()
        const timestamp = now.getTime()
        const child = CLOUD_REF.child(`${ COLLECTION_PATH }/${ gameId }/${ key }_${ timestamp }.jpg`)
        return child.putString(content.substring(23), 'base64', { contentType: 'image/jpg' })
      }),
    )
    return {
      res: content.map((item, index) => {
        if (res[index].status === 'fulfilled') {
          return ({
            // @ts-ignore
            content: res[index].value.getDownloadURL(),
            key: item.key,
            gameId: item.gameId,
          })
        }
      }),
    }
  } catch (err) {
    return { err }
  }
}

export async function updateDocument(dataList: { content: any, key: string, gameId: string }[]) {
  try {
    const res = await Promise.allSettled(
      dataList.map(
        data => COLLECTION_REF.doc(data.gameId).update({ [data.key]: data.content }),
      ),
    )
    return {
      res: dataList.map((data, index) => {
        if (res[index].status === 'fulfilled') {
          return ({
            // @ts-ignore
            content: res[index].value.getDownloadURL(),
            key: data.key,
            gameId: data.gameId,
          })
        }
      }),
    }
  } catch (err) {
    return { err }
  }
}

export async function getByLogin() {
  try {
    const querySnapshot = await COLLECTION_REF.get()
    return { res: querySnapshot.docs.map(doc => doc.data()) }
  } catch (err) {
    return { err }
  }
}
