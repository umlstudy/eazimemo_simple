/* eslint-disable @typescript-eslint/no-namespace */
import { Firestore } from "firebase/firestore/lite";
import { FirebaseSequence } from "../util/firebase/FirebaseSequence";

export namespace SequenceGenerator {

    const SEQUENCE_TBL_NAME = 'sequence_table';
    // const SEQ_STRING_FORMAT = '%016d';
    const SEQ_STRING_FORMAT = '%d';

    const nextString = async (db: Firestore , tableName: string):Promise<string> => {
        const seq = await FirebaseSequence.nextString(db, SEQUENCE_TBL_NAME, tableName, SEQ_STRING_FORMAT);
        return seq;
    }

    export const nextTestSeqSeq = async (db: Firestore): Promise<string> => {
        return await nextString(db, "test_seq");
    }

    // auto generated
    export const nextMemoSeq = async (db: Firestore): Promise<string> => {
        return await nextString(db, "memo");
    }

    export const nextUserSeq = async (db: Firestore): Promise<string> => {
        return await nextString(db, "user");
    }

}
