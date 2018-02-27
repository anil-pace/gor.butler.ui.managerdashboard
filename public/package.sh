#!/bin/bash

RELVSNCMD="git describe  --abbrev=7 --tags --always --first-parent"

case "$1" in
    run)
	RELVSN=$(exec ${RELVSNCMD})
	mkdir butler_md-$RELVSN
	install -d butler_md-$RELVSN/opt/butler_md
	# copying all the resources from the dist folder 
	cp index.html butler_md-$RELVSN/opt/butler_md
	cp asset-manifest.json butler_md-$RELVSN/opt/butler_md
	cp favicon.ico butler_md-$RELVSN/opt/butler_md
	cp -R assets butler_md-$RELVSN/opt/butler_md
	cp -R static butler_md-$RELVSN/opt/butler_md
	install -d butler_md-$RELVSN/var/log/butler_md
	install -d butler_md-$RELVSN/usr/local/bin/
	install -d butler_md-$RELVSN/etc/butler_md
	install -d butler_md-$RELVSN/etc/init.d
	cp -r ../dpkg_conf/butler_md butler_md-$RELVSN/etc/init.d/butler_md
	mkdir butler_md-$RELVSN/DEBIAN
	cp ../dpkg_conf/butler_md/control butler_md-$RELVSN/DEBIAN/control
	cp ../dpkg_conf/butler_md/rules butler_md-$RELVSN/DEBIAN/rules
	cp ../dpkg_conf/butler_md/copyright butler_md-$RELVSN/DEBIAN/copyright
	cp ../dpkg_conf/butler_md/changelog butler_md-$RELVSN/DEBIAN/changelog
	ln -sf /opt/butler_md/bin/butler_md butler_md-$RELVSN/usr/local/bin/
	ln -sf /opt/butler_md/log butler_md-$RELVSN/var/log/butler_md
	chmod u+rw ./butler_md-$RELVSN
	sed -i --follow-symlinks "s/Version:.*$/Version: $RELVSN/" butler_md-$RELVSN/DEBIAN/control
	fakeroot dpkg-deb --build butler_md-$RELVSN
	rm -rf ./butler_md-$RELVSN
	;;
    *)
        echo "Usage: $SCRIPT {run}"
        exit 1
        ;;
esac

exit 0