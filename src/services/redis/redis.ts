import Redis from 'ioredis'

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
  db: 0
})

redis.on('connect', function () {
  console.log('connected redis success!!!')
})

redis.on('error', function (err) {
  console.log('Connected redis Error ' + err)
})


export const updateOnlineState = async (islandId: number, service: string) => {
  try {
    if (service === 'mytel') {
      await redis.setex(`PIRATE_ONLINE_USER_MYTEL:${islandId}`, 60, 1)
    } else if (service === 'myplay') {
      await redis.setex(`PIRATE_ONLINE_USER_MYPLAY:${islandId}`, 60, 1)
    }
  } catch (error) {
    // console.log(error)
  }
}

export const checkOnlineState = async (islandId: number) => {
  try {
    let value = null
    value = await redis.get(`PIRATE_ONLINE_USER_MYTEL:${islandId}`)
    if (!value)
      value = await redis.get(`PIRATE_ONLINE_USER_MYPLAY:${islandId}`)
    if (value) return true
  } catch (error) {
    return false
  }
  return false
}

export const countOnlineUsersRedis = async () => {
  return {
    mytel: (await redis.keys(`PIRATE_ONLINE_USER_MYTEL:*`)).length,
    myplay: (await redis.keys(`PIRATE_ONLINE_USER_MYPLAY:*`)).length
  }
}

export const saveChatLog = async (chatId: number, chatInfo: string) => {
  await redis.setex(`SPEAKER_CHAT_LOG:${chatId}`, 3 * 60 * 60, chatInfo)
}

export const getChatLog = async () => {
  const logKeys = await redis.keys(`SPEAKER_CHAT_LOG:*`)
  let chatLog = []
  for (const key of logKeys) {
    try {
      const info = await redis.get(key)
      chatLog.push(JSON.parse(info))
    } catch (error) { }
  }
  chatLog.sort(function (a, b) { return a.createdAt - b.createdAt })
  return chatLog
}