"use client";

import { useCallback, useState, useEffect } from "react";
import useEditModal from "@/hooks/useEditModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import axios from "axios";
import toast from "react-hot-toast";
import FormModal from "../FormModal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser, mutate: mutateFetchedUser } = useUser(
    currentUser?.id,
  );
  const editModal = useEditModal();

  const [username, setUsername] = useState(fetchedUser?.username || "");
  const [name, setName] = useState(fetchedUser?.name || "");
  const [bio, setBio] = useState(fetchedUser?.bio || "");
  const [profileImage, setProfileImage] = useState(
    fetchedUser?.profileImage || "",
  );
  const [coverImage, setCoverImage] = useState(fetchedUser?.coverImage || "");

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.patch("/api/edit", {
        username,
        name,
        bio,
        profileImage,
        coverImage,
      });
      mutateFetchedUser();
      toast.success("Updated");
      editModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    bio,
    coverImage,
    editModal,
    mutateFetchedUser,
    name,
    profileImage,
    username,
  ]);

  useEffect(() => {
    setUsername(fetchedUser?.username || "");
    setName(fetchedUser?.name || "");
    setBio(fetchedUser?.bio || "");
    setProfileImage(fetchedUser?.profileImage || "");
    setCoverImage(fetchedUser?.coverImage || "");
  }, [fetchedUser]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image"
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <FormModal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
