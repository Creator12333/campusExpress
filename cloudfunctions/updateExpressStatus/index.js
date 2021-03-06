// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  try {
    return await db.collection('Express').doc(event.id).update({
      data: {
        status:event.status,
        receivOpenId:event.openid
      }
    })
  } catch (e) {
    console.error(e)
  }
}