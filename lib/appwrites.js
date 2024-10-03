import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';


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
const storage = new Storage(client);

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
    return newUserDetails;
  }catch(error){
    console.error(error);
    throw new Error(error);
  }
}
// login user
export const signIn = async(email, password) => {
  try{
   const session = await account.createEmailPasswordSession(email, password);
    return session;
  }catch(error){
    console.error(error);
    throw new Error(error);
  }
}
export const signOut = async() => {
  try{
    await account.deleteSession('current');
  }catch(error){
    console.error(error);
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
      config.videoCollectionId,
      [Query.orderDesc('$createdAt')]
    )
    return posts.documents;
  }catch(error){
    console.error(error);
    throw new Error(error);
  }
}


export const getLatestPosts = async() => {
  try{
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [
        Query.orderDesc('$createdAt'),
        Query.limit(3)
      ]
    )
    return posts.documents;
  }catch(error){
    console.error(error);
    throw new Error(error);
  }
}

export const searchPosts = async(query) => {
  try{
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [
        Query.search('title', query),
      ]
    )
    return posts.documents;
  }catch(error){
    console.error(error);
    throw new Error(error);
  }
}
export const getUserPost = async(userId) => {
  try{
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [
        Query.equal('users', userId),
      ]
    )
    return posts.documents;
  }catch(error){
    console.error(error);
    throw new Error(error);
  }
}
const getFileTypePreview = async(fileId, type) => {
  let fileUrl;
  try{
    if(type === 'video'){
      fileUrl = storage.getFileView(config.storageId, fileId)
    }else if (type === 'image'){
      fileUrl = storage.getFilePreview(config.storageId, fileId, 2000, 2000, 'top', 100)
    }
    return fileUrl
  }catch(error){
    console.error(error)
    throw new Error(error)
  }
}
const uploadFile = async (file, type) => {
  if(!file) return;
  const asset = {
    name: file.name,
    type: file.mimeType,
    size: file.size,
    uri: file.uri
  }
  try{
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );
    const fileUrl =  await getFileTypePreview(uploadedFile.$id, type)
    return fileUrl;
  }catch(error){
    console.error(error)
    throw new Error(error)
  }
}
export const createPost = async (form) => {
  try{
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video')
    ])
    const newPost = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        video: videoUrl,
        thumbnail: thumbnailUrl,
        prompt: form.prompt,
        users: form.userId
      }
    )
    return newPost
  }catch(error){
    console.error(error)
    throw new Error(error)
  }
}