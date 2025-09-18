FROM docker.io/library/node:20-slim


WORKDIR /app/projects/server
COPY projects/server/package.json package.json
RUN npm install


WORKDIR /app
COPY package.json package.json
RUN npm install


WORKDIR /app/projects/server
COPY projects/server/dist/ ./dist/
# COPY projects/server/public/ ./public
# COPY projects/server/public-prod/ ./public-prod



# WORKDIR /app/projects/app-client
# COPY projects/app-client/package.json package.json
# RUN npm install
WORKDIR /app/projects/app-client
# COPY projects/app-client/package.json package.json
COPY projects/app-client/.next/standalone ./

COPY projects/app-client/public ./public
COPY projects/app-client/.next/static ./.next/static
# RUN npm install

ENV HOST=0.0.0.0 PORT=3000
ENV HOST_SERVER=0.0.0.0 PORT_SERVER=3000
ENV HOSTNAME=0.0.0.0
WORKDIR /app


EXPOSE 4000
CMD [ "yarn", "prod" ]
