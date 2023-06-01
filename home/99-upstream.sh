#!/bin/sh

if [ -e /html-pages.tar.xz ] ; then
 export P="${PRODUCT:-htmlpages}/${BRANCH_NAME:-develop}/${TAG_NAME:-latest}"
 install -dv /opt/html-pages
 rm -rf /opt/html-pages/"${P}"
 tar xJpf /html-pages.tar.xz -C /opt/html-pages/
else
 echo "WARN: missing /html-pages.tar.xz"
fi

test -d /strapi/db && export O="$(cd /strapi/db && for i in *.db.template ; do echo ${i/.db.template} ; done | sort | tr [:space:] '|' | sed 's/|$//g')"

test -n "${O}" && sed -i "s#\((?<family>\)[^)]*\()\)#\1${O}\2#g" /etc/nginx/conf.d/default.conf && for i in $(echo "${O}" | sed 's/|/ /g') ; do
 export SPEC=spec.edmcouncil.org ; test "${i}" = "iof" && export SPEC=spec.industrialontologies.org
 viewer="$(getent hosts ${i}-viewer | awk '{print $1}')" ; echo -e "upstream ${i}-viewer {\n\tserver\t${viewer:-${SPEC}}:80;\n}"
 viewer_ver="$(getent hosts ${i}-viewer-ver | awk '{print $1}')" ; echo -e "upstream ${i}-viewer-ver {\n\tserver\t${viewer_ver:-${SPEC}}:80;\n}"

 pages="$(getent hosts ${i}-pages | awk '{print $1}')" ; echo -e "upstream ${i}-pages {\n\tserver\t${pages:-127.0.0.1}:80;\n}"

 strapi="$(getent hosts ${i}-strapi | awk '{print $1}')" ; echo -e "upstream ${i}-strapi {\n\tserver\t${strapi:-127.0.0.1}:1337;\n}"
done > /etc/nginx/conf.d/upstream.conf

sed -i "s/\(set\s\+\$html_branch\s\+\)[^\;]\+\(;\)/\1${BRANCH_NAME:-develop}\2/g" /etc/nginx/conf.d/default.conf
sed -i "s/\(set\s\+\$html_tag\s\+\)[^\;]\+\(;\)/\1${TAG_NAME:-latest}\2/g" /etc/nginx/conf.d/default.conf
