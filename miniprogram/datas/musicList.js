const db = wx.cloud.database({
  env: 'project-9gtqtarndcb0d90b' // 你的云开发环境ID
});

async function getMusicDataFromDB() {
  try {
    const result = await db.collection('musicList').get();
    console.log("musicList:",result);
    return result;
  } catch (error) {
    console.error('Failed to get music data from the database:', error);
    return [];
  }
}

export default async function fetchData() {
  const musicList = await getMusicDataFromDB();
  return musicList;
}