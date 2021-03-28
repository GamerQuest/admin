import { cloud, firestore } from 'core/firebase'
import { Game } from 'games/duck/store'

const COLLECTION_PATH = 'GAMES'
export const COLLECTION_REF = firestore.collection(COLLECTION_PATH)
const CLOUD_REF = cloud.ref()

export async function setDocument(game: Game) {
  try {
    let { cover: [coverUrl], thumbnail: [thumbnailUrl] } = game
    if (!coverUrl.startsWith('http')) {
      coverUrl = await uploadImage(game.id, 'cover', coverUrl)
    }
    if (!thumbnailUrl.startsWith('http')) {
      thumbnailUrl = await uploadImage(game.id, 'thumbnail', thumbnailUrl)
    }
    await COLLECTION_REF.doc(game.id).set({ ...game, cover: [coverUrl], thumbnail: [thumbnailUrl] })
    return { res: { ...game, cover: [coverUrl], thumbnail: [thumbnailUrl] } }
  } catch (err) {
    return { err }
  }
}

export async function uploadImage(gameId: string, imageKey: string, imageData: string) {
  try {
    const now = new Date().getTime()
    const child = CLOUD_REF.child(`${ COLLECTION_PATH }/${ gameId }/${ imageKey }_${ now }.jpg`)
    await child.putString(imageData.substring(23), 'base64', { contentType: 'image/jpg' })
    return child.getDownloadURL()
  } catch (err) {
    return { err }
  }
}

export async function updateDocument(dataList: { content: any, key: string, gameId: string }[]) {
  try {
    const res = await Promise.allSettled(
      dataList.map(
        data => COLLECTION_REF.doc(data.gameId).set({ [data.key]: data.content }),
      ),
    )
    return {
      res: res.map(async (item, index) => {
        if (item.status === 'fulfilled') {
          return {
            content: item.value,
            key: dataList[index].key,
            gameId: dataList[index].gameId,
          }
        }
        return null
      }).filter(el => !!el),
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
