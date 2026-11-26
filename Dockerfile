FROM node:alpine

WORKDIR /usr/src

# 1. Install global dependencies (like yarn) while still root
RUN npm install -g yarn

# 2. Create a non-root group and user
RUN addgroup -S servo && adduser -S servo -G servo

# 3. Copy package files
COPY package.json yarn.lock ./

# 4. Copy the rest of your application files
COPY . .

# 5. Change ownership of the app directory to the non-root user
RUN chown -R servo:servo /usr/src

# 6. Switch to the non-root user for all subsequent operations
USER servo

# 7. Install project dependencies and start the app
RUN yarn

CMD ["yarn", "start"]