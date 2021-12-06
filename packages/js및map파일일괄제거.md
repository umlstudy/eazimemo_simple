
find . -name dist | awk '{ print "rm -rf " $0}'

find . -name *.js | awk '{ print "rm " $0 }' | bash
find . -name *.map | awk '{ print "rm " $0 }' | bash