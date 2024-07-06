# media-room

### Containerized WebSockets server execution for Docker

```bash
# Build the image
docker build -t media-room .
```

```bash
# Run the container
docker run -d --restart always -p 8080:8080 media-room
```
