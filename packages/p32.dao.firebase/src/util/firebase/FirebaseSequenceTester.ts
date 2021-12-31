import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { firebaseConfig } from "../../FirebaseConfig";
import { FirebaseSequence } from "./FirebaseSequence";

// npx ts-node packages/p32.dao.firebase/src/util/firebase/FirebaseSequenceTester.ts

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function nextStringTest() {
    const val = await FirebaseSequence.nextString(db, 'sequence_table', "test_seq", "%015d");
    console.log("created => " + val);
}

async function runMain() {
    await nextStringTest();
}

runMain();