import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import uuid from "uuid/v1";
import jwt from "jsonwebtoken";
import axios from "axios";

const UserInfo = (props) => {
  const [profile, setProfile] = useState({
    // name: "Chhim Chany",
    // email: "chhimchany@gmail.com",
    // phone: "086280018",
    // gender: "male",
    // password: "*****",
    // createDate: "12.12.12",
    name: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    createDate: "",
  });

  useEffect(() => {
    fetch("http://localhost:8000/userData", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: profile.namme,
        user_email: profile.email,
        user_phone: profile.phone,
        user_password: profile.password,
        user_createDate: profile.createDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem(
          "token",
          JSON.stringify({
            loign: true,
            token: data,
          })
        );

        let user = jwt.decode(data);
        setProfile(user);
      });
  }, []);

  const { register, handleSubmit, errors } = useForm();
  // const onSubmit = (profile) => {
  //   // alert(JSON.stringify(data));
  //   console.log(profile);
  // };

  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose file");
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  // const onChangeimage = (e) => {
  //   setFile(e.target.files[0]);
  //   setFile(e.target.files[0].name);
  // };
  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  const onSubmitImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
  };

  // const [image, setImage] = useState({
  //   img: null,
  // });

  // const onImageChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     let img = event.target.files[0];
  //     setProfile({
  //       image: URL.createObjectURL(img),
  //     });
  //   }
  // };

  const onChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    console.log(profile);
  };
  const [modal, setModal] = useState(false);
  const popUp = () => {
    setModal(!modal);
  };
  const [buttonUpload, setButtonupload] = useState(false);
  const showButtonUplaod = () => {
    setButtonupload(!buttonUpload);
  };

  const onClose = () => {
    setModal(false);
  };
  // const changeName = (name) => {
  //   setProfile([...profile, { name, id: uuid() }]);
  // };
  const onSubmit = (e) => {
    e.preventDefault();
    const data = profile;
    console.log(data);
  };
  const cancle = (e) => {
    setModal(false);
    setProfile({
      name: "Chhim Chany",
      email: "chhimchany@gmail.com",
      phone: "086280018",
      gender: "male",
      password: "*****",
      createDate: "12.12.12",
    });
  };
  return (
    <div className=" flex  items-center justify-center h-screen">
      <div className=" w-full max-w-screen-md">
        <div className="bg-white shadow-md rounded  ">
          <div className="bg-gray-700 rounded">
            <h1 className="text-yellow-100 px-2 py-2">Your Profile</h1>
          </div>
          <div className="overflow-hidden">
            <div className="md:flex px-12 ">
              <form onSubmit={onSubmitImage} className="mt-6 ml-4">
                {/* <img
                  className="h-20 w-20 md:h-32 md:w-32 rounded-full mx-auto md:mx-0 md:mr-6"
                  src="/img/01-shutterstock_476340928-Irina-Bg.jpg"
                /> */}
                <div
                  className="h-20 w-20 md:h-32 md:w-32 rounded-full mx-auto md:mx-0 md:mr-6"
                  // style={{
                  //   height: "60px",
                  //   width: "60px",
                  //   border: "1px dashed black",
                  // }}
                  onClick={() => imageUploader.current.click()}
                >
                  <img
                    ref={uploadedImage}
                    src="/img/01-shutterstock_476340928-Irina-Bg.jpg"
                    className="h-20 w-20 md:h-32 md:w-32 rounded-full mx-auto md:mx-0 md:mr-6"
                    // style={{
                    //   width: "100%",
                    //   height: "100%",
                    //   position: "acsolute",
                    // }}
                  />
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={imageUploader}
                    className="hidden"
                    onClick={showButtonUplaod}
                  />
                </div>

                <button
                  type="submit"
                  onClick={showButtonUplaod}
                  className={
                    buttonUpload
                      ? "bg-blue-900 rounded py-2 px-2 text-white cursor-pointer mt-2 px-3 ml-6"
                      : "hidden"
                  }
                >
                  Upload
                </button>
                {/* <button onClick={showButtonUplaod}>helo</button> */}
              </form>
              <form onSubmit={onSubmit} className="md:flex mt-8 pb-8 px-4">
                {/* <div className="ml-4">
                <img
                  className="h-20 w-20 md:h-32 md:w-32 rounded-full mx-auto md:mx-0 md:mr-6"
                  src="/img/01-shutterstock_476340928-Irina-Bg.jpg"
                  // src={image.img}
                />

                <h1 className="mt-2">Chagne Your Profile</h1>
              </div> */}
                <div className="ml-12">
                  <div
                    className={
                      modal
                        ? "block fixed -mt-32 items-center justify-center bg-gray-800 rounded-lg p-6"
                        : "hidden"
                    }
                  >
                    <h1 className="block mb-5 text-white">Edit Your Profile</h1>
                    <div></div>

                    <label className="text-white">Name</label>
                    <input
                      className="rounded py-1 px-1 block mb-2"
                      // type="text"
                      // name="name"change profile picture in react js
                      value={profile.name}
                      ref={register({ required: true, minLength: 5 })}
                      name="name"
                      type="text"
                      onChange={onChange}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs italic">
                        Name required
                      </p>
                    )}

                    <label className="text-white">Email</label>
                    <input
                      className="rounded py-1 px-1 block mb-2"
                      // type="text"
                      // name="name"
                      value={profile.email}
                      ref={register({ required: true, minLength: 5 })}
                      name="email"
                      type="email"
                      onChange={onChange}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs italic">
                        Name required
                      </p>
                    )}
                    <label className="text-white">Phone</label>
                    <input
                      className="rounded py-1 px-1 block"
                      // type="text"
                      // name="name"
                      value={profile.phone}
                      ref={register({ required: true, minLength: 5 })}
                      name="phone"
                      type="number"
                      onChange={onChange}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs italic">
                        phone required
                      </p>
                    )}
                    <button
                      onClick={onClose}
                      className={errors.name ? "block" : "hidden"}
                      type="submit"
                      className="mr-2 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancle}
                      className="mr-2 mt-5 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className=" px-3 mb-3">
                    <h1
                      // onClick={popUp}
                      className="-mb-2 font-extrabold text-lg  "
                    >
                      {profile.name}
                    </h1>
                    <span className="text-xs ">Name</span>
                  </div>
                  <div className=" px-3 mb-3 ">
                    <h1 className="-mb-2 font-extrabold text-lg">
                      {profile.email}
                    </h1>
                    <span className="text-xs ">Email</span>
                  </div>
                  <div className=" px-3 mb-3">
                    <h1 className="-mb-2 font-extrabold text-lg">
                      {profile.phone}
                    </h1>
                    <span className="text-xs ">Phone</span>
                  </div>
                  <div className=" px-3 mb-3">
                    <h1 className="-mb-2 font-extrabold text-lg">
                      {profile.gender}
                    </h1>
                    <span className="text-xs ">Gender</span>
                  </div>
                  <div className=" px-3 mb-3">
                    <h1 className="-mb-2 font-extrabold text-lg">
                      {profile.password}
                    </h1>
                    <span className="text-xs ">Password</span>
                  </div>
                  <div className=" px-3 mb-3">
                    <h1 className="-mb-2 font-extrabold text-lg">
                      {profile.createDate}
                    </h1>
                    <span className="text-xs ">createDate</span>
                  </div>
                </div>
              </form>
              {/* <button
                onClick={popUp}
                className=" bg-blue-700 rounded float-right py-2 px-2 mb-5 mr-5 hover:bg-blue-600"
              >
                <span className="text-white">Edit Profile</span>
              </button> */}
            </div>
            <button
              onClick={popUp}
              className=" bg-blue-700 rounded float-right py-2 px-2 mb-5 mr-5 hover:bg-blue-600"
            >
              <span className="text-white">Edit Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
