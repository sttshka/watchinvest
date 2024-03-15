FROM node:lts
WORKDIR /app
COPY . /app
RUN yarn install && chmod +x /app/entrypoint.sh
CMD /app/entrypoint.sh
