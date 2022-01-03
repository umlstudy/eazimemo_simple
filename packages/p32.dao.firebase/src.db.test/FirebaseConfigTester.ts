import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getDocs, getFirestore, increment, limit, orderBy, query, runTransaction, serverTimestamp, setDoc, startAfter, updateDoc, where, writeBatch } from 'firebase/firestore/lite';
import { firebaseConfig } from "../src/FirebaseConfig";

// npx ts-node packages/p32.dao.firebase/src/FirebaseConfigTester.ts

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

async function insertTest() {
    // await setDoc(doc(db, "eazimemo_simple", "memo"), {
    //     createAt: "bbbb",
    //     memoId: 2,
    //     message: "USA"
    // });

    const docRef = await addDoc(collection(db, "eazimemo_simple"), {
        createAt: "cc",
        memoId:3 ,
        message: "ccc"
    });
    console.log("Document written with ID: ", docRef.id);

    const memoCol = collection(db, 'eazimemo_simple');
    const memoSnapshot = await getDocs(memoCol);
    const memoList = memoSnapshot.docs.map(doc => doc.data());
    console.log("resunt ---");
    memoList.forEach(e=>console.log(e));
}

async function selectTest() {

    const memoCol = collection(db, 'eazimemo_simple');
    const memoSnapshot = await getDocs(memoCol);
    const memoList = memoSnapshot.docs.map(doc => { return { ...doc.data(), id:doc.id };});
    console.log("SELECT RESULT ---> ");
    memoList.forEach(e => console.log(e));
}

async function updateByKeyTest(msg:string) {

    const memoCol = collection(db, 'eazimemo_simple');
    const memoSnapshot = await getDocs(memoCol);
    const memoList = memoSnapshot.docs.map(doc => { return { ...doc.data(), id: doc.id }; });
    if ( memoList.length>3 ) {
        const memo = memoList[3] as any;
        memo.message = msg;
        const docRef = doc(db, 'eazimemo_simple', memo.id);
        // await setDoc(docRef, memo, { merge: true });
        await setDoc(docRef, { 
            message: msg
            , createdAt: serverTimestamp()
            , updatedAt: serverTimestamp()
        }, { merge: true });

        // or
        // await updateDoc(docRef, {
        //     message: msg
        // });
    }
}

// async function updateByWhereTest(msg: string) {

//     const memoCol = collection(db, 'eazimemo_simple');
//     const memoSnapshot = await getDocs(memoCol);
//     const memoList = memoSnapshot.docs.map(doc => { return { ...doc.data(), id: doc.id }; });
//     if (memoList.length > 3) {
//         const memo = memoList[3] as any;
//         memo.message = msg;
//         const docRef = doc(db, 'eazimemo_simple', memo.id);
//         await setDoc(docRef, memo, { merge: true });
//     }
// }

async function incrementTest() {
    console.log("init start");
    const ref = doc(db, 'eazimemo_simple', 'memo');
    await updateDoc(ref, {
        population: increment(550)
    });
    console.log("init end");
}

async function transactionTest1() {
    // docRef 등은 트랜젝션 외부에서?
    try {
        await runTransaction(db, async (transaction) => {
            const docRef = doc(db, 'eazimemo_simple', 'memo');
            const sfDoc = await transaction.get(docRef);
            if (!sfDoc.exists()) {
                throw "Document does not exist!";
            }

            console.log(sfDoc.data().population);
            const newPopulation = sfDoc.data().population + 1;
            transaction.update(docRef, { population: newPopulation });
        });
        console.log("Transaction successfully committed!");
    } catch (e) {
        console.log("Transaction failed: ", e);
    }
}

async function batchTest() {
    // Get a new write batch
    const batch = writeBatch(db);

    // Set the value of 'NYC'
    const memo1Ref = doc(db, "eazimemo_simple", "memo1");
    batch.set(memo1Ref, { message: "create1" });

    console.log('메시지수정');

    // Update the population of 'SF'
    const memo1Ref2 = doc(db, "eazimemo_simple", "memo1");
    batch.update(memo1Ref2, { "population": 1000000 });

    console.log('population수정');

    // Delete the city 'LA'
    const laRef = doc(db, "eazimemo_simple", "dE28OEveblyea8nUDuwu");
    batch.delete(laRef);

    console.log('삭제 dE28OEveblyea8nUDuwu ');

    // Commit the batch
    await batch.commit();
}

async function conditionSelectTest() {

    const q = query(collection(db, "eazimemo_simple"), where("population", ">", 1));

    const querySnapshot = await getDocs(q);
    console.log("WHERE CONDITION RESULT ---> ");
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
    console.log("WHERE CONDITION RESULT END ");
}

async function pagingTest() {

    console.log("pagingTest start");

    const limitCnt = 1;

    const all = query(collection(db, "eazimemo_simple"), orderBy("message"));
    const allSnapShot = await getDocs(all);
    const allSnapShotSize = allSnapShot.size;
    console.log("allSnapShotSize => " + allSnapShotSize);

    // Query the first page of docs
    const firstPage = query(collection(db, "eazimemo_simple"), orderBy("message"), limit(limitCnt));
    const documentSnapshots = await getDocs(firstPage);

    // Get the last visible document
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    // console.log("last", lastVisible);

    // Construct a new query starting at this document,
    // get the next 25 cities.
    if (allSnapShotSize > limitCnt) {
        const next = query(collection(db, "eazimemo_simple"),
            orderBy("message"),
            startAfter(lastVisible),
            limit(limitCnt));
        const nextSnapshots = await getDocs(next);

        console.log("next ----> ");
        nextSnapshots.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
        console.log("next ----> end");

    }
    console.log("pagingTest end");
}

async function main() {
    const runIncrementTest = false;
    if (runIncrementTest ) {
        await incrementTest();
    }

    const runBatchTest = false;
    if (runBatchTest) {
        await batchTest();
    }

    const runPagingTest = false;
    if (runPagingTest) {
        await pagingTest();
    }

    const runConditionSelect = false;
    if (runConditionSelect) {
        await conditionSelectTest();
    }

    const runTransactionTest = true;
    if (runTransactionTest) {
        await transactionTest1();
    }

    const runInsert = false;
    if (runInsert ) {
        await insertTest();
    }
    const runUpdateByKey = false;
    if (runUpdateByKey) {
        await updateByKeyTest("하하하 업데이트3");
    }

    // const runUpdateByKey = true;
    // if (runUpdateByKey) {
    //     await updateByKeyTest("하하하 업데이트3");
    // }
    const runSelectTest = false ;
    if ( runSelectTest ) {
        await selectTest();
    }
}

main();

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

