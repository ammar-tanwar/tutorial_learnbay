const AWS = require("aws-sdk");
import fs from "fs";
const AWSCredentials = {
  accessKey: process.env.AWSAccessKeyId,
  secret: process.env.AWSSecretKey,
  bucketName: "tutorlms-courses",
  Prefix: "somnath-practice/posts/",
};
function createInstance() {
  const s3 = new AWS.S3({
    accessKeyId: AWSCredentials.accessKey,
    secretAccessKey: AWSCredentials.secret,
  });
  return s3;
}

async function getAllFolderFromBucket() {
  const s3 = createInstance();
  const param = {
    Bucket: AWSCredentials.bucketName,
    Delimiter: "/",
    Prefix: AWSCredentials.Prefix,
    MaxKeys: 100,
  };
  const bucketData = await s3.listObjects(param).promise();

  return bucketData;
}
async function downloadFileFromBucket(key, path, parentFolder, fileName) {
  const s3 = createInstance();
  const param = {
    Bucket: AWSCredentials.bucketName,
    Key: key,
  };

  s3.getObject(param, function (err, data) {
    if (err) {
      console.log(err.message);
    } else {
      const dataFile = Buffer.from(data.Body).toString("utf8");
      fs.writeFileSync(`./posts/${parentFolder}/${fileName}`, dataFile, {
        encoding: "utf8",
      });
    }
  });
}
async function getAllFilesFromBucket(Prefix) {
  const s3 = createInstance();
  const param = {
    Bucket: AWSCredentials.bucketName,
    Prefix: Prefix,
    MaxKeys: 100,
  };
  const folderName = await s3.listObjects(param).promise();

  return folderName;
}
export default async function generatePage(req, res) {
  try {
    const folderData = await getAllFolderFromBucket();

    folderData.CommonPrefixes.map((data, i) => {
      const folder = data.Prefix.split("posts/");
      const parentFolder = folder[1].replace("/", "");
      const path = `./posts/${parentFolder}`;

      //make file in lib folder to read from post folder
      const readLibFile = fs.readFileSync("./libFile.txt", "utf8");
      const replaceLibFile = readLibFile.replace(
        /"posts\/Topic"/gi,
        `"/posts/${parentFolder}"`
      );
      fs.writeFileSync(`./lib/${parentFolder.trim()}-Page.js`, replaceLibFile, {
        encoding: "utf8",
      });

      const libPage = `${parentFolder.trim()}-Page`;

      //make folder for json files
      fs.mkdirSync(`./posts/${parentFolder}`, { recursive: true });
      //make folders and pages in page folder
      fs.mkdirSync(`./pages/${parentFolder}`, { recursive: true });
      //read the content replace what needed
      const readFile = fs.readFileSync("./demoPage.txt", "utf8");
      const replaced = readFile.replace(
        /import {getSortedPostsData, getAllPostIds,getPostData,} from "..\/..\/lib\/posts";/gi,
        `import { getSortedPostsData,getAllPostIds, getPostData, } from "../../lib/${libPage}";`
      );
      // Creating new file - paste.txt with file.txt's content
      fs.writeFileSync(`./pages/${parentFolder}/[id].js`, replaced, {
        encoding: "utf8",
      });
      const getFilesFromBucketFolder = async () => {
        const downloadAllFiles = await getAllFilesFromBucket(data.Prefix);

        downloadAllFiles.Contents.map((id, i) => {
          const fileName = id.Key.split(`${parentFolder}/`);

          const getAllDownloadFileData = async () => {
            const download = await downloadFileFromBucket(
              id.Key,
              path,
              parentFolder,
              fileName[1]
            );
          };
          getAllDownloadFileData();
        });
      };
      getFilesFromBucketFolder();
    });
    res.status(200).send("success");
  } catch (error) {
    res.status(500).send(error);
  }
}
