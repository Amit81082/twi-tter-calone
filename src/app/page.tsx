import Header from "@/components/Header";
import PostModal from "@/components/PostModal";
import PostFeed from "@/components/posts/PostFeed";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <PostModal placeholder="What's happening?" />
      <PostFeed  />
    </>
  );
}
