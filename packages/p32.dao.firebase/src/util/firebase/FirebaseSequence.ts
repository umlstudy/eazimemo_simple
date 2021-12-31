import { SjStringUtil } from "@sejong/common";
import { doc, Firestore, runTransaction, setDoc } from "firebase/firestore/lite";


export namespace FirebaseSequence {

    export const nextString = async (
        db: Firestore
        , sequenceTableName: string
        , tableName: string
        , stringFormat: string)
        : Promise<string> => {
        const seqNo = await next(db, sequenceTableName, tableName);
        return SjStringUtil.format(stringFormat, seqNo);
    }

    export const next = async (db:Firestore, sequenceTableName: string, tableName:string)
        : Promise<number> => {
        const sfDocRef = doc(db, sequenceTableName, tableName);

        try {
            const nextSeqNo = await runTransaction(db, async (transaction) => {
                let sfDoc = await transaction.get(sfDocRef);
                if (!sfDoc.exists()) {
                    await setDoc(sfDocRef, {sequence:0});
                    sfDoc = await transaction.get(sfDocRef);
                }
                const nextSeqNo = (sfDoc.data() as any).sequence + 1;
                transaction.update(sfDocRef, { sequence: nextSeqNo });

                return nextSeqNo;
            });

            return nextSeqNo as number;
        } catch (e) {
            throw e;
        }
    }
}