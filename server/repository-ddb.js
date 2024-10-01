import * as AWS from "@aws-sdk/client-dynamodb";
import {
  ScanCommand,
  GetCommand,
  PutCommand,
  DeleteCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';

// Configure the AWS Region
const REGION = 'us-west-1'; // Replace with your AWS region

// Create DynamoDB client
const client = new AWS.DynamoDB({ region: REGION });

export async function getAllPeople() {
  const params = {
    TableName: 'people',
  };
  try {
    const data = await client.send(new ScanCommand(params));
    return data.Items;
  } catch (err) {
    console.error('Error fetching all people:', err);
    return { error: true, message: 'Error fetching all people', details: err };
  }
}

export async function getPerson(id) {
  const params = {
    TableName: 'people',
    Key: {
      id: id,
    },
  };
  try {
    const data = await client.send(new GetCommand(params));
    return data.Item;
  } catch (err) {
    console.error(`Error fetching person with id ${id}:`, err);
    return { error: true, message: `Error fetching person with id ${id}`, details: err };
  }
}

export async function createPerson(person) {
  try {
    // Retrieve existing IDs to determine the next ID
    const scanParams = {
      TableName: 'people',
      ProjectionExpression: 'id',
    };
    const data = await client.send(new ScanCommand(scanParams));
    const ids = data.Items.map((item) => item.id);
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    const newId = maxId + 1;

    const newPerson = { id: newId, ...person };
    const putParams = {
      TableName: 'people',
      Item: newPerson,
    };
    await client.send(new PutCommand(putParams));
    return newPerson;
  } catch (err) {
    console.error('Error creating person:', err);
    return { error: true, message: 'Error creating person', details: err };
  }
}

export async function deletePerson(id) {
  const params = {
    TableName: 'people',
    Key: {
      id: id,
    },
  };
  try {
    await client.send(new DeleteCommand(params));
    return { success: true };
  } catch (err) {
    console.error(`Error deleting person with id ${id}:`, err);
    return { error: true, message: `Error deleting person with id ${id}`, details: err };
  }
}

export async function updatePerson(id, person) {
  const params = {
    TableName: 'people',
    Key: {
      id: id,
    },
    UpdateExpression:
      'SET #name = :name, cell = :cell, email = :email, picture = :picture',
    ExpressionAttributeNames: {
      '#name': 'name', // 'name' is a reserved keyword in DynamoDB
    },
    ExpressionAttributeValues: {
      ':name': person.name,
      ':cell': person.cell,
      ':email': person.email,
      ':picture': person.picture,
    },
    ReturnValues: 'ALL_NEW',
  };
  try {
    const data = await client.send(new UpdateCommand(params));
    return data.Attributes;
  } catch (err) {
    console.error(`Error updating person with id ${id}:`, err);
    return { error: true, message: `Error updating person with id ${id}`, details: err };
  }
}