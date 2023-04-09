Building an Image 

List the images 
docker image

Build the image 
docker build . 

Build the iamge with name & tag
docker build . -t name:tag

List the container 
docker ps -a

Run the container 
docker run -p PORT:PORT --name customName imageVersion

docker run -i --name customName imageVersion

