FROM node: 16.15

WORKDIR /app

COPY . /app

RUN npm install

CMD ["npm" , "start"]