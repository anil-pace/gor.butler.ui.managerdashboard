#!/bin/bash

RELVSNCMD="git describe  --abbrev=7 --tags --always --first-parent"

case "$1" in
    run)
	RELVSN=$(exec ${RELVSNCMD})
	mkdir butler_md_alpha-$RELVSN
	install -d butler_md_alpha-$RELVSN/opt/butler_md_alpha
	cp -R . butler_md_alpha-$RELVSN/opt/butler_md_alpha
	install -d butler_md_alpha-$RELVSN/var/log/butler_md_alpha
	install -d butler_md_alpha-$RELVSN/usr/local/bin/
	install -d butler_md_alpha-$RELVSN/etc/butler_md_alpha
	install -d butler_md_alpha-$RELVSN/etc/init.d
	cp -r ../dpkg_conf/butler_md_alpha butler_md_alpha-$RELVSN/etc/init.d/butler_md_alpha
	mkdir butler_md_alpha-$RELVSN/DEBIAN
	cp ../dpkg_conf/butler_md_alpha/control butler_md_alpha-$RELVSN/DEBIAN/control
	cp ../dpkg_conf/butler_md_alpha/rules butler_md_alpha-$RELVSN/DEBIAN/rules
	cp ../dpkg_conf/butler_md_alpha/copyright butler_md_alpha-$RELVSN/DEBIAN/copyright
	cp ../dpkg_conf/butler_md_alpha/changelog butler_md_alpha-$RELVSN/DEBIAN/changelog
	ln -sf /opt/butler_md_alpha/bin/butler_md_alpha butler_md_alpha-$RELVSN/usr/local/bin/
	ln -sf /opt/butler_md_alpha/log butler_md_alpha-$RELVSN/var/log/butler_md_alpha
	chmod u+rw ./butler_md_alpha-$RELVSN
	fakeroot dpkg-deb --build butler_md_alpha-$RELVSN
	rm -rf ./butler_md_alpha-$RELVSN
	;;
    *)
        echo "Usage: $SCRIPT {run}"
        exit 1
        ;;
esac

exit 0
