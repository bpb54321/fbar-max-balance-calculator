// import getMaxAccountBalancesForDocument from "@/deprecated/getMaxAccountBalancesForDocument";
// import { ChangeEventHandler } from "react";

// const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (
//   event
// ) => {
//   const filelist = event.target.files;
//   if (filelist && filelist.length > 0) {
//     const file = filelist[0];
//     const formData = new FormData();
//     formData.append("file", file);
//     const maxAccountBalances =
//       (await getMaxAccountBalancesForDocument(formData)) ?? "";
//     const parsedMaxAccountBalances = JSON.parse(maxAccountBalances);
//     console.log(parsedMaxAccountBalances);
//   }
// };

// export default function FileUploadButton() {
//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//     </div>
//   );
// }
