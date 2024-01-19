#!/bin/sh

cd "$(dirname "$(realpath "${0}")")"
if [ -f .env ]; then
 set -o allexport; source .env; set +o allexport
fi

for P in /htmlpages/*/*.tar.xz ; do
 install -dv /opt/html-pages
 rm -rf "/opt/html-pages${P%.tar.xz}"
 tar xJpf "${P}" -C /opt/html-pages/
done

#	e.g. FAMILY_REGEX="fibo|idmp|iof"
if [ -n "${FAMILY_REGEX}" ] ; then
 sed -i "s#\((?<family>\)[^)]*\()\)#\1${FAMILY_REGEX}\2#g" /etc/nginx/conf.d/default.conf
 for i in $(echo "${FAMILY_REGEX}" | sed 's/|/ /g') ; do
  unset pages ; unset viewer ; unset viewer_ver
  pages="$(getent hosts ${i}-pages | awk '{print $1}')"
  if [ -z "${pages}" ] ; then
   echo "ERR: missing required service \"${i}-pages\""
   exit 1
  fi
  echo -e "upstream ${i}-pages {\n\tserver\t${pages}:80;\n}"
  viewer="$(getent hosts ${i}-viewer | awk '{print $1}')" ; echo -e "upstream ${i}-viewer {\n\tserver\t${viewer:-${pages}}:80;\n}"
  viewer_ver="$(getent hosts ${i}-viewer-ver | awk '{print $1}')" ; echo -e "upstream ${i}-viewer-ver {\n\tserver\t${viewer_ver:-${pages}}:80;\n}"
 done > /etc/nginx/conf.d/upstream.conf
fi

test -z "${BRANCH_NAME}" || sed -i "s/\(set\s\+\$html_branch\s\+\)develop\s*\(;\)/\1${BRANCH_NAME}\2/g" /etc/nginx/conf.d/default.conf
test -z "${TAG_NAME}" || sed -i "s/\(set\s\+\$html_tag\s\+\)latest\s*\(;\)/\1${TAG_NAME}\2/g" /etc/nginx/conf.d/default.conf
