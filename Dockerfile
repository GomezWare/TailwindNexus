FROM node:22

RUN apt-get update \
 && apt-get install -y chromium \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends	

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium

WORKDIR /usr/src/app

COPY ./*.json ./
COPY ./src ./src
COPY ./public ./public
COPY ./upload ./upload
COPY ./.env ./
COPY ./*.mjs ./

ENV NODE_ENV prod

RUN npm update -g
RUN npm i

RUN npm run build


EXPOSE 80

ENV HOST="0.0.0.0"
CMD [ "node", "./dist/server/entry.mjs"]
