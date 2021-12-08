// src/resolverMap.ts
const resolverMap = {
    Query: {
        helloWorld(_: void, args: void): string {
            return `Hello GraphQL~!` + args;
        },
    },
};

export default resolverMap;