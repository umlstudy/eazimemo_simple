import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore/lite';
import { firebaseConfig } from "./FirebaseConfig";

// npx ts-node packages/p32.dao.firebase/src/FirebaseSetting.ts

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

async function insertTest() {
    // await setDoc(doc(db, "eazimemo_simple", "memo"), {
    //     createAt: "bbbb",
    //     memoId: 2,
    //     message: "USA"
    // });

    await addDoc(collection(db, "eazimemo_simple"), {
        createAt: "cc",
        memoId:3 ,
        message: "ccc"
    });

    const memoCol = collection(db, 'eazimemo_simple');
    const memoSnapshot = await getDocs(memoCol);
    const memoList = memoSnapshot.docs.map(doc => doc.data());
    console.log("resunt ---");
    memoList.forEach(e=>console.log(e));
}

insertTest();

// async function getCities(db:any) {
//     const citiesCol = collection(db, 'cities');
//     const citySnapshot = await getDocs(citiesCol);
//     const cityList = citySnapshot.docs.map(doc => doc.data());
//     return cityList;
// }


// var newPostKey = app.database().ref().child('posts').push().key;

// var postData = {
//     brdno: newPostKey,
//     brdwriter: "홍길동",
//     brdtitle: "게시판 제목",
//     brdmemo: "게시물 내용",
//     brddate: Date.now()
// };

// var updates = {};
// updates['/board/' + newPostKey] = postData;

// firebase.database().ref().update(updates);

