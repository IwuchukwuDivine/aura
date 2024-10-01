import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';


export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.company.aura',
  projectId: '66fa917a002a6fe08739',
  databaseId: '66fa94d0000742e8e821',
  userCollectionId: '66fa94f500219583b4fa',
  videoCollectionId: '66fa9532001c4deb19a7',
  storageId: '66fac4730004c276fce8'
}

const client = new Client();
client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async (email, password, username) => {
  try{
    const newUser = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if(!newUser) throw Error;
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);
    const newUserDetails = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newUser.$id,
        email,
        username,
        avatar: avatarUrl
      }
    )
    console.log(newUser, newUserDetails);
    return newUserDetails;
  }catch(error){
    console.log(error);
    throw new Error(error);
  }
}
// login user
export const signIn = async(email, password) => {
  try{
   const session = await account.createEmailPasswordSession(email, password);
    return session;
  }catch(error){
    console.log(error);
    throw new Error(error);
  }
}

// get logged in user
export const getLoggedInUser = async () => {
  try {
    const currentUser = await account.get();
    if(!currentUser) throw Error;

    const loggedInUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentUser.$id)]
    )
    if(!loggedInUser) throw Error;
    return loggedInUser.documents[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}
// getAllVideos
export const getAllPosts = async() => {
  try{
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    )
    return posts.documents;
  }catch(error){
    console.log(error);
    throw new Error(error);
  }
}


export const getLatestPosts = async() => {
  try{
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))]
    )
    return posts.documents;
  }catch(error){
    console.log(error);
    throw new Error(error);
  }
}