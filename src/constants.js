
///exports here
export const Nav_content = {
  title: 'GUAS',
  body: [
    { title: 'Users', icon: 'src' },
    { title: 'Data', icon: 'src' },
    { title: 'Logs', icon: 'src' },
    { title: 'Users', icon: 'src' },
    { title: 'Report', icon: 'src' },
  ],
  foot: { title: 'Logout', icon: 'src' },
}

export function GET_RANDOM_INT(max) {
  return Math.floor(Math.random() * max)
}

export function SHUFFLE_ARRAY(array) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

export async function DATA_FROM_DB(collection, getDocs, db) {
  // get doc
  let tempTag = [],
    tempImg = [],
    tempStorePaths = [],
    tempTimeStamps = []
  const imagesInfo = collection(db, 'images')
  const imagesDocs = await getDocs(imagesInfo)
  var check = imagesDocs.docs.map((doc) => {
    // tagNames.push(doc.data().name);
    tempTag.push(doc.data().name)
    if (doc.data().imgUrl !== undefined) tempImg.push(doc.data().imgUrl)
    else tempImg.push([])
    if (doc.data().storagePath !== undefined)
      tempStorePaths.push(doc.data().storagePath)
    else tempStorePaths.push([])
    if (doc.data().timeStamps !== undefined)
      tempTimeStamps.push(doc.data().timeStamps)
    else tempTimeStamps.push([])

    return true
  })

  // setTimeStamps(tempTimeStamps)
  // setImages(tempImg)
  // setTagNames(tempTag)
  // setStorePaths(tempStorePaths)

  console.log(tempImg)
  console.log(tempTag)
  console.log(tempStorePaths)
  return [tempImg, tempTag, tempStorePaths, tempTimeStamps]
}
