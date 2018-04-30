import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import * as firebase from 'firebase';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { FirebaseFolder } from '../../../providers/firebase/classes/firebase-folder';
import { FirebaseFile } from '../../../providers/firebase/classes/firebase-file';
import { FirebaseUpload } from '../../../providers/firebase/classes/firebase-upload';


class FirebaseFilePicker extends FirebaseFile {
  is_image?: boolean;
  mSelected?: boolean;
  constructor() {
    super();
    this.is_image = false;
    this.mSelected = false;
    this.folder = "";
    this.firebase_id = "";
    this.firebase_reference = "";
    this.url = "";
    this.content_type = "";
  }
}

@IonicPage()
@Component({
  selector: 'page-firebase-storage',
  templateUrl: 'firebase-storage.html',
})
export class FirebaseStoragePage {
  mRootDocumentPath: string = "storage/uploads";
  mDirectoryCollectionPath: string = "storage/uploads/categories";
  mFilesCollectionPath: string = "storage/uploads/files";
  mStoragePath: string = "uploads";

  mDirectoryCollectionRef: AngularFirestoreCollection<FirebaseFolder>;
  mFileCollectionRef: AngularFirestoreCollection<FirebaseFile>;

  mFirebaseFolders: Array<FirebaseFolder> = [];
  mCurrentFolders: Array<FirebaseFolder> = [];
  mFolderPaths: Array<string> = [];
  mCurrentFolder: FirebaseFolder = new FirebaseFolder();


  mFirebaseFiles: Array<FirebaseFilePicker> = [];
  mCurrentFiles: Array<FirebaseFilePicker> = [];
  mCurrentFile: FirebaseFilePicker = new FirebaseFilePicker();

  mTitle: string = "Firebase Storage";
  mPickType: string = "image/";
  mMutipleFiles: boolean = false;
  images: Array<FirebaseFilePicker> = [];

  constructor(
    public mViewController: ViewController,
    public mActionSheetController: ActionSheetController,
    public mToastController: ToastController,
    public mAlertController: AlertController,
    public mAngularFirestore: AngularFirestore,
    public navCtrl: NavController,
    public navParams: NavParams) {

    if (this.navParams.get("mutiple_files")) {
      this.mMutipleFiles = this.navParams.get("mutiple_files");
    }
    if (this.navParams.get("title")) {
      this.mTitle = this.navParams.get("title");
    }
    if (this.navParams.get("images")) {
      this.images = this.navParams.get("images");
    }
    if (this.navParams.get("root_path")) {
      this.mStoragePath += this.navParams.get("root_path");
    }
    this.mCurrentFolder.folder_path = this.mStoragePath;
  }

  ionViewDidEnter() {
    this._CheckCreatedStorage().then(() => {
      this._ConnectToFirebase();
    });
  }

  _CheckCreatedStorage() {
    return new Promise((resolve, reject) => {
      firebase.firestore().collection(this.mRootDocumentPath.split('/').shift()).get().then(
        data => {
          let docs = data.docs;
          if (docs.length == 0) {
            firebase.firestore().doc(this.mRootDocumentPath).set({}).then(() => {
              resolve();
            });
          } else {
            resolve();
          }
        }
      );
    });
  }

  onSelectedFolderChanged() {
    let rootPath = this.mCurrentFolder.folder_path + "/";
    this.mCurrentFolders = this.mFirebaseFolders.filter(item => {
      if (item.folder_path.startsWith(rootPath) && (item.folder_path.replace(rootPath, "").indexOf("/") == -1)) {
        return true;
      }
      return false;
    });

    this.mFolderPaths = this.mCurrentFolder.folder_path.replace(this.mStoragePath, "").split('/');

    this.mCurrentFiles = this.mFirebaseFiles.filter(item => {
      return item.folder == this.mCurrentFolder.folder_path;
    });

  }

  _GetFileFromData(data): FirebaseFilePicker {
    let file: FirebaseFilePicker = {
      firebase_id: data.firebase_id,
      firebase_reference: data.firebase_reference,
      storage_reference: data.storage_reference,
      name: data.name,
      url: data.url,
      content_type: data.content_type,
      folder: data.folder,
      is_image: data.content_type.startsWith('image'),
      mSelected: false
    };
    return file;
  }

  _ConnectToFirebase() {
    this.mDirectoryCollectionRef = this.mAngularFirestore.collection(this.mDirectoryCollectionPath);
    this.mFileCollectionRef = this.mAngularFirestore.collection(this.mFilesCollectionPath);

    this.mDirectoryCollectionRef.valueChanges().subscribe(
      data => {
        this.mFirebaseFolders = data;
        this.onSelectedFolderChanged();
      }
    );

    this.mFileCollectionRef.valueChanges().subscribe(data => {
      this.mFirebaseFiles = [];
      this.mCurrentFiles = [];
      data.forEach(item => {
        let file = this._GetFileFromData(item);
        if (file.folder == this.mCurrentFolder.folder_path) {
          this.mCurrentFiles.push(file);
        }
        this.mFirebaseFiles.push(file);
      });
    });
  }

  _ShowToast(message: string, duration: number) {
    let toast = this.mToastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  _InvalidateFolderName(name: string): boolean {
    var pattern = new RegExp("[^0-9a-zA-Z-_]");
    return pattern.test(name);
  }

  filesToUpload: Array<FirebaseUpload> = [];
  mFileUploading: FirebaseUpload = null;
  selectedFiles: FileList;
  mOverrideExistFile: boolean = false;
  //=================FirebaseUpload file ==============
  onFilesChanged(event) {
    this.selectedFiles = event.target.files;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      let upload = new FirebaseUpload(this.selectedFiles[i]);
      this.filesToUpload.push(upload);
    }
    this._CheckRemainUploadFile();
  }

  _CheckRemainUploadFile() {
    if (this.filesToUpload.length > 0) {
      let upload = this.filesToUpload.shift();

      if (upload.name.length > 0) {
        this._CheckUploadFileExisted(upload).then(
          data => {
            this._UploadFile(upload);
          },
          err => {
            this._CheckRemainUploadFile();
          }
        );
      } else {
        this._CheckRemainUploadFile();
      }

    }
  }
  _CheckUploadFileExisted(upload: FirebaseUpload) {
    return new Promise((resolve, reject) => {
      let fileName = upload.name;
      let existFile: boolean = this.mCurrentFiles.some(element => {
        return element.name === fileName;
      });
      if (existFile) {
        let alert = this.mAlertController.create({
          title: "Warning!",
          message: "File " + fileName + " has aready exist in Storage Bucket, do you want to override it?"
        });

        let confirm = this.mAlertController.create({
          title: 'Override?',
          message: "File " + fileName + " has aready exist in Storage Bucket, do you want to override it?",
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                resolve({
                  override: true
                });
              }
            },
            {
              text: 'Cancel',
              handler: () => {
                reject();
              }
            }
          ]
        });
        confirm.present();
      } else {

        resolve({
          override: false
        });
      }
    });


  }
  _UploadFile(upload: FirebaseUpload) {
    this.mFileUploading = upload;
    var currentFolder = this.mCurrentFolder.folder_path;

    let storageRef = currentFolder + "/" + upload.file.name;

    let uploadTask = firebase.storage().ref(storageRef).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        upload.progress = (snapshot['bytesTransferred'] / snapshot['totalBytes']) * 100;
        //   console.log("Upload in progress : " + upload.progress, snapshot);

      },
      (error) => {
        // upload failed
        console.log(error);
        this.mFileUploading = null;
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;

        let firebaseId = this.mAngularFirestore.createId();
        this.mFileCollectionRef.doc(firebaseId).set(
          {
            firebase_id: firebaseId,
            firebase_reference: currentFolder + "/" + firebaseId,
            storage_reference: currentFolder + "/" + upload.name,
            folder: currentFolder,
            name: upload.name,
            url: upload.url,
            content_type: uploadTask.snapshot.metadata.contentType
          }
        );
        this.mFileUploading = null;
        this._CheckRemainUploadFile();
      }
    );
  }

  // =================== USER EVENT =================
  VIEW_LIST: number = 0;
  VIEW_GRID: number = 1;
  mViewType: number = 1;
  /**Thay đổi cách hiển thị file */
  onClickSwitchViewType(viewType: number) {
    this.mViewType = viewType;
  }

  onClickBack() {

    this.mViewController.dismiss();

  }

  onClickDone() {
    if (this.mMutipleFiles) {
      let images: Array<FirebaseFile> = [];
      images = this.mCurrentFiles.filter(item => {
        return item.mSelected;
      });
      this.mViewController.dismiss({
        images: images
      });

    } else {
      this.mViewController.dismiss({
        image: this.mCurrentFile
      });
    }
  }

  /**User muốn xóa File */
  onClickDeleteFile(file: FirebaseFile) {
    this._DeleteFile(file);
  }
  onClickRenameFile(file: FirebaseFile) {
    this._RenameFile(file);
  }
  onClickOpenFile(file: FirebaseFile) {
    this._OpenFile(file);
  }
  onTapFile(file: FirebaseFilePicker, event) {
    if (event.tapCount == 1) {
      if (this.mMutipleFiles) {
        this.mCurrentFile = file;
        file.mSelected = !file.mSelected;
      } else {
        this.mCurrentFile.mSelected = false;
        file.mSelected = true;
        this.mCurrentFile = file;
      }
    }
    if (event.tapCount == 2) {
      event.preventDefault();
      if (!this.mMutipleFiles) {
        this.mCurrentFile.mSelected = false;
        file.mSelected = true;
        this.mCurrentFile = file;
        this.onClickDone();
      }

    }
  }
  onRightClickFile(file: FirebaseFile, event) {
    if (event.which == 3) {
      event.preventDefault();
      this._ShowFileContextMenu(file);
    }
  }

  /**User chuyển nhanh đến folder hiển thị ở topbar */
  onClickFolderBar(folderName: string) {
    if (folderName.length == 0) {
      this.mCurrentFolder = new FirebaseFolder();
      this.mCurrentFolder.folder_path = this.mStoragePath;
    } else {
      this.mFirebaseFolders.forEach(item => {
        if (item.folder_path.startsWith(this.mStoragePath) && item.folder_path.endsWith(folderName)) {
          this.mCurrentFolder = item;
        }
      });
    }
    this.onSelectedFolderChanged();
  }
  onClickOpenFolder(folder: FirebaseFolder) {
    this.mCurrentFolder = folder;
    this.onSelectedFolderChanged();
  }
  onClickNewFolder() {
    let prompt = this.mAlertController.create({
      title: 'Tạo FirebaseFolder',
      inputs: [
        {
          name: 'folder',
          placeholder: 'folder'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Create',
          handler: data => {
            if (data) {
              this._CreateNewFolder(data);
            }
          }
        }
      ]
    });
    prompt.present();
  }
  onClickRenameFolder(folder: FirebaseFolder) {
    let prompt = this.mAlertController.create({
      title: 'Rename FirebaseFolder',
      inputs: [
        {
          name: 'folder',
          placeholder: 'folder'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Edit',
          handler: data => {

            if (data) {
              if (data.folder) {
                data.folder = data.folder.trim();
                this._RenameFolder(folder, data);
              }
            }
          }
        }
      ]
    });
    prompt.present();
  }
  onClickDeleteFolder(folder: FirebaseFolder) {
    this._DeleteFolder(folder);
  }
  onRightClickFolder(folder: FirebaseFolder, event) {
    if (event.which == 3) {
      event.preventDefault();
      this._ShowFolderContextMenu(folder);
    }
  }

  // =================== Temp Functions =============
  // =================== FirebaseFolder =====================
  _ShowFolderContextMenu(folder: FirebaseFolder) {
    let actionSheet = this.mActionSheetController.create({
      title: 'Chọn thao tác',
      buttons: [
        {
          text: 'Open',
          handler: () => {
            this.onClickOpenFolder(folder);
          }
        }, {
          text: 'Rename',
          handler: () => {
            this.onClickRenameFolder(folder);
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.onClickDeleteFolder(folder);
          }
        }
      ]
    });
    actionSheet.present();
    actionSheet.onDidDismiss(() => {

    });
  }
  _DeleteFolder(folder: FirebaseFolder) {
    let path = folder.folder_path;
    let folderToDeletes = this.mFirebaseFolders.filter(item => {
      return item.folder_path.startsWith(path);
    });

    folderToDeletes.forEach(item => {
      let folderRef = this.mDirectoryCollectionRef.doc(item.firebase_id);
      if (folderRef) {
        folderRef.delete();
      }

      let filesToDelete = this.mFirebaseFiles.filter(item => {
        return (item.folder === folder.folder_path);
      });
      filesToDelete.forEach(file => {
        if (file.firebase_id) {
          this.mFileCollectionRef.doc(file.firebase_id).delete();
        }
        if (file.storage_reference) {
          firebase.storage().ref(file.storage_reference).delete();
        }
      });
    });

  }
  _CreateNewFolder(data) {

    if (data && data.folder && data.folder.length > 0) {
      if (this._InvalidateFolderName(data.folder)) {
        this._ShowToast("FirebaseFolder name is invalid", 2000);
        return;
      }

      let folderName = data.folder;
      let folderPath = this.mCurrentFolder.folder_path + "/" + folderName;

      let exist: boolean = false;
      this.mFirebaseFolders.forEach(item => {
        if (item.folder_path === folderPath) {
          exist = true;
        }
      });

      if (exist) {
        this._ShowToast("This folder has already exist", 2000);
      } else {
        let firebaseID = this.mAngularFirestore.createId();
        this.mDirectoryCollectionRef.doc(firebaseID).set({
          firebase_id: firebaseID,
          firebase_reference: this.mDirectoryCollectionPath + "/" + firebaseID,
          folder_name: folderName,
          folder_path: folderPath
        });
      }
    }
  }
  _RenameFolder(folder: FirebaseFolder, data) {
    if (data && data.folder.length > 0) {
      if (this._InvalidateFolderName(data.folder)) {
        this._ShowToast("FirebaseFolder name is invalid", 2000);
        return;
      }
      let filesToRename = this.mFirebaseFiles.filter(item => {
        return (item.folder === folder.folder_path);
      });

      folder.folder_path = folder.folder_path.substring(0, folder.folder_path.lastIndexOf('/')) + "/" + data.folder;
      folder.folder_name = data.folder;

      /**Update folder path */
      this.mDirectoryCollectionRef.doc(folder.firebase_id).update(folder);
      /**Update files folder */
      filesToRename.forEach(file => {
        this.mFileCollectionRef.doc(file.firebase_id).update({
          folder: folder.folder_path
        })
      });
    }
  }
  // =================== Files =====================
  _ShowFileContextMenu(file: FirebaseFile) {
    let actionSheet = this.mActionSheetController.create({
      title: 'Chọn thao tác',
      buttons: [
        {
          text: 'Open',
          handler: () => {
            this.onClickOpenFile(file);
          }
        }, {
          text: 'Rename',
          handler: () => {
            this.onClickRenameFile(file);
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.onClickDeleteFile(file);
          }
        }
      ]
    });
    actionSheet.present();
  }
  _DeleteFile(file: FirebaseFile) {
    if (file && file.firebase_id && file.firebase_id.length > 0) {
      if (file.firebase_id) {
        this.mFileCollectionRef.doc(file.firebase_id).delete();
      }
      if (file.storage_reference) {
        firebase.storage().ref(file.storage_reference).delete();
      }
    }
  }
  _RenameFile(file: FirebaseFile) {
    /**Firebase khong cho phep rename file */
  }
  _OpenFile(file: FirebaseFile) {

  }

}
