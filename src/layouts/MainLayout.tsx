// src/layouts/MainLayout.tsx

import Followbar from "@/TwitterLayouts/Followbar";
import Sidebar from "@/TwitterLayouts/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="h-full bg-black">
          <div className="container h-full mx-auto xl:px-30 max-w-6xl">
            <div className="grid h-full grid-cols-4">
              <Sidebar />
              <div className="col-span-3 lg:col-span-2 border-x border-neutral-800 overflow-y-auto hide-scrollbar">
                {children}
              </div>
              <Followbar />
            </div>
          </div>
        </div>
  );
};

export default MainLayout;
