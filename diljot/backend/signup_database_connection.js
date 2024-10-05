import mongoose from 'mongoose';

const obj = {
  name: 'aminkmgd',
  age:21,
  password: 'ahabga',
  email:'djjigd'
}
//schema definition
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    age: Number,
    password: { type: String, required: true}
});
//model definition
const credCollect = mongoose.model('credentialcollection', userSchema);

// const doc = new credCollect({ name: 'raj', email: 'raj.87987@shinda.com', password: 'shinda@raj' });
// console.log(doc.name); 
// await doc.save();
// console.log('done');



    
    async function main() {
      try{
        await mongoose.connect('mongodb://127.0.0.1:27017/projectdatabase', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 20000 // Set to 20 seconds
    });
      console.log('Successfully connected to MongoDB');
      await addCredential();
      await findDoc(obj.name, obj.password).then(console.log);
  }
   catch(err){console.error(err);}
   finally {
    mongoose.connection.close(); // Ensure the connection is closed
  }

    }
    async function addCredential() {
      
      // Create a new document
      const newDoc = new credCollect({
          username: obj.name,
          age: obj.age,
          email: obj.email,
          password:obj.password
          // Add other fields as necessary
      });

    // Save the document to the collection
    try{
    await newDoc.save();
    console.log('Document added to credentialcollections');
  }
  catch(err){
    console.error('Error saving document:', err);
  }
}

  async function findDoc(username, password) {
    try {
      const results = await credCollect.find({ username, password });
      if (results.length > 0) {
        // If found, return the documents
        console.log('Documents found:', results);
        return results;
      } else {
        // If not found, return an error message
        console.error('No documents found with the specified username.');
        throw new Error('No documents found');
      }
    } catch (error) {
      console.error('Error finding documents:', error);
      throw error; // Rethrow the error for handling elsewhere if needed
    }
     
  }
  
  main();
  
