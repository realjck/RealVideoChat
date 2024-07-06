# media-room

### Containerized WebSockets server execution for Docker

**The build is intended to be deployed on a server with an SSL connection.**

```bash
# Build the image
docker build -t media-room .
```

The SSL keys must be generated in the usual paths. Launch your container like this to mount them in volume:

```bash
# Run the container
docker run -d --restart always -p 2002:8080 \
    -v /etc/letsencrypt/live/mediaroom.pxly.fr/fullchain.pem:/app/cert.pem \
    -v /etc/letsencrypt/live/mediaroom.pxly.fr/privkey.pem:/app/key.pem \
    media-room
```

Nginx configuration to expose the container on the web:

in `/etc/nginx/sites-available/default`

```nginx
server {
  listen 8443 ssl;
  server_name mediaroom.pxly.fr;
  ssl_certificate /etc/letsencrypt/live/mediaroom.pxly.fr/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/mediaroom.pxly.fr/privkey.pem;
  location / {
    proxy_pass https://localhost:2002;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```
