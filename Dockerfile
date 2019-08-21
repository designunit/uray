FROM node:12-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

EXPOSE 80
ENV APP_ACCESS_MODE=""

COPY . .

RUN npm run build

# Running the app
CMD [ "npm", "start", "--", "-p", "80" ]
