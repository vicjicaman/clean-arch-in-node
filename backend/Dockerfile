FROM node:14.13.0-alpine

RUN mkdir -p /app
RUN chown -R node /app

USER node

ARG CACHEBUST=1
RUN echo "CACHE $CACHEBUST"

COPY --chown=node:node ./node_modules /app/node_modules

WORKDIR /app

ENTRYPOINT ["yarn"]
CMD ["start"]
#CMD ["/app/node_modules/nodemon/bin/nodemon.js", "-L", "/app/dist/index.js", "--watch", "/app/dist"]
#CMD ["/app/dist/index.js"]

EXPOSE 4000
