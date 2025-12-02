# NETIX DEVCONTAINER BASE
FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Update system
RUN apt-get update && apt-get upgrade -y

# Install Node.js 22
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

# Install Java 21 + Maven
RUN apt-get install -y openjdk-21-jdk maven

# Install tools
RUN apt-get install -y git curl wget unzip

# Set the workspace
WORKDIR /workspace
