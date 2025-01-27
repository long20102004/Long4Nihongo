#!/bin/bash

# Variables
JAR_FILE="target/project-0.0.1-SNAPSHOT.jar"
VM_USER="hoanghailonguyno"
VM_HOST="20.239.232.148"
VM_PATH="/home/hoanghailonguyno/"
VM_APP_NAME="project-0.0.1-SNAPSHOT.jar"

# Build the JAR file
mvn clean package

# Upload the JAR file to the VM
scp $JAR_FILE $VM_USER@$VM_HOST:$VM_PATH
sudo systemctl restart myapp.service
#sudo journalctl -u myapp.service -f
