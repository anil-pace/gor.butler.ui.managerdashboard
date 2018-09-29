# Step 1 - build
FROM node:8 as build-deps
WORKDIR /usr/src/app
COPY ./ ./
RUN npm install
RUN npm run build
COPY /usr/src/app/build /usr/share/nginx/html/md
RUN echo Deleting the source files except the build folder
RUN rm src/*