# project-saper
A note keeping app made with React and Material UI


1. cd `project-saper`
2. Run the following two commands
```
docker build -t saper-app .
```
```
docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 127.0.0.1:8000:8080 saper-app
```
3. Open [`127.0.0.1:8000/`](http://127.0.0.1:8000/)
