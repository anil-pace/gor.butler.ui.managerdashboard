# Step 1 - build
FROM node:8 as build-deps
WORKDIR /usr/src/app
COPY ./ ./
RUN npm install
RUN npm run build

# Step 2 - deploy app
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html/md
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]