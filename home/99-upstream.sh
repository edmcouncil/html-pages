#!/bin/sh

for P in /htmlpages/*/*.tar.xz ; do
 install -dv /opt/html-pages
 rm -rf "/opt/html-pages${P%.tar.xz}"
 tar xJpf "${P}" -C /opt/html-pages/
done

#	e.g. FAMILY_REGEX="fibo|idmp|iof"
if [ -n "${FAMILY_REGEX}" ] ; then
 sed -i "s#\((?<family>\)[^)]*\()\)#\1${FAMILY_REGEX}\2#g" /etc/nginx/conf.d/default.conf
 for i in $(echo "${FAMILY_REGEX}" | sed 's/|/ /g') ; do
  export SPEC_HOST=spec.edmcouncil.org ; test "${i}" = "iof" && export SPEC_HOST=spec.industrialontologies.org
  viewer="$(getent hosts ${i}-viewer | awk '{print $1}')" ; echo -e "upstream ${i}-viewer {\n\tserver\t${viewer:-${SPEC_HOST}}:80;\n}"
  viewer_ver="$(getent hosts ${i}-viewer-ver | awk '{print $1}')" ; echo -e "upstream ${i}-viewer-ver {\n\tserver\t${viewer_ver:-${SPEC_HOST}}:80;\n}"
  pages="$(getent hosts ${i}-pages | awk '{print $1}')" ; echo -e "upstream ${i}-pages {\n\tserver\t${pages:-127.0.0.1}:80;\n}"
  strapi="$(getent hosts ${i}-strapi | awk '{print $1}')" ; echo -e "upstream ${i}-strapi {\n\tserver\t${strapi:-127.0.0.1}:1337;\n}"
 done > /etc/nginx/conf.d/upstream.conf
fi

test -z "${BRANCH_NAME}" || sed -i "s/\(set\s\+\$html_branch\s\+\)[^\;]\+\(;\)/\1${BRANCH_NAME}\2/g" /etc/nginx/conf.d/default.conf
test -z "${TAG_NAME}" || sed -i "s/\(set\s\+\$html_tag\s\+\)[^\;]\+\(;\)/\1${TAG_NAME}\2/g" /etc/nginx/conf.d/default.conf
