import React from 'react'
import db from '../FireBase'
import {
  getStorage,
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage'
import {
  collection,
  getDocs,
  Timestamp,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

//update docs
//  await updateDoc(doc(db, 'finalStudentAmbassador', docIdData[i]), {
//    numberReferrals: refData[i],
//  })

//set doc
// await setDoc(doc(db, 'leads', username), {
//   name: username,
//   avatar: fileUrl,
// })

//get doc
// const stuInfo = collection(db, 'finalStudentAmbassador')
// const stuInfo_doc = await getDocs(stuInfo)
//     stuData = stuInfo_doc.docs.map((doc) => doc.data().referralCode)

//set store
// const storage = getStorage()
// const coverPhotoRef = ref(storage, `${file.name}`)
// console.log(coverPhotoRef)
// uploadBytes(coverPhotoRef, file).then((res) => {
//   getDownloadURL(coverPhotoRef).then((url) => {
//     setFileUrl(url)
//   })
//   console.log('uploaded : ' + fileUrl)
// })

//del doc and store
//  deleteDoc(doc(db1, 'blogs', timestamp))
//  const desertRef = ref(storage, `${timestamp}`)
//  deleteObject(desertRef)

function SetPictorialData(poops) {

  const { images, setImages, tagNames, setTagNames, checker, setChecker } =
    poops.poop
 


  async function setDataDb() {
    let refToParent = document.getElementById('setDataAtDb')
    let tagRef = refToParent.getElementsByClassName('textBox')[0]
    let imgsRef = refToParent.getElementsByClassName('imgsRef')[0]

    console.log(imgsRef.files.length)

    let picsUrl = []
    let timeStampUrl=[]
    let storagePaths=[]

    const storage = getStorage()

     var newTimestamp = String(new Date().getTime())

    for (let i = 0; i < imgsRef.files.length; i++) {
      let folder = ref(
        storage,
        `${tagRef.value}//${newTimestamp}//${imgsRef.files[i].name}`
      )

      console.log(folder)
      await uploadBytes(folder, imgsRef.files[i]).then((res) => {
        getDownloadURL(folder).then((url) => {
          picsUrl.push(url)
          timeStampUrl.push(newTimestamp);
          storagePaths.push(
            `${tagRef.value}/${newTimestamp}/${imgsRef.files[i].name}`
          );
          if (i === imgsRef.files.length - 1) {
            setDoc(doc(db, 'images', tagRef.value), {
              name: tagRef.value,
              imgUrl: picsUrl,
              timeStamps: timeStampUrl,
              storagePath: storagePaths,
            })

            setChecker(!checker)
            
          }
        })
        console.log('uploaded ' + i + 'th img')
       
      })
    }


  }




  return (
    <div id='setDataAtDb'>
      doc name
      <input type='text' className='textBox' />
      <input type='file' accept='image/*' multiple className='imgsRef' />
      <button type='button' onClick={setDataDb}>
        set
      </button>
    </div>
  )
}

export default SetPictorialData
