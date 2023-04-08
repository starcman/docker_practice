# Docker & Kubernetes

### Docker Commands

docker build .

docker run -d -p 3000:3000 <imageName>

docker stop <imageName>

docker run -it <imageName>

- Inspect the docker images 
```
docker inspect <imageid>
```

- Copy files to & from the container 
```
docker cp filePath <containerName>:/path
```

- Run container in attached mode
```
docker start -a <containerName>
```

- Run container in attached & interactive mode
```
docker start -a -i <containerName>
```
