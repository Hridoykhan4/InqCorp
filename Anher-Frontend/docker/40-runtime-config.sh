#!/bin/sh
set -eu

html_root='/usr/share/nginx/html'
proxy_include='/etc/nginx/includes/api-proxy.inc'
production_api='https://api.inqilabtradingcorporation.com.bd'
production_site='https://inqilabtradingcorporation.com.bd'

mkdir -p "$(dirname "$proxy_include")"
: > "$proxy_include"

backend_upstream="${BACKEND_UPSTREAM:-}"
backend_url="${VITE_BACKEND_URL:-}"

if [ -n "$backend_upstream" ]; then
  if ! printf '%s' "$backend_upstream" | grep -Eq '^https?://[A-Za-z0-9._:-]+/?$'; then
    echo 'Invalid BACKEND_UPSTREAM. Expected an http(s) URL without a path.' >&2
    exit 1
  fi

  backend_upstream="${backend_upstream%/}"
  backend_url=''
  cat > "$proxy_include" <<EOF
location /api/ {
    proxy_pass ${backend_upstream};
    proxy_http_version 1.1;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_connect_timeout 5s;
    proxy_read_timeout 30s;
}

location /socket.io/ {
    proxy_pass ${backend_upstream};
    proxy_http_version 1.1;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host \$host;
    proxy_read_timeout 65s;
}
EOF
else
  case "$backend_url" in
    ''|http://localhost:*|https://localhost:*|http://127.0.0.1:*|https://127.0.0.1:*)
      if [ -n "$backend_url" ]; then
        echo "Ignoring browser-invalid production backend URL: $backend_url" >&2
      fi
      backend_url="$production_api"
      ;;
  esac
fi

backend_url="${backend_url%/}"
site_url="${VITE_SITE_URL:-$production_site}"
site_url="${site_url%/}"

escape_sed_replacement() {
  printf '%s' "$1" | sed 's/[\\&|]/\\&/g'
}

escaped_backend="$(escape_sed_replacement "$backend_url")"
escaped_site="$(escape_sed_replacement "$site_url")"

find "$html_root" -type f \( -name '*.js' -o -name '*.html' \) -exec \
  sed -i \
    -e "s|__ITC_BACKEND_URL__|${escaped_backend}|g" \
    -e "s|__ITC_SITE_URL__|${escaped_site}|g" {} +

echo "Frontend API target: ${backend_url:-same-origin proxy}"
