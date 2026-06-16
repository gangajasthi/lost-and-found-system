// import AdminSidebar from "./AdminSidebar";

// export default function DashboardLayout({
//   children,
//   isAdmin = false,
// }) {
//   if (isAdmin) {
//     return (
//       <div className="flex min-h-screen bg-gray-50">
//         <AdminSidebar />

//         <main className="flex-1 ml-64 p-6">
//           {children}
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {children}
//     </div>
//   );
// }

import AdminSidebar from "./AdminSidebar";

export default function DashboardLayout({
  children,
  isAdmin = false,
}) {
  if (isAdmin) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <AdminSidebar />

        <main
          className="ml-[288px] p-8"
        >
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {children}
    </div>
  );
}