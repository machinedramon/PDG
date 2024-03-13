export default function SidebarMenuSkeleton() {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse flex items-center w-full h-14 my-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300"
        ></div>
      ))}
    </>
  );
}
