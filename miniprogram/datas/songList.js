const db = wx.cloud.database({
  env: 'project-9gtqtarndcb0d90b' // 你的云开发环境ID
});

async function getMusicDataFromDB() {
  try {
    const result = await db.collection('songList').get();
    console.log("songList fron db:",result);
    return result;
  } catch (error) {
    console.error('Failed to get music data from the database:', error);
    return [];
  }
}

export default async function fetchData() {
  const songList = await getMusicDataFromDB();
  return songList;
}