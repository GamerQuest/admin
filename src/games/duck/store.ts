export interface Game {
  id: string,
  cover: string[]
  description: string
  esrb: string
  pegi: string[]
  tags: string
  thumbnail: string[]
  title: string
}

export interface Store {
  list: string[]
  items: { [id: string]: Game }
}

const storeDefault: Store = {
  list: [],
  items: {}
}

export default storeDefault
