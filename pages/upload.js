import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { categories } from '../utils/categories';
import { db, storage } from '../config/firebase.config';
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Image from 'next/image';
import { useAuth } from '../context/authContext';

const UploadPage = () => {
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { push, back } = useRouter();
  const { user } = useAuth();
  const filePickerRef = useRef(null);

  if (!user) {
    push('/login');
  }

  const sendPost = async () => {
    setLoading(true);

    const docRef = doc(collection(db, 'posts'));
    await setDoc(docRef, {
      username: user?.email.split('@', 1)[0],
      postedBy: user?.uid,
      createdAt: serverTimestamp(),
      id: docRef.id,
      profilePicture: user?.photoURL,
      category,
      caption,
    });

    const imageRef = ref(storage, `/posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'posts', docRef.id), {
          id: docRef.id,
          image: downloadURL,
        });
      });
    }
    setLoading(false);
    setCaption('');
    setSelectedFile(null);
    push('/');
  };

  const discardPost = async () => {
    setCaption('');
    setSelectedFile(null);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <section className="container">
      <button className="btn my-4" onClick={() => back()}>
        Go Back
      </button>
      <section className={`${loading ? 'opacity' : ''} row mx-auto`}>
        <div
          className="col-md-5 my-auto upload-container bg-light"
          onClick={() => filePickerRef.current.click()}
        >
          {selectedFile ? (
            <>
              <Image
                src={selectedFile}
                width={450}
                height={450}
                alt={'Selected File'}
              />
              <input
                hidden
                type="file"
                ref={filePickerRef}
                onChange={addImageToPost}
              />
            </>
          ) : (
            <div
              className={
                'd-flex justify-content-center align-items-center flex-column h-100 text-black'
              }
            >
              <i>
                <AiOutlineCloudUpload />
              </i>
              <h4 className="my-4">Click to upload an image</h4>
              <button className="btn">Select File</button>
              <input
                type="file"
                hidden
                ref={filePickerRef}
                onChange={addImageToPost}
              />
            </div>
          )}
        </div>
        <div className="col-md-7 p-4 d-flex justify-content-evenly flex-column mt-3 mt-md-0">
          <div>
            <label className="mb-3">Add A Caption</label>
            <input
              className="mb-3 w-100"
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-3 d-block">Choose A Category</label>
            <select
              className="text-capitalize w-50 mb-4"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category, i) => (
                <option key={i} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex justify-content-evenly mb-4 mb-md-0 m w-100">
            <button className="btn" onClick={discardPost}>
              Discard
            </button>
            <button className="btn" onClick={sendPost}>
              {loading ? 'Loading...' : 'Post'}
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default UploadPage;
