# 중간생성파일 모두 삭제

find . -name node_modules | awk '{ print "rm -rf " $0 }' | bash
find . -name dist | awk '{ print "rm -rf " $0}' | bash
find . -name *.js | awk '{ print "rm " $0 }' | bash
find . -name *.map | awk '{ print "rm " $0 }' | bash
find . -name *.d.ts | awk '{ print "rm " $0 }' | bash

# 다시 빌드
yarn install
cd /d/gitrepos/eazimemo_simple/packages/p11.common;tsc;cd ../..
cd /d/gitrepos/eazimemo_simple/packages/p21.model;tsc;cd ../..
cd /d/gitrepos/eazimemo_simple/packages/p31.dao;tsc;cd ../..
cd /d/gitrepos/eazimemo_simple/packages/p41.biz;tsc;cd ../..
cd /d/gitrepos/eazimemo_simple/packages/p51.graphql;tsc;cd ../..
