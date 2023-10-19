import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'
class ChannelStore {
  channelList = []
  constructor() {
    makeAutoObservable(this)
  }
  // article publish 哪里调用这个函数呢？ 在 Layout调用
  loadChannelList = async () => {
    try {
      const res = await http.get('/channels')
      this.channelList = res.data.channels
    } catch (error) {
      console.log('error: ', error);
    }
  }
}

export default ChannelStore