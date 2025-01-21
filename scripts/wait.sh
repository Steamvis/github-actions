#!/bin/bash

# Фиксируем время начала
WAIT_IMAGE_TIME=10

echo "Starting a check to verify that the image exists in the registry."
start_time=$(date +%s)
while true; do
    docker pull "${INSTALL_IMAGE_NAME}"
    if [ $? -ne 0 ]; then
        echo "failed pull image"
    else
        echo "success pull image"
        break
    fi
    sleep 5
    current_time=$(date +%s)
    # Calculating the time difference in seconds 
    if [[ -n "${start_time}" && -n "${current_time}" ]]; then
        elapsed_seconds=$(( current_time - start_time ))
    else
        echo "Error time calculating..."
        continue
    fi
    if (( $elapsed_seconds >= ${WAIT_IMAGE_TIME} )); then
        echo "${elapsed_seconds} seconds have passed; the check is complete with error"
        exit 1
    fi
done