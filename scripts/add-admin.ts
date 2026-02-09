import 'dotenv/config';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import * as readline from 'readline';
import dns from 'node:dns/promises';

dns.setServers(['1.1.1.1', '1.0.0.1']);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

async function addAdmin() {
  const client = new MongoClient(MONGODB_URI!);

  try {
    await client.connect();
    console.log('✓ Connected to MongoDB');

    const db = client.db();
    const adminsCollection = db.collection('admins');

    // Get admin details
    const username = await question('Enter username: ');
    const password = await question('Enter password: ');
    const email = await question('Enter email: ');

    // Check if username already exists
    const existingAdmin = await adminsCollection.findOne({ username });
    if (existingAdmin) {
      console.error('✗ Username already exists!');
      rl.close();
      await client.close();
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin object
    const newAdmin = {
      username,
      password: hashedPassword,
      email,
      role: 'admin',
      isActive: true,
      createdAt: new Date()
    };

    // Insert into database
    const result = await adminsCollection.insertOne(newAdmin);

    console.log('\n✓ Admin created successfully!');
    console.log('Admin ID:', result.insertedId);
    console.log('Username:', username);
    console.log('Email:', email);

    rl.close();
    await client.close();
  } catch (error) {
    console.error('✗ Error creating admin:', error);
    rl.close();
    await client.close();
    process.exit(1);
  }
}

addAdmin();
