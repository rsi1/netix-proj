FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Update
RUN apt-get update && apt-get upgrade -y

# Node.js 22
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

# Java 21 + Maven
RUN apt-get install -y openjdk-21-jdk maven

# Tools
RUN apt-get install -y git curl wget unzip

WORKDIR /workspace
