# media-room

## Web client

### Installation

Mount the following files and folders as a web volume:

```
index.html
/app
/config
```

### Usage with Docker

```bash
# Build the Docker image
docker build -t mediaroom-web .
```

```bash
# Run the container
docker run -d --restart always -p 8000:80 -v "$(pwd)/index.html:/usr/share/nginx/html/index.html" -v "$(pwd)/app:/usr/share/nginx/html/app" -v "$(pwd)/config:/usr/share/nginx/html/config" mediaroom-web
```
