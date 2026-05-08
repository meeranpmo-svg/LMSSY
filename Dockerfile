FROM nginx:alpine

LABEL maintainer="SYPA IICPR Institute <hello@sypa.in>"
LABEL description="SYPA IICPR LMS Portal — Mental & Physical Wellness Education"

RUN rm -rf /usr/share/nginx/html/*

COPY . /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -f /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/nginx.conf \
          /usr/share/nginx/html/.dockerignore && \
    rm -rf /usr/share/nginx/html/.claude

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -q --spider http://localhost/index.html || exit 1

CMD ["nginx", "-g", "daemon off;"]
