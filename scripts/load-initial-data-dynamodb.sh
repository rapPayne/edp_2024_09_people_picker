#!/bin/bash

# This script loads data from 'people.json' into the 'people' DynamoDB table.

# Set variables
TABLE_NAME="people"
REGION="us-west-1"
DATA_FILE="../server/people.json"

# Check if AWS CLI and jq are installed
if ! command -v aws &> /dev/null
then
    echo "AWS CLI not found. Please install it before running this script."
    exit 1
fi

if ! command -v jq &> /dev/null
then
    echo "jq not found. Please install it before running this script."
    exit 1
fi

# Check if the data file exists
if [ ! -f "$DATA_FILE" ]; then
    echo "Data file '$DATA_FILE' not found."
    exit 1
fi

# Read data from the file
DATA=$(cat "$DATA_FILE")

# Generate batch-write-item JSON
echo "Generating batch-write-item JSON..."

BATCH_ITEMS=$(echo "$DATA" | jq -c '[.[] | {
    PutRequest: {
        Item: (
            {
                id: { N: (.id | tostring) },
                name: { S: (.name.first + " " + .name.last) },
                cell: { S: (.cell // "") }
            } + 
            (if .email != null then { email: { S: .email } } else {} end) +
            (if .picture.large != null then { picture: { S: .picture.large } } else {} end)
        )
    }
}]')

# Since batch-write-item supports up to 25 items, process in batches if necessary
TOTAL_ITEMS=$(echo "$BATCH_ITEMS" | jq '. | length')
BATCH_SIZE=25

# Split into batches
for (( i=0; i<${TOTAL_ITEMS}; i+=${BATCH_SIZE} )); do
    BATCH=$(echo "$BATCH_ITEMS" | jq ".[$i:$(($i+$BATCH_SIZE))]")
    BATCH_WRITE_JSON=$(jq -n --argjson items "$BATCH" '{ "'$TABLE_NAME'": $items }')
    
    # Save to a temporary file
    TEMP_FILE=$(mktemp)
    echo "$BATCH_WRITE_JSON" > "$TEMP_FILE"
    
    # Perform batch-write-item
    echo "Writing items $((i+1)) to $((i+${BATCH_SIZE})) to DynamoDB table '$TABLE_NAME'..."
    aws dynamodb batch-write-item \
        --request-items file://"$TEMP_FILE" \
        --region $REGION
    
    # Clean up
    rm "$TEMP_FILE"
done

echo "Data loaded into DynamoDB table '$TABLE_NAME'."