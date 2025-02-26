#!/bin/bash

# Variables
JAR_FILE="target/project-0.0.1-SNAPSHOT.jar"
VM_USER="root"
VM_HOST="46.202.167.52"
VM_PATH="/home/"
VM_APP_NAME="project-0.0.1-SNAPSHOT.jar"


# Upload the JAR file to the VM
scp $JAR_FILE $VM_USER@$VM_HOST:$VM_PATH
#sudo systemctl restart myapp.service
#sudo journalctl -u myapp.service -f
