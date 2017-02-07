echo $(grep "version" package.json | sed 's/"version": "//g' | sed 's/",//g' | sed -e 's/[ \t]*//')
